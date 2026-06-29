import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, ExternalLink } from "lucide-react"

export const metadata = { title: "Services" }

export default async function ServicesAdminPage() {
  let services: Array<{ id: string; name: string; slug: string; description: string; sortOrder: number; _count: { phases: number; includedItems: number } }> = []
  try {
    services = await prisma.service.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        _count: { select: { phases: true, includedItems: true } },
      },
    })
  } catch (err) {
    console.error("[admin/services] DB error:", err)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-brand-dark">Services</h1>
          <p className="text-sm text-muted-foreground">{services.length} services</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/services" target="_blank">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Public Page
          </Link>
        </Button>
      </div>

      {services.length === 0 ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
          No services in database. Run <code className="font-mono bg-amber-100 px-1 rounded">npm run db:seed</code> to populate services.
        </div>
      ) : (
        <div className="rounded-lg border bg-white overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {services.map((service) => (
              <li key={service.id} className="flex items-center gap-4 px-4 py-4 hover:bg-gray-50">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{service.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {service.description}
                  </p>
                  <div className="flex gap-2 mt-1.5">
                    <Badge variant="secondary" className="text-xs">
                      {service._count.phases} phases
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {service._count.includedItems} included items
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/services/${service.slug}`}>
                    <Pencil className="h-3.5 w-3.5 mr-1.5" />
                    Edit
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
