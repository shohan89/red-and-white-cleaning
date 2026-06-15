import { prisma } from "@/lib/prisma"
import { GeoClient } from "./GeoClient"

export const metadata = { title: "GEO / AI SEO" }

export default async function GeoSeoPage() {
  const records = await prisma.geoContent.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-brand-dark">GEO / AI SEO</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Structured content for AI search engines, Google SGE, and generative answer systems. Each entry describes an entity (service, location, company) with targeted keywords and natural-language answers.
        </p>
      </div>

      <GeoClient records={records} />
    </div>
  )
}
