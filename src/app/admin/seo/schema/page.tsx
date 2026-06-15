import { prisma } from "@/lib/prisma"
import { SchemaToggle } from "./SchemaClient"
import { Badge } from "@/components/ui/badge"

export const metadata = { title: "Schema / JSON-LD" }

const SCHEMA_DESCRIPTIONS: Record<string, { label: string; desc: string }> = {
  LocalBusiness: { label: "Local Business", desc: "Core business schema with address, phone, hours. Required for Google Business integrations." },
  CleaningService: { label: "Cleaning Service", desc: "Service-specific schema identifying the business as a professional cleaning service." },
  Organization: { label: "Organization", desc: "Brand identity schema for knowledge graph integration." },
  WebSite: { label: "Website + Sitelinks Search", desc: "Enables sitelinks searchbox in Google results." },
  FAQPage: { label: "FAQ Page", desc: "Makes FAQ answers appear directly in Google search results (rich snippets)." },
  BreadcrumbList: { label: "Breadcrumbs", desc: "Shows page hierarchy in Google search results." },
  ImageObject: { label: "Image Object", desc: "Structured data for portfolio and service images." },
}

export default async function SchemaPage() {
  const configs = await prisma.schemaConfig.findMany({ orderBy: { type: "asc" } })

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-heading font-bold text-brand-dark">Schema / JSON-LD</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Toggle structured data schemas. Enabled schemas are injected into page{" "}
          <code className="text-xs bg-gray-100 px-1 rounded">&lt;head&gt;</code> automatically.
        </p>
      </div>

      {configs.length === 0 ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          No schema configs found. Run <code className="font-mono bg-amber-100 px-1 rounded">npm run db:seed</code> to populate default schemas.
        </div>
      ) : (
        <div className="rounded-lg border bg-white overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {configs.map((config) => {
              const info = SCHEMA_DESCRIPTIONS[config.type] ?? { label: config.type, desc: "" }
              return (
                <li key={config.id} className="flex items-start gap-4 px-4 py-4">
                  <SchemaToggle type={config.type} enabled={config.enabled} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900">{info.label}</p>
                      <Badge variant="outline" className="text-xs font-mono">
                        {config.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{info.desc}</p>
                  </div>
                  {config.enabled && (
                    <span className="text-xs text-green-600 font-medium shrink-0">Active</span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
