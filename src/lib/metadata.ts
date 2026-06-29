import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"

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
    const siteUrl = global?.siteUrl ?? "https://redandwhitecleaningservices.com"
    const title = seo?.metaTitle || fallback.title
    const description = seo?.metaDesc || fallback.description
    const canonical = seo?.canonicalUrl || (fallback.canonical ?? `${siteUrl}/${pageKey === "home" ? "" : pageKey}`)
    const ogImage = seo?.ogImage || global?.defaultOgImage || `${siteUrl}/images/og-default.jpg`

    return {
      title,
      description,
      metadataBase: new URL(siteUrl),
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
