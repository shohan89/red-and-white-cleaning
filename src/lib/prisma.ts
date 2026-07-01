import { Pool } from "pg"

const globalForPg = globalThis as unknown as { __pgPool: Pool | undefined }

function getPool(): Pool {
  if (!globalForPg.__pgPool) {
    globalForPg.__pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 3,
      idleTimeoutMillis: 5_000,
      connectionTimeoutMillis: 5_000,
      keepAlive: true,
      keepAliveInitialDelayMillis: 5_000,
    })
    globalForPg.__pgPool.on("error", (err) => {
      console.error("[pg pool error]", err.message)
    })
  }
  return globalForPg.__pgPool
}

// Cloudflare Worker isolates can be frozen between requests, leaving TCP
// connections in an indeterminate state (NAT entries expire silently).
// runQueryOnce: single attempt — times out after 3 s and resets the pool
//   so the next attempt gets a fresh connection instead of the zombie socket.
// runQuery: retries once after a zombie-connection timeout so the caller
//   always gets a real result. Worst-case latency: ~3.5 s (3 s timeout +
//   200 ms fresh connect) instead of a hard 9 s error.
const QUERY_TIMEOUT_MS = 3_000

async function runQueryOnce(
  sql: string,
  params: Params
): Promise<{ rows: Record<string, unknown>[]; rowCount: number | null }> {
  let timerId: ReturnType<typeof setTimeout> | undefined
  try {
    const result = await Promise.race([
      getPool().query(sql, params as never[]),
      new Promise<never>((_, reject) => {
        timerId = setTimeout(() => {
          if (globalForPg.__pgPool) {
            globalForPg.__pgPool.end().catch(() => {})
            globalForPg.__pgPool = undefined
          }
          reject(new Error(`DB query timed out after ${QUERY_TIMEOUT_MS}ms`))
        }, QUERY_TIMEOUT_MS)
      }),
    ])
    return result as { rows: Record<string, unknown>[]; rowCount: number | null }
  } finally {
    clearTimeout(timerId)
  }
}

async function runQuery(
  sql: string,
  params: Params
): Promise<{ rows: Record<string, unknown>[]; rowCount: number | null }> {
  try {
    return await runQueryOnce(sql, params)
  } catch (err) {
    if (err instanceof Error && err.message.includes("timed out")) {
      console.log("[pg] retrying after zombie connection reset")
      return await runQueryOnce(sql, params)
    }
    throw err
  }
}

// Tables without updatedAt
const NO_UPDATED_AT = new Set(["LeadEvent", "ServicePhase", "ServiceIncludedItem", "ServiceImage", "Redirect"])
// Tables without createdAt
const NO_CREATED_AT = new Set(["GlobalSeo", "PageSeo", "SchemaConfig", "SitemapEntry", "RobotsConfig", "SiteSettings", "EmailTemplate", "PageContent"])

// Relationship definitions for include resolution
const RELATIONS: Record<string, Record<string, {
  type: "hasMany" | "belongsTo"
  table: string
  foreignKey: string
  selfKey: string
}>> = {
  FaqCategory: {
    faqs: { type: "hasMany", table: "Faq", foreignKey: "categoryId", selfKey: "id" },
  },
  Faq: {
    category: { type: "belongsTo", table: "FaqCategory", foreignKey: "categoryId", selfKey: "id" },
  },
  PortfolioCategory: {
    items: { type: "hasMany", table: "PortfolioItem", foreignKey: "categoryId", selfKey: "id" },
  },
  PortfolioItem: {
    category: { type: "belongsTo", table: "PortfolioCategory", foreignKey: "categoryId", selfKey: "id" },
  },
  Service: {
    phases: { type: "hasMany", table: "ServicePhase", foreignKey: "serviceId", selfKey: "id" },
    includedItems: { type: "hasMany", table: "ServiceIncludedItem", foreignKey: "serviceId", selfKey: "id" },
    images: { type: "hasMany", table: "ServiceImage", foreignKey: "serviceId", selfKey: "id" },
  },
  Lead: {
    timeline: { type: "hasMany", table: "LeadEvent", foreignKey: "leadId", selfKey: "id" },
  },
}

