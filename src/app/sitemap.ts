import { MetadataRoute } from "next"
import { prisma } from "@/lib/prisma"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://redandwhitecleaningservices.com"

  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/portfolio`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ]

  try {
    // DB-managed sitemap entries (overrides)
    const dbEntries = await prisma.sitemapEntry.findMany({
      where: { included: true },
      orderBy: { priority: "desc" },
    })

    if (dbEntries.length > 0) {
      return dbEntries.map((entry) => ({
        url: entry.url.startsWith("http") ? entry.url : `${baseUrl}${entry.url}`,
        lastModified: entry.updatedAt,
        changeFrequency: entry.changeFrequency as MetadataRoute.Sitemap[0]["changeFrequency"],
        priority: entry.priority,
      }))
    }
  } catch {}

  return staticRoutes
}
