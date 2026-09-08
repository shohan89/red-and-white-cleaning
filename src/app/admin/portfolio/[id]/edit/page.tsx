import { notFound, redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { updatePortfolioItem, createPortfolioImage } from "@/actions/portfolio"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/admin/SubmitButton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ImageUploadField } from "@/components/admin/portfolio/ImageUploadField"
import { DeletePortfolioImageButton } from "../../PortfolioClient"
import { SaveStatus } from "@/components/admin/SaveStatus"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"

export const metadata = { title: "Edit Portfolio Item" }

function toDateInputValue(value: unknown): string {
  if (!value) return ""
  const d = new Date(value as string)
  if (Number.isNaN(d.getTime())) return ""
  return d.toISOString().slice(0, 10)
}

export default async function EditPortfolioItemPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ saved?: string }>
}) {
  const { id } = await params
  const { saved } = await searchParams
  const [item, categories, images] = await Promise.all([
    prisma.portfolioItem.findUnique({ where: { id } }),
    prisma.portfolioCategory.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.portfolioImage.findMany({ where: { portfolioItemId: id }, orderBy: { sortOrder: "asc" } }),
  ]).catch((err: unknown) => {
    console.error("[admin/portfolio/edit] DB error:", err)
    throw err
  })

  if (!item) notFound()

  async function handleUpdate(formData: FormData) {
    "use server"
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const location = formData.get("location") as string
    const clientName = formData.get("clientName") as string
    const completedAtRaw = formData.get("completedAt") as string
    const categoryId = formData.get("categoryId") as string
    const imageUrl = formData.get("imageUrl") as string
    const imageAlt = formData.get("imageAlt") as string
    const imageCaption = formData.get("imageCaption") as string
    const imageTitle = formData.get("imageTitle") as string
    const beforeImage = formData.get("beforeImage") as string
    const afterImage = formData.get("afterImage") as string
    const beforeAlt = formData.get("beforeAlt") as string
    const afterAlt = formData.get("afterAlt") as string
    const featured = formData.get("featured") === "on"
    const seoTitle = formData.get("seoTitle") as string
    const seoDesc = formData.get("seoDesc") as string
    const ogImage = formData.get("ogImage") as string

    await updatePortfolioItem(id, {
      title,
      description: description || undefined,
      location: location || undefined,
      clientName: clientName || undefined,
      completedAt: completedAtRaw ? new Date(completedAtRaw) : undefined,
      categoryId,
      imageUrl: imageUrl || undefined,
      imageAlt: imageAlt || undefined,
      imageCaption: imageCaption || undefined,
      imageTitle: imageTitle || undefined,
      beforeImage: beforeImage || undefined,
      afterImage: afterImage || undefined,
      beforeAlt: beforeAlt || undefined,
      afterAlt: afterAlt || undefined,
      featured,
      seoTitle: seoTitle || undefined,
      seoDesc: seoDesc || undefined,
      ogImage: ogImage || undefined,
    })
    redirect(`/admin/portfolio/${id}/edit?saved=1`)
  }

  async function handleAddImage(formData: FormData) {
    "use server"
    const imageUrl = formData.get("newImageUrl") as string
    const label = formData.get("newImageLabel") as string
    const altText = formData.get("newImageAlt") as string
    if (!imageUrl?.trim()) return
    await createPortfolioImage(id, {
      imageUrl: imageUrl.trim(),
      label: label || undefined,
      altText: altText || undefined,
    })
    redirect(`/admin/portfolio/${id}/edit`)
  }

  return (
    <div className="space-y-6">
      <SaveStatus saved={saved} />
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="clientName">Client / Company Name</Label>
            <Input id="clientName" name="clientName" defaultValue={(item.clientName as string) ?? ""} placeholder="e.g. Tricar" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="completedAt">Completion Date</Label>
            <Input id="completedAt" name="completedAt" type="date" defaultValue={toDateInputValue(item.completedAt)} />
          </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="imageTitle">Image Title</Label>
              <Input id="imageTitle" name="imageTitle" defaultValue={(item.imageTitle as string) ?? ""} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="imageCaption">Image Caption</Label>
              <Input id="imageCaption" name="imageCaption" defaultValue={(item.imageCaption as string) ?? ""} />
            </div>
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

        <div className="border-t pt-5 space-y-4">
          <p className="text-sm font-semibold text-gray-700">SEO (optional)</p>
          <div className="space-y-1.5">
            <Label htmlFor="seoTitle">SEO Title</Label>
            <Input id="seoTitle" name="seoTitle" defaultValue={(item.seoTitle as string) ?? ""} placeholder="Overrides the page title for this project…" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="seoDesc">SEO Description</Label>
            <Textarea id="seoDesc" name="seoDesc" rows={2} defaultValue={(item.seoDesc as string) ?? ""} placeholder="Meta description for this project…" />
          </div>
          <div className="space-y-1.5">
            <Label>Social Share Image (OG Image)</Label>
            <ImageUploadField fieldName="ogImage" defaultValue={(item.ogImage as string) ?? ""} />
          </div>
        </div>

        <div className="border-t pt-4 flex items-center gap-2">
          <Checkbox id="featured" name="featured" defaultChecked={item.featured} />
          <Label htmlFor="featured" className="cursor-pointer">
            Featured item
          </Label>
        </div>

        <div className="flex gap-3 pt-2">
          <SubmitButton className="bg-brand-red hover:bg-brand-red/90 text-white">
            Save Changes
          </SubmitButton>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/portfolio">Cancel</Link>
          </Button>
        </div>
      </form>

      {/* Additional Images Gallery */}
      <section className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 border-b pb-2">
          Additional Images ({images.length})
        </h2>
        <p className="text-xs text-muted-foreground">
          Extra photos for this project beyond the main image and before/after pair — detail shots, different angles, progress photos, etc.
        </p>
        {images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {images.map((img) => (
              <div key={img.id as string} className="flex gap-3 p-3 rounded-lg border bg-gray-50">
                <div className="relative h-16 w-16 shrink-0 rounded-md overflow-hidden bg-gray-100">
                  {img.imageUrl ? (
                    <Image src={img.imageUrl as string} alt={(img.altText as string) ?? ""} fill sizes="64px" className="object-cover" />
                  ) : null}
                </div>
                <div className="flex-1 min-w-0">
                  {img.label ? <p className="text-xs font-semibold text-brand-red uppercase">{img.label as string}</p> : null}
                  <p className="text-xs text-muted-foreground truncate">{(img.caption as string) || (img.altText as string) || (img.imageUrl as string)}</p>
                </div>
                <DeletePortfolioImageButton id={img.id as string} />
              </div>
            ))}
          </div>
        )}
        <div className="border-t pt-4 space-y-3">
          <p className="text-xs font-medium text-gray-600">Add Image</p>
          <form action={handleAddImage} className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Image</Label>
              <ImageUploadField fieldName="newImageUrl" placeholder="/images/portfolio/…" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="newImageLabel" className="text-xs">Label (optional)</Label>
                <Input id="newImageLabel" name="newImageLabel" placeholder="e.g. Detail shot" className="text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="newImageAlt" className="text-xs">Alt Text</Label>
                <Input id="newImageAlt" name="newImageAlt" placeholder="Descriptive alt text…" className="text-sm" />
              </div>
            </div>
            <Button type="submit" variant="outline" size="sm">Add Image</Button>
          </form>
        </div>
      </section>
    </div>
  )
}