type Params = unknown[]

function col(name: string): string {
  return `"${name}"`
}

function buildWhere(where: Record<string, unknown> | undefined, params: Params): string {
  if (!where || Object.keys(where).length === 0) return ""
  const clauses: string[] = []

  for (const [key, value] of Object.entries(where)) {
    if (key === "AND" && Array.isArray(value)) {
      const subs = value.map((v) => buildWhere(v as Record<string, unknown>, params)).filter(Boolean)
      if (subs.length) clauses.push(`(${subs.join(" AND ")})`)
    } else if (key === "OR" && Array.isArray(value)) {
      const subs = value.map((v) => buildWhere(v as Record<string, unknown>, params)).filter(Boolean)
      if (subs.length) clauses.push(`(${subs.join(" OR ")})`)
    } else if (value === null || value === undefined) {
      clauses.push(`${col(key)} IS NULL`)
    } else if (typeof value === "object" && !(value instanceof Date) && !Array.isArray(value)) {
      const ops = value as Record<string, unknown>
      const mode = ops.mode as string | undefined
      for (const [op, opVal] of Object.entries(ops)) {
        if (op === "mode") continue
        const p = params.length + 1
        switch (op) {
          case "contains":
            params.push(`%${opVal}%`)
            clauses.push(`${col(key)} ${mode === "insensitive" ? "ILIKE" : "LIKE"} $${p}`)
            break
          case "startsWith":
            params.push(`${opVal}%`)
            clauses.push(`${col(key)} LIKE $${p}`)
            break
          case "endsWith":
            params.push(`%${opVal}`)
            clauses.push(`${col(key)} LIKE $${p}`)
            break
          case "gte":
            params.push(opVal); clauses.push(`${col(key)} >= $${p}`); break
          case "lte":
            params.push(opVal); clauses.push(`${col(key)} <= $${p}`); break
          case "gt":
            params.push(opVal); clauses.push(`${col(key)} > $${p}`); break
          case "lt":
            params.push(opVal); clauses.push(`${col(key)} < $${p}`); break
          case "not":
            params.push(opVal); clauses.push(`${col(key)} != $${p}`); break
          case "in":
            params.push(opVal); clauses.push(`${col(key)} = ANY($${p})`); break
          case "notIn":
            params.push(opVal); clauses.push(`${col(key)} != ALL($${p})`); break
        }
      }
    } else {
      params.push(value)
      clauses.push(`${col(key)} = $${params.length}`)
    }
  }

  return clauses.join(" AND ")
}

function buildOrderBy(orderBy: unknown): string {
  if (!orderBy) return ""
  const orders = Array.isArray(orderBy) ? orderBy : [orderBy]
  const parts: string[] = []
  for (const obj of orders) {
    for (const [key, dir] of Object.entries(obj as Record<string, unknown>)) {
      if (typeof dir !== "string") continue
      parts.push(`${col(key)} ${dir === "desc" ? "DESC" : "ASC"}`)
    }
  }
  return parts.length ? `ORDER BY ${parts.join(", ")}` : ""
}

function buildSelect(select: unknown): string {
  if (!select) return "*"
  const cols = Object.entries(select as Record<string, unknown>)
    .filter(([k, v]) => v === true && !k.startsWith("_"))
    .map(([k]) => col(k))
  return cols.length ? cols.join(", ") : "*"
}

