import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Star } from "lucide-react"
import { FeaturedToggle, DeleteItemButton } from "./PortfolioClient"

export const metadata = { title: "Portfolio" }

export default async function PortfolioAdminPage() {
  let items: Array<{ id: string; title: string; featured: boolean; imageUrl: string | null; imageAlt: string | null; beforeImage: string | null; afterImage: string | null; location: string | null; sortOrder: number; createdAt: Date; categoryId: string; category: { name: string; slug: string } }> = []
  let categories: Array<{ id: string; name: string; slug: string; sortOrder: number }> = []
  try {
    ;[items, categories] = await Promise.all([
      prisma.portfolioItem.findMany({
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        include: { category: { select: { name: true, slug: true } } },
      }),
      prisma.portfolioCategory.findMany({ orderBy: { sortOrder: "asc" } }),
    ])
  } catch (err) {
    console.error("[admin/portfolio] DB error:", err)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-brand-dark">Portfolio</h1>
          <p className="text-sm text-muted-foreground">{items.length} items</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/categories">Manage Categories</Link>
          </Button>
          <Button asChild className="bg-brand-red hover:bg-brand-red/90 text-white">
            <Link href="/admin/portfolio/new">
              <Plus className="h-4 w-4 mr-2" />
              New Item
            </Link>
          </Button>
        </div>
      </div>

      {categories.length === 0 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          No categories yet.{" "}
          <Link href="/admin/categories" className="underline font-medium">
            Create categories first
          </Link>{" "}
          before adding portfolio items.
        </div>
      )}

      <div className="rounded-lg border bg-white overflow-hidden">
        {items.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-sm">No portfolio items yet.</p>
            <Button asChild className="mt-4 bg-brand-red hover:bg-brand-red/90 text-white">
              <Link href="/admin/portfolio/new">
                <Plus className="h-4 w-4 mr-2" />
                Add First Item
              </Link>
            </Button>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50"
              >
                {/* Thumbnail */}
                <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 relative">
                  {(item.imageUrl || item.beforeImage) && (
                    <Image
                      src={(item.imageUrl || item.beforeImage)!}
                      alt={item.imageAlt ?? item.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                    {item.featured && (
                      <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500 shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="secondary" className="text-xs">
                      {item.category.name}
                    </Badge>
                    {item.location && (
                      <span className="text-xs text-muted-foreground">{item.location}</span>
                    )}
                    {item.beforeImage && item.afterImage && (
                      <Badge variant="outline" className="text-xs">Before/After</Badge>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 text-muted-foreground" />
                    <FeaturedToggle id={item.id} featured={item.featured} />
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/portfolio/${item.id}/edit`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DeleteItemButton id={item.id} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
