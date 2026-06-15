import { notFound, redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { updatePortfolioItem } from "@/actions/portfolio"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ImageUploadField } from "@/components/admin/portfolio/ImageUploadField"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export const metadata = { title: "Edit Portfolio Item" }

export default async function EditPortfolioItemPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [item, categories] = await Promise.all([
    prisma.portfolioItem.findUnique({ where: { id } }),
    prisma.portfolioCategory.findMany({ orderBy: { sortOrder: "asc" } }),
  ])

  if (!item) notFound()

  async function handleUpdate(formData: FormData) {
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

    await updatePortfolioItem(id, {
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
        <h1 className="text-xl font-heading font-bold text-brand-dark">Edit Portfolio Item</h1>
      </div>

      <form action={handleUpdate} className="space-y-5 bg-white rounded-lg border p-6">
        <div className="space-y-1.5">
          <Label htmlFor="categoryId">Category *</Label>
          <select
            id="categoryId"
            name="categoryId"
            required
            defaultValue={item.categoryId}
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
          <Input id="title" name="title" required defaultValue={item.title} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" rows={3} defaultValue={item.description ?? ""} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" defaultValue={item.location ?? ""} />
        </div>

        <div className="border-t pt-5 space-y-4">
          <p className="text-sm font-semibold text-gray-700">Main Image</p>
          <div className="space-y-1.5">
            <Label>Image</Label>
            <ImageUploadField fieldName="imageUrl" defaultValue={item.imageUrl ?? ""} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="imageAlt">Image Alt Text</Label>
            <Input id="imageAlt" name="imageAlt" defaultValue={item.imageAlt ?? ""} />
          </div>
        </div>

        <div className="border-t pt-5 space-y-4">
          <p className="text-sm font-semibold text-gray-700">Before / After</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Before Image</Label>
              <ImageUploadField fieldName="beforeImage" defaultValue={item.beforeImage ?? ""} />
            </div>
            <div className="space-y-1.5">
              <Label>After Image</Label>
              <ImageUploadField fieldName="afterImage" defaultValue={item.afterImage ?? ""} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="beforeAlt">Before Alt Text</Label>
              <Input id="beforeAlt" name="beforeAlt" defaultValue={item.beforeAlt ?? ""} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="afterAlt">After Alt Text</Label>
              <Input id="afterAlt" name="afterAlt" defaultValue={item.afterAlt ?? ""} />
            </div>
          </div>
        </div>

        <div className="border-t pt-4 flex items-center gap-2">
          <Checkbox id="featured" name="featured" defaultChecked={item.featured} />
          <Label htmlFor="featured" className="cursor-pointer">
            Featured item
          </Label>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" className="bg-brand-red hover:bg-brand-red/90 text-white">
            Save Changes
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/portfolio">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