async function resolveIncludes(rows: Record<string, unknown>[], tableName: string, include: Record<string, unknown>): Promise<Record<string, unknown>[]> {
  if (!include || !rows.length) return rows
  const rels = RELATIONS[tableName] ?? {}
  const result = rows.map((row) => ({ ...row }))

  for (const [key, includeVal] of Object.entries(include)) {
    // Handle _count: { select: { relation: true } }
    if (key === "_count") {
      const countSel = (typeof includeVal === "object" && includeVal !== null && (includeVal as any).select)
        ? (includeVal as any).select as Record<string, unknown>
        : {} as Record<string, unknown>
      const ids = result.map((r) => r.id).filter(Boolean)
      if (!ids.length) continue
      for (const [relKey] of Object.entries(countSel).filter(([, v]) => v)) {
        const rel = rels[relKey]
        if (!rel || rel.type !== "hasMany") continue
        const { rows: cr } = await runQuery(
          `SELECT ${col(rel.foreignKey)}, COUNT(*) as cnt FROM ${col(rel.table)} WHERE ${col(rel.foreignKey)} = ANY($1) GROUP BY ${col(rel.foreignKey)}`,
          [ids]
        )
        const countMap = new Map(cr.map((r) => [r[rel.foreignKey], parseInt(r.cnt as string, 10)]))
        for (const row of result) {
          if (!row._count) row._count = {}
          ;(row._count as Record<string, number>)[relKey] = countMap.get(row.id as string) ?? 0
        }
      }
      continue
    }

    const rel = rels[key]
    if (!rel) continue
    const opts = (typeof includeVal === "object" && includeVal !== null)
      ? includeVal as Record<string, unknown>
      : {}

    if (rel.type === "hasMany") {
      const parentIds = result.map((r) => r[rel.selfKey]).filter(Boolean)
      if (!parentIds.length) { result.forEach((r) => { r[key] = [] }); continue }

      const params: Params = [parentIds]
      // Always include foreignKey so results can be grouped by parent, even when caller uses select
      const hasManySelect = (opts as any).select as Record<string, unknown> | undefined
      const hasManyClause = hasManySelect ? buildSelect({ [rel.foreignKey]: true, ...hasManySelect }) : "*"
      let sql = `SELECT ${hasManyClause} FROM ${col(rel.table)} WHERE ${col(rel.foreignKey)} = ANY($1)`

      if ((opts as any).where) {
        const wParams: Params = []
        const wSql = buildWhere((opts as any).where as Record<string, unknown>, wParams)
        if (wSql) {
          // Re-index placeholders to continue after $1
          const offsetSql = wSql.replace(/\$(\d+)/g, (_, n) => `$${parseInt(n) + 1}`)
          sql += ` AND ${offsetSql}`
          params.push(...wParams)
        }
      }
      if ((opts as any).orderBy) sql += ` ${buildOrderBy((opts as any).orderBy)}`

      const { rows: relRows } = await runQuery(sql, params)
      const relMap = new Map<unknown, Record<string, unknown>[]>()
      for (const rr of relRows) {
        const pid = rr[rel.foreignKey]
        if (!relMap.has(pid)) relMap.set(pid, [])
        relMap.get(pid)!.push(rr)
      }
      for (const row of result) row[key] = relMap.get(row[rel.selfKey]) ?? []
    } else if (rel.type === "belongsTo") {
      const refIds = [...new Set(result.map((r) => r[rel.foreignKey]).filter(Boolean))]
      if (!refIds.length) { result.forEach((r) => { r[key] = null }); continue }
      // Always include "id" so the lookup map can be keyed correctly, even when caller uses select
      const callerSelect = (opts as any).select as Record<string, unknown> | undefined
      const selectClause = callerSelect ? buildSelect({ id: true, ...callerSelect }) : "*"
      const { rows: relRows } = await runQuery(
        `SELECT ${selectClause} FROM ${col(rel.table)} WHERE "id" = ANY($1)`,
        [refIds]
      )
      const relMap = new Map(relRows.map((r) => [r.id, r]))
      for (const row of result) row[key] = relMap.get(row[rel.foreignKey] as string) ?? null
    }
  }
  return result
}

