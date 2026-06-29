import { MetadataRoute } from "next"
import { prisma } from "@/lib/prisma"

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://redandwhitecleaningservices.com"

  try {
    const config = await prisma.robotsConfig.findFirst()
    if (config?.content) {
      // Parse the custom robots.txt content
      // Return as raw string via a workaround — Next.js robots() wants structured data
      // For full custom control, the content is parsed into rules
      const lines = config.content.split("\n").map((l) => l.trim())
      const rules: { userAgent: string; disallow: string[] | string; allow?: string[] | string }[] = []
      let current: { userAgent: string; disallow: string[]; allow: string[] } | null = null

      for (const line of lines) {
        if (line.startsWith("User-agent:")) {
          if (current) rules.push(current)
          current = { userAgent: line.replace("User-agent:", "").trim(), disallow: [], allow: [] }
        } else if (line.startsWith("Disallow:") && current) {
          current.disallow.push(line.replace("Disallow:", "").trim())
        } else if (line.startsWith("Allow:") && current) {
          current.allow.push(line.replace("Allow:", "").trim())
        }
      }
      if (current) rules.push(current)

      if (rules.length > 0) {
        return {
          rules,
          sitemap: `${baseUrl}/sitemap.xml`,
        }
      }
    }
  } catch {}

  // Default robots config
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin/", "/auth/", "/api/"] },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
