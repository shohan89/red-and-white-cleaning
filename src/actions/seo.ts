"use server"

import { revalidatePath, refresh } from "next/cache"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

async function requireAdmin() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
}

/** Ensures a URL string has a scheme and no trailing slash, so `new URL()` never throws on it downstream. */
function normalizeSiteUrl(url: string | undefined): string | undefined {
  if (url === undefined) return undefined
  const trimmed = url.trim().replace(/\/+$/, "")
  if (!trimmed) return trimmed
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

// Pages whose metadata is driven by getPageMetadata() and therefore depend on GlobalSeo.
const SEO_DRIVEN_PAGES = ["/", "/services", "/portfolio", "/faq", "/about", "/contact", "/privacy"]

export async function saveGlobalSeo(data: {
  siteName?: string
  siteUrl?: string
  defaultTitleTemplate?: string
  defaultMetaDesc?: string
  defaultOgImage?: string
  brandName?: string
  businessPhone?: string
  businessEmail?: string
  businessAddress?: string
  ga4Id?: string
  gscVerification?: string
  gtmId?: string
  googleBusinessUrl?: string
}) {
  await requireAdmin()
  const normalized = { ...data, siteUrl: normalizeSiteUrl(data.siteUrl) }
  const existing = await prisma.globalSeo.findFirst()
  if (existing) {
    await prisma.globalSeo.update({ where: { id: existing.id }, data: normalized })
  } else {
    await prisma.globalSeo.create({ data: normalized })
  }
  revalidatePath("/admin/seo")
  for (const page of SEO_DRIVEN_PAGES) revalidatePath(page)
  refresh()
}

export async function savePageSeo(
  pageKey: string,
  data: {
    metaTitle?: string
    metaDesc?: string
    focusKeyword?: string
    canonicalUrl?: string
    robots?: string
    ogTitle?: string
    ogDesc?: string
    ogImage?: string
    twitterTitle?: string
    twitterDesc?: string
    twitterImage?: string
  }
) {
  await requireAdmin()
  const normalized = { ...data, canonicalUrl: normalizeSiteUrl(data.canonicalUrl) }
  await prisma.pageSeo.upsert({
    where: { pageKey },
    create: { pageKey, ...normalized },
    update: normalized,
  })
  revalidatePath("/admin/seo/pages")
  revalidatePath(pageKey === "home" ? "/" : `/${pageKey}`)
  refresh()
}

export async function toggleSchemaConfig(type: string, enabled: boolean) {
  await requireAdmin()
  await prisma.schemaConfig.updateMany({ where: { type }, data: { enabled } })
  revalidatePath("/admin/seo/schema")
  refresh()
}

export async function saveRobotsConfig(content: string) {
  await requireAdmin()
  const existing = await prisma.robotsConfig.findFirst()
  if (existing) {
    await prisma.robotsConfig.update({ where: { id: existing.id }, data: { content } })
  } else {
    await prisma.robotsConfig.create({ data: { content } })
  }
  revalidatePath("/robots.txt")
  refresh()
}

export async function createRedirect(data: {
  source: string
  destination: string
  type?: number
}) {
  await requireAdmin()
  await prisma.redirect.create({ data: { source: data.source, destination: data.destination, type: data.type ?? 301 } })
  revalidatePath("/admin/seo/redirects")
  refresh()
}

export async function deleteRedirect(id: string) {
  await requireAdmin()
  await prisma.redirect.delete({ where: { id } })
  revalidatePath("/admin/seo/redirects")
  refresh()
}

export async function upsertSitemapEntry(data: {
  url: string
  priority?: number
  changeFrequency?: string
  included?: boolean
}) {
  await requireAdmin()
  await prisma.sitemapEntry.upsert({
    where: { url: data.url },
    create: { url: data.url, priority: data.priority ?? 0.5, changeFrequency: data.changeFrequency ?? "monthly", included: data.included ?? true },
    update: { priority: data.priority, changeFrequency: data.changeFrequency, included: data.included },
  })
  revalidatePath("/admin/seo/sitemap")
  revalidatePath("/sitemap.xml")
  refresh()
}

export async function deleteSitemapEntry(id: string) {
  await requireAdmin()
  await prisma.sitemapEntry.delete({ where: { id } })
  revalidatePath("/admin/seo/sitemap")
  revalidatePath("/sitemap.xml")
  refresh()
}

// ─── GEO / AI SEO ──────────────────────────────────────────────────────────

export async function createGeoContent(data: {
  entityType: string
  entityKeywords: string[]
  serviceKeywords: string[]
  locationKeywords: string[]
  aiSummary?: string
  whatIsService?: string
  whoNeedsService?: string
  whyChooseCompany?: string
}) {
  await requireAdmin()
  await prisma.geoContent.create({ data })
  revalidatePath("/admin/seo/geo")
  refresh()
}

export async function updateGeoContent(
  id: string,
  data: {
    entityType?: string
    entityKeywords?: string[]
    serviceKeywords?: string[]
    locationKeywords?: string[]
    aiSummary?: string
    whatIsService?: string
    whoNeedsService?: string
    whyChooseCompany?: string
  }
) {
  await requireAdmin()
  await prisma.geoContent.update({ where: { id }, data })
  revalidatePath("/admin/seo/geo")
  refresh()
}

export async function deleteGeoContent(id: string) {
  await requireAdmin()
  await prisma.geoContent.delete({ where: { id } })
  revalidatePath("/admin/seo/geo")
  refresh()
}