function makeModel(tableName: string) {
  const noUpdatedAt = NO_UPDATED_AT.has(tableName)
  const noCreatedAt = NO_CREATED_AT.has(tableName)

  return {
    async findMany({ where, orderBy, take, skip, select, include }: Record<string, unknown> = {}): Promise<Record<string, unknown>[]> {
      const params: Params = []
      const wSql = buildWhere(where as Record<string, unknown>, params)
      let sql = `SELECT ${buildSelect(select)} FROM ${col(tableName)}`
      if (wSql) sql += ` WHERE ${wSql}`
      const ord = buildOrderBy(orderBy)
      if (ord) sql += ` ${ord}`
      if (take != null) { params.push(take); sql += ` LIMIT $${params.length}` }
      if (skip != null) { params.push(skip); sql += ` OFFSET $${params.length}` }
      const { rows } = await runQuery(sql, params)
      return include ? resolveIncludes(rows, tableName, include as Record<string, unknown>) : rows
    },

    async findFirst({ where, orderBy, select, include }: Record<string, unknown> = {}): Promise<Record<string, unknown> | null> {
      const params: Params = []
      const wSql = buildWhere(where as Record<string, unknown>, params)
      let sql = `SELECT ${buildSelect(select)} FROM ${col(tableName)}`
      if (wSql) sql += ` WHERE ${wSql}`
      const ord = buildOrderBy(orderBy)
      if (ord) sql += ` ${ord}`
      sql += ` LIMIT 1`
      const { rows } = await runQuery(sql, params)
      if (!rows.length) return null
      return include ? (await resolveIncludes(rows, tableName, include as Record<string, unknown>))[0] : rows[0]
    },

    async findUnique({ where, select, include }: Record<string, unknown> = {}): Promise<Record<string, unknown> | null> {
      return this.findFirst({ where, select, include })
    },

    async create({ data, select }: { data: Record<string, unknown>; select?: unknown }): Promise<Record<string, unknown>> {
      const d: Record<string, unknown> = { ...data }
      if (!d.id) d.id = crypto.randomUUID()
      const now = new Date()
      if (!noCreatedAt && !d.createdAt) d.createdAt = now
      if (!noUpdatedAt && !d.updatedAt) d.updatedAt = now
      const keys = Object.keys(d)
      const vals = Object.values(d)
      const cols = keys.map(col).join(", ")
      const phs = keys.map((_, i) => `$${i + 1}`).join(", ")
      const { rows } = await runQuery(
        `INSERT INTO ${col(tableName)} (${cols}) VALUES (${phs}) RETURNING ${buildSelect(select)}`,
        vals
      )
      return rows[0]
    },

    async update({ where, data, select }: { where: Record<string, unknown>; data: Record<string, unknown>; select?: unknown }): Promise<Record<string, unknown> | null> {
      const d: Record<string, unknown> = { ...data }
      if (!noUpdatedAt && !d.updatedAt) d.updatedAt = new Date()
      const params: Params = []
      const setClauses = Object.entries(d).map(([k, v]) => {
        params.push(v)
        return `${col(k)} = $${params.length}`
      })
      const wSql = buildWhere(where, params)
      const { rows } = await runQuery(
        `UPDATE ${col(tableName)} SET ${setClauses.join(", ")} WHERE ${wSql} RETURNING ${buildSelect(select)}`,
        params
      )
      return rows[0] ?? null
    },

    async updateMany({ where, data }: { where: Record<string, unknown>; data: Record<string, unknown> }): Promise<{ count: number }> {
      const d: Record<string, unknown> = { ...data }
      if (!noUpdatedAt && !d.updatedAt) d.updatedAt = new Date()
      const params: Params = []
      const setClauses = Object.entries(d).map(([k, v]) => {
        params.push(v)
        return `${col(k)} = $${params.length}`
      })
      const wSql = buildWhere(where, params)
      const { rowCount } = await runQuery(
        `UPDATE ${col(tableName)} SET ${setClauses.join(", ")} WHERE ${wSql}`,
        params
      )
      return { count: rowCount ?? 0 }
    },

    async delete({ where }: { where: Record<string, unknown> }): Promise<Record<string, unknown> | null> {
      const params: Params = []
      const wSql = buildWhere(where, params)
      const { rows } = await runQuery(
        `DELETE FROM ${col(tableName)} WHERE ${wSql} RETURNING *`,
        params
      )
      return rows[0] ?? null
    },

    async deleteMany({ where }: { where?: Record<string, unknown> } = {}): Promise<{ count: number }> {
      const params: Params = []
      const wSql = where ? buildWhere(where, params) : ""
      const sql = wSql
        ? `DELETE FROM ${col(tableName)} WHERE ${wSql}`
        : `DELETE FROM ${col(tableName)}`
      const { rowCount } = await runQuery(sql, params)
      return { count: rowCount ?? 0 }
    },

    async upsert({ where, create: createData, update: updateData, select }: {
      where: Record<string, unknown>
      create: Record<string, unknown>
      update: Record<string, unknown>
      select?: unknown
    }): Promise<Record<string, unknown>> {
      // Extract conflict columns from where clause
      // Handles: { id: x }, { url: x }, { pageKey: x }, { pageKey_sectionKey: { pageKey, sectionKey } }
      const conflictCols: string[] = []
      const whereData: Record<string, unknown> = {}

      for (const [key, value] of Object.entries(where)) {
        if (key.includes("_") && typeof value === "object" && value !== null && !Array.isArray(value)) {
          // Composite unique index: pageKey_sectionKey: { pageKey, sectionKey }
          for (const [subKey, subVal] of Object.entries(value as Record<string, unknown>)) {
            conflictCols.push(subKey)
            whereData[subKey] = subVal
          }
        } else {
          conflictCols.push(key)
          whereData[key] = value
        }
      }

      const d: Record<string, unknown> = { ...whereData, ...createData }
      if (!d.id) d.id = crypto.randomUUID()
      const now = new Date()
      if (!noCreatedAt && !d.createdAt) d.createdAt = now
      if (!noUpdatedAt && !d.updatedAt) d.updatedAt = now

      const upd: Record<string, unknown> = { ...updateData }
      if (!noUpdatedAt && !upd.updatedAt) upd.updatedAt = now

      const keys = Object.keys(d)
      const vals: Params = [...Object.values(d)]
      const cols = keys.map(col).join(", ")
      const phs = keys.map((_, i) => `$${i + 1}`).join(", ")
      const conflict = conflictCols.map(col).join(", ")

      // Build UPDATE SET with explicit parameter values (not EXCLUDED.*) so
      // create and update can have different values for the same field.
      const updateEntries = Object.entries(upd)
      let sql: string
      if (updateEntries.length === 0) {
        sql = `INSERT INTO ${col(tableName)} (${cols}) VALUES (${phs}) ON CONFLICT (${conflict}) DO NOTHING RETURNING ${buildSelect(select)}`
      } else {
        const updateSet = updateEntries.map(([k, v]) => {
          vals.push(v)
          return `${col(k)} = $${vals.length}`
        }).join(", ")
        sql = `INSERT INTO ${col(tableName)} (${cols}) VALUES (${phs}) ON CONFLICT (${conflict}) DO UPDATE SET ${updateSet} RETURNING ${buildSelect(select)}`
      }

      const { rows } = await runQuery(sql, vals)
      return rows[0]
    },

    async count({ where }: { where?: Record<string, unknown> } = {}): Promise<number> {
      const params: Params = []
      const wSql = where ? buildWhere(where, params) : ""
      let sql = `SELECT COUNT(*) as cnt FROM ${col(tableName)}`
      if (wSql) sql += ` WHERE ${wSql}`
      const { rows } = await runQuery(sql, params)
      return parseInt(rows[0].cnt as string, 10)
    },

    async aggregate({ _max, _min, _sum, _avg, _count, where }: Record<string, unknown> = {}): Promise<Record<string, unknown>> {
      const params: Params = []
      const selParts: string[] = []

      if (_max) Object.entries(_max as Record<string, unknown>).filter(([, v]) => v).forEach(([k]) => selParts.push(`MAX(${col(k)}) as _max_${k}`))
      if (_min) Object.entries(_min as Record<string, unknown>).filter(([, v]) => v).forEach(([k]) => selParts.push(`MIN(${col(k)}) as _min_${k}`))
      if (_sum) Object.entries(_sum as Record<string, unknown>).filter(([, v]) => v).forEach(([k]) => selParts.push(`SUM(${col(k)}) as _sum_${k}`))
      if (_avg) Object.entries(_avg as Record<string, unknown>).filter(([, v]) => v).forEach(([k]) => selParts.push(`AVG(${col(k)}) as _avg_${k}`))
      if (_count) selParts.push("COUNT(*) as _total_count")

      const wSql = where ? buildWhere(where as Record<string, unknown>, params) : ""
      let sql = `SELECT ${selParts.length ? selParts.join(", ") : "1"} FROM ${col(tableName)}`
      if (wSql) sql += ` WHERE ${wSql}`

      const { rows } = await runQuery(sql, params)
      const row = rows[0] ?? {}
      const result: Record<string, unknown> = {}

      if (_max) {
        result._max = {}
        Object.entries(_max as Record<string, unknown>).filter(([, v]) => v).forEach(([k]) => {
          ;(result._max as Record<string, unknown>)[k] = row[`_max_${k}`] ?? null
        })
      }
      if (_min) {
        result._min = {}
        Object.entries(_min as Record<string, unknown>).filter(([, v]) => v).forEach(([k]) => {
          ;(result._min as Record<string, unknown>)[k] = row[`_min_${k}`] ?? null
        })
      }
      if (_sum) {
        result._sum = {}
        Object.entries(_sum as Record<string, unknown>).filter(([, v]) => v).forEach(([k]) => {
          ;(result._sum as Record<string, unknown>)[k] = row[`_sum_${k}`] ?? null
        })
      }
      if (_avg) {
        result._avg = {}
        Object.entries(_avg as Record<string, unknown>).filter(([, v]) => v).forEach(([k]) => {
          ;(result._avg as Record<string, unknown>)[k] = row[`_avg_${k}`] ?? null
        })
      }
      if (_count) result._count = parseInt(row._total_count as string, 10)

      return result
    },
  }
}

