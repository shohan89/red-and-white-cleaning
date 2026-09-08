import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { createFaqCategory } from "@/actions/faqs"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/admin/SubmitButton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { DeleteFaqCategoryButton } from "../FaqsClient"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export const metadata = { title: "FAQ Categories" }

export default async function FaqCategoriesPage() {
  let categories: Array<{ id: string; name: string; slug: string; _count: { faqs: number } }> = []
  try {
    categories = await prisma.faqCategory.findMany({
      orderBy: { sortOrder: "asc" },
      include: { _count: { select: { faqs: true } } },
    })
  } catch (err) {
    console.error("[admin/faqs/categories] DB error:", err)
  }

  async function handleCreate(formData: FormData) {
    "use server"
    const name = formData.get("name") as string
    const slug = formData.get("slug") as string
    const icon = formData.get("icon") as string
    if (!name || !slug) return
    await createFaqCategory({ name, slug, icon: icon || undefined })
    redirect("/admin/faqs/categories")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/faqs">
            <ChevronLeft className="h-4 w-4 mr-1" />
            FAQs
          </Link>
        </Button>
        <h1 className="text-xl font-heading font-bold text-brand-dark">FAQ Categories</h1>
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
                  {cat._count.faqs} FAQs
                </Badge>
                <DeleteFaqCategoryButton id={cat.id} name={cat.name} />
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
              <Input id="name" name="name" required placeholder="General" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="slug">Slug *</Label>
              <Input id="slug" name="slug" required placeholder="general" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="icon">Icon</Label>
            <Input id="icon" name="icon" placeholder="Optional icon name…" />
          </div>
          <SubmitButton className="bg-brand-red hover:bg-brand-red/90 text-white">
            Create Category
          </SubmitButton>
        </form>
      </div>
    </div>
  )
}
