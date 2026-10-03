// One-off: seed "How We Work" from each service's phases and "Service Areas" from active cities,
// only where the section is still empty. Run: node --env-file=.env.local scripts/seed-service-page-items.mjs
import pg from "pg"
const c = new pg.Client({ connectionString: process.env.DATABASE_URL })
await c.connect()
const services = (await c.query('SELECT id, name FROM "Service"')).rows
const cities = (await c.query('SELECT name FROM "ServiceCity" WHERE active ORDER BY "sortOrder"')).rows
for (const s of services) {
  const has = async (k) => (await c.query('SELECT 1 FROM "ServicePageItem" WHERE "serviceId"=$1 AND "sectionKey"=$2 LIMIT 1', [s.id, k])).rowCount > 0
  const ins = (k, i, t, b) => c.query('INSERT INTO "ServicePageItem" (id,"serviceId","sectionKey",title,body,"sortOrder") VALUES ($1,$2,$3,$4,$5,$6)', [crypto.randomUUID(), s.id, k, t, b, i])
  if (!(await has("how-we-work"))) {
    const ph = (await c.query('SELECT title, description FROM "ServicePhase" WHERE "serviceId"=$1 ORDER BY "sortOrder"', [s.id])).rows
    for (const [i, p] of ph.entries()) await ins("how-we-work", i, p.title, p.description)
    console.log(s.name, "how-we-work", ph.length)
  }
  if (!(await has("service-areas"))) {
    for (const [i, ci] of cities.entries()) await ins("service-areas", i, ci.name, null)
    console.log(s.name, "areas", cities.length)
  }
}
await c.end()
