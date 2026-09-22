import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"

const DEFAULT_SITE_URL = "https://redandwhitecleaningservices.com"

/** Ensures a URL string has a scheme and no trailing slash, so `new URL()` never throws on it. */
function normalizeSiteUrl(url: string | null | undefined): string {
  const trimmed = (url ?? "").trim().replace(/\/+$/, "")
  if (!trimmed) return DEFAULT_SITE_URL
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

export async function getPageMetadata(
  pageKey: string,
  fallback: {
    title: string
    description: string
    canonical?: string
  }
): Promise<Metadata> {
  try {
    const [seo, global] = await Promise.all([
      prisma.pageSeo.findUnique({ where: { pageKey } }),
      prisma.globalSeo.findFirst(),
    ])

    const siteName = global?.siteName ?? "Red and White Cleaning Services"
    const siteUrl = normalizeSiteUrl(global?.siteUrl)
    const title = seo?.metaTitle || fallback.title
    const description = seo?.metaDesc || fallback.description
    const canonical = seo?.canonicalUrl || (fallback.canonical ?? `${siteUrl}/${pageKey === "home" ? "" : pageKey}`)
    const ogImage = seo?.ogImage || global?.defaultOgImage || `${siteUrl}/images/og-default.jpg`

    // A malformed siteUrl must never take down the rest of this page's metadata
    // (canonical/openGraph/etc below) — only metadataBase itself falls back.
    let metadataBase: URL
    try {
      metadataBase = new URL(siteUrl)
    } catch {
      metadataBase = new URL(DEFAULT_SITE_URL)
    }

    return {
      title,
      description,
      metadataBase,
      alternates: { canonical },
      robots: seo?.robots || "index, follow",
      openGraph: {
        title: seo?.ogTitle || title,
        description: seo?.ogDesc || description,
        url: canonical,
        siteName,
        images: [{ url: ogImage }],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: seo?.twitterTitle || title,
        description: seo?.twitterDesc || description,
        images: seo?.twitterImage ? [seo.twitterImage] : [ogImage],
      },
    }
  } catch {
    return { title: fallback.title, description: fallback.description }
  }
}