// Cast to PrismaClient so all callers get proper TypeScript types without changes.
// The implementation is API-compatible; no callers use $connect/$transaction/$queryRaw.
export const prisma = {
  user: makeModel("User"),
  lead: makeModel("Lead"),
  leadEvent: makeModel("LeadEvent"),
  portfolioCategory: makeModel("PortfolioCategory"),
  portfolioItem: makeModel("PortfolioItem"),
  faqCategory: makeModel("FaqCategory"),
  faq: makeModel("Faq"),
  service: makeModel("Service"),
  servicePhase: makeModel("ServicePhase"),
  serviceIncludedItem: makeModel("ServiceIncludedItem"),
  serviceImage: makeModel("ServiceImage"),
  mediaAsset: makeModel("MediaAsset"),
  pageContent: makeModel("PageContent"),
  globalSeo: makeModel("GlobalSeo"),
  pageSeo: makeModel("PageSeo"),
  schemaConfig: makeModel("SchemaConfig"),
  sitemapEntry: makeModel("SitemapEntry"),
  redirect: makeModel("Redirect"),
  robotsConfig: makeModel("RobotsConfig"),
  geoContent: makeModel("GeoContent"),
  siteSettings: makeModel("SiteSettings"),
  emailTemplate: makeModel("EmailTemplate"),
  serviceCity: makeModel("ServiceCity"),
}
