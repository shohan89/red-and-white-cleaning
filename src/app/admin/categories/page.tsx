import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { createPortfolioCategory } from "@/actions/portfolio"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { DeleteCategoryButton } from "./CategoriesClient"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export const metadata = { title: "Portfolio Categories" }

export default async function CategoriesPage() {
  let categories: Array<{ id: string; name: string; slug: string; _count: { items: number } }> = []
  try {
    categories = await prisma.portfolioCategory.findMany({
      orderBy: { sortOrder: "asc" },
      include: { _count: { select: { items: true } } },
    })
  } catch (err) {
    console.error("[admin/categories] DB error:", err)
  }

  async function handleCreate(formData: FormData) {
    "use server"
    const name = formData.get("name") as string
    const slug = formData.get("slug") as string
    const description = formData.get("description") as string
    if (!name || !slug) return
    await createPortfolioCategory({ name, slug, description: description || undefined })
    redirect("/admin/categories")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/portfolio">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Portfolio
          </Link>
        </Button>
        <h1 className="text-xl font-heading font-bold text-brand-dark">Portfolio Categories</h1>
      </div>

      {/* Existing categories */}
      <div className="bg-white rounded-lg border overflow-hidden">
        {categories.length === 0 ? (
          <p className="text-sm text-muted-foreground p-4">No categories yet.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {categories.map((cat) => (
              <li key={cat.id} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{cat.name}</p>
                  <p className="text-xs text-muted-foreground">/{cat.slug}</p>
                </div>
                <Badge variant="secondary" className="text-xs shrink-0">
                  {cat._count.items} items
                </Badge>
                <DeleteCategoryButton id={cat.id} name={cat.name} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Create form */}
      <div className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">Add Category</h2>
        <form action={handleCreate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name *</Label>
              <Input id="name" name="name" required placeholder="Post-Construction" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="slug">Slug *</Label>
              <Input id="slug" name="slug" required placeholder="post-construction" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Input id="description" name="description" placeholder="Optional description…" />
          </div>
          <Button type="submit" className="bg-brand-red hover:bg-brand-red/90 text-white">
            Create Category
          </Button>
        </form>
      </div>
    </div>
  )
}
