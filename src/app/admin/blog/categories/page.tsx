import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { createBlogCategory } from "@/actions/blog"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/admin/SubmitButton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { DeleteBlogCategoryButton } from "../BlogClient"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export const metadata = { title: "Blog Categories" }

export default async function BlogCategoriesPage() {
  let categories: Array<{ id: string; name: string; slug: string; _count: { posts: number } }> = []
  try {
    categories = await prisma.blogCategory.findMany({
      orderBy: { sortOrder: "asc" },
      include: { _count: { select: { posts: true } } },
    })
  } catch (err) {
    console.error("[admin/blog/categories] DB error:", err)
  }

  async function handleCreate(formData: FormData) {
    "use server"
    const name = formData.get("name") as string
    const slug = formData.get("slug") as string
    if (!name || !slug) return
    await createBlogCategory({ name, slug })
    redirect("/admin/blog/categories")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/blog">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Blog
          </Link>
        </Button>
        <h1 className="text-xl font-heading font-bold text-brand-dark">Blog Categories</h1>
      </div>

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
                  {cat._count.posts} posts
                </Badge>
                <DeleteBlogCategoryButton id={cat.id} name={cat.name} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">Add Category</h2>
        <form action={handleCreate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name *</Label>
              <Input id="name" name="name" required placeholder="Cleaning Tips" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="slug">Slug *</Label>
              <Input id="slug" name="slug" required pattern="[a-z0-9-]+" placeholder="cleaning-tips" />
            </div>
          </div>
          <SubmitButton className="bg-brand-red hover:bg-brand-red/90 text-white">
            Create Category
          </SubmitButton>
        </form>
      </div>
    </div>
  )
}
