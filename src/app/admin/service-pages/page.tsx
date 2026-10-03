import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, ExternalLink } from "lucide-react"

export const metadata = { title: "Service Pages" }

type Row = { id: string; name: string; slug: string; title: string }

export default async function ServicePagesAdminPage() {
  let services: Row[] = []
  let counts: Record<string, Record<string, number>> = {}
  try {
    services = (await prisma.service.findMany({ orderBy: { sortOrder: "asc" } })) as unknown as Row[]
    const items = (await prisma.servicePageItem.findMany({})) as unknown as Array<{ serviceId: string; sectionKey: string }>
    for (const i of items) {
      counts[i.serviceId] ??= {}
      counts[i.serviceId][i.sectionKey] = (counts[i.serviceId][i.sectionKey] ?? 0) + 1
    }
  } catch (err) {
    console.error("[admin/service-pages] DB error:", err)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-brand-dark">Service Pages</h1>
        <p className="text-sm text-muted-foreground">
          Edit the content of each single service page: hero, intro, what&apos;s included, how we work, industries, why choose,
          service areas and related links.
        </p>
      </div>

      <div className="rounded-lg border bg-white overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {services.map((s) => {
            const c = counts[s.id] ?? {}
            const missingHow = !c["how-we-work"]
            return (
              <li key={s.id} className="flex items-center gap-4 px-4 py-4 hover:bg-gray-50">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{s.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">/services/{s.slug}</p>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    <Badge variant={missingHow ? "destructive" : "secondary"} className="text-xs">
                      How We Work: {c["how-we-work"] ?? 0}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">Industries: {c.industries ?? 0}</Badge>
                    <Badge variant="secondary" className="text-xs">Why Choose: {c["why-choose"] ?? 0}</Badge>
                    <Badge variant="secondary" className="text-xs">Areas: {c["service-areas"] ?? 0}</Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/services/${s.slug}`} target="_blank">
                    <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                    View
                  </Link>
                </Button>
                <Button size="sm" asChild className="bg-brand-red hover:bg-brand-red/90 text-white">
                  <Link href={`/admin/service-pages/${s.slug}`}>
                    <Pencil className="h-3.5 w-3.5 mr-1.5" />
                    Edit Page
                  </Link>
                </Button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
