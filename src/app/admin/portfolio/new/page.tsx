import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { createPortfolioItem } from "@/actions/portfolio"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/admin/SubmitButton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ImageUploadField } from "@/components/admin/portfolio/ImageUploadField"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export const metadata = { title: "New Portfolio Item" }

export default async function NewPortfolioItemPage() {
  let categories: Array<{ id: string; name: string }> = []
  try {
    categories = await prisma.portfolioCategory.findMany({ orderBy: { sortOrder: "asc" } })
  } catch (err) {
    console.error("[admin/portfolio/new] DB error:", err)
  }

  async function handleCreate(formData: FormData) {
    "use server"
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const location = formData.get("location") as string
    const categoryId = formData.get("categoryId") as string
    const imageUrl = formData.get("imageUrl") as string
    const imageAlt = formData.get("imageAlt") as string
    const beforeImage = formData.get("beforeImage") as string
    const afterImage = formData.get("afterImage") as string
    const beforeAlt = formData.get("beforeAlt") as string
    const afterAlt = formData.get("afterAlt") as string
    const featured = formData.get("featured") === "on"

    if (!title || !categoryId) return
    await createPortfolioItem({
      title,
      description: description || undefined,
      location: location || undefined,
      categoryId,
      imageUrl: imageUrl || undefined,
      imageAlt: imageAlt || undefined,
      beforeImage: beforeImage || undefined,
      afterImage: afterImage || undefined,
      beforeAlt: beforeAlt || undefined,
      afterAlt: afterAlt || undefined,
      featured,
    })
    redirect("/admin/portfolio")
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
        <h1 className="text-xl font-heading font-bold text-brand-dark">New Portfolio Item</h1>
      </div>

      <form action={handleCreate} className="space-y-5 bg-white rounded-lg border p-6">
        <div className="space-y-1.5">
          <Label htmlFor="categoryId">Category *</Label>
          <select
            id="categoryId"
            name="categoryId"
            required
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="">Select category…</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="title">Title *</Label>
          <Input id="title" name="title" required placeholder="Project title…" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" rows={3} placeholder="Short project description…" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" placeholder="City, Province" />
        </div>

        <div className="border-t pt-5 space-y-4">
          <p className="text-sm font-semibold text-gray-700">Main Image</p>
          <div className="space-y-1.5">
            <Label>Image</Label>
            <ImageUploadField fieldName="imageUrl" placeholder="/images/portfolio/…" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="imageAlt">Image Alt Text</Label>
            <Input id="imageAlt" name="imageAlt" placeholder="Descriptive alt text for SEO…" />
          </div>
        </div>

        <div className="border-t pt-5 space-y-4">
          <p className="text-sm font-semibold text-gray-700">Before / After (optional)</p>
          <p className="text-xs text-muted-foreground">If both before and after images are set, this item renders as a slider.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Before Image</Label>
              <ImageUploadField fieldName="beforeImage" placeholder="/images/portfolio/before…" />
            </div>
            <div className="space-y-1.5">
              <Label>After Image</Label>
              <ImageUploadField fieldName="afterImage" placeholder="/images/portfolio/after…" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="beforeAlt">Before Alt Text</Label>
              <Input id="beforeAlt" name="beforeAlt" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="afterAlt">After Alt Text</Label>
              <Input id="afterAlt" name="afterAlt" />
            </div>
          </div>
        </div>

        <div className="border-t pt-4 flex items-center gap-2">
          <Checkbox id="featured" name="featured" />
          <Label htmlFor="featured" className="cursor-pointer">
            Featured item (shown prominently)
          </Label>
        </div>

        <div className="flex gap-3 pt-2">
          <SubmitButton className="bg-brand-red hover:bg-brand-red/90 text-white">
            Create Item
          </SubmitButton>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/portfolio">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
