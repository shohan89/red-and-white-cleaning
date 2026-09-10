import { notFound, redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { updateBlogPost } from "@/actions/blog"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/admin/SubmitButton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUploadField } from "@/components/admin/portfolio/ImageUploadField"
import { RichTextEditor } from "@/components/admin/RichTextEditor"
import { SaveStatus } from "@/components/admin/SaveStatus"
import Link from "next/link"
import { ChevronLeft, ExternalLink } from "lucide-react"

export const metadata = { title: "Edit Post" }

export default async function EditBlogPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ saved?: string }>
}) {
  const { id } = await params
  const { saved } = await searchParams
  const [post, categories] = await Promise.all([
    prisma.blogPost.findUnique({ where: { id } }),
    prisma.blogCategory.findMany({ orderBy: { sortOrder: "asc" } }),
  ]).catch((err: unknown) => {
    console.error("[admin/blog/edit] DB error:", err)
    throw err
  })

  if (!post) notFound()

  async function handleUpdate(formData: FormData) {
    "use server"
    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const excerpt = formData.get("excerpt") as string
    const content = formData.get("content") as string
    const coverImage = formData.get("coverImage") as string
    const coverImageAlt = formData.get("coverImageAlt") as string
    const authorName = formData.get("authorName") as string
    const categoryId = formData.get("categoryId") as string
    const tagsRaw = formData.get("tags") as string
    const status = formData.get("status") as "DRAFT" | "PUBLISHED"
    const seoTitle = formData.get("seoTitle") as string
    const seoDesc = formData.get("seoDesc") as string
    const ogImage = formData.get("ogImage") as string

    await updateBlogPost(id, {
      title,
      slug,
      excerpt: excerpt || undefined,
      content,
      coverImage: coverImage || undefined,
      coverImageAlt: coverImageAlt || undefined,
      authorName: authorName || undefined,
      categoryId: categoryId || undefined,
      tags: tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [],
      status,
      seoTitle: seoTitle || undefined,
      seoDesc: seoDesc || undefined,
      ogImage: ogImage || undefined,
    }, post!.status as string)
    redirect(`/admin/blog/${id}/edit?saved=1`)
  }

  return (
    <div className="space-y-6">
      <SaveStatus saved={saved} />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/blog">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Blog
            </Link>
          </Button>
          <h1 className="text-xl font-heading font-bold text-brand-dark">Edit Post</h1>
        </div>
        {post.status === "PUBLISHED" && (
          <Button variant="outline" size="sm" asChild>
            <Link href={`/blog/${post.slug}`} target="_blank">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Live
            </Link>
          </Button>
        )}
      </div>

      <form action={handleUpdate} className="space-y-5 bg-white rounded-lg border p-6">
        <div className="space-y-1.5">
          <Label htmlFor="title">Title *</Label>
          <Input id="title" name="title" required defaultValue={post.title as string} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="slug">Slug *</Label>
          <Input id="slug" name="slug" required pattern="[a-z0-9-]+" defaultValue={post.slug as string} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea id="excerpt" name="excerpt" rows={2} defaultValue={(post.excerpt as string) ?? ""} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="categoryId">Category</Label>
            <select
              id="categoryId"
              name="categoryId"
              defaultValue={(post.categoryId as string) ?? ""}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">No category</option>
              {categories.map((cat) => (
                <option key={cat.id as string} value={cat.id as string}>{cat.name as string}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              defaultValue={post.status as string}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="authorName">Author</Label>
          <Input id="authorName" name="authorName" defaultValue={(post.authorName as string) ?? ""} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input id="tags" name="tags" defaultValue={((post.tags as string[]) ?? []).join(", ")} />
        </div>

        <div className="border-t pt-5 space-y-4">
          <p className="text-sm font-semibold text-gray-700">Cover Image</p>
          <div className="space-y-1.5">
            <Label>Image</Label>
            <ImageUploadField fieldName="coverImage" defaultValue={(post.coverImage as string) ?? ""} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="coverImageAlt">Alt Text</Label>
            <Input id="coverImageAlt" name="coverImageAlt" defaultValue={(post.coverImageAlt as string) ?? ""} />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Content *</Label>
          <RichTextEditor name="content" defaultValue={post.content as string} />
        </div>

        <div className="border-t pt-5 space-y-4">
          <p className="text-sm font-semibold text-gray-700">SEO (optional)</p>
          <div className="space-y-1.5">
            <Label htmlFor="seoTitle">SEO Title</Label>
            <Input id="seoTitle" name="seoTitle" defaultValue={(post.seoTitle as string) ?? ""} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="seoDesc">SEO Description</Label>
            <Textarea id="seoDesc" name="seoDesc" rows={2} defaultValue={(post.seoDesc as string) ?? ""} />
          </div>
          <div className="space-y-1.5">
            <Label>Social Share Image (OG Image)</Label>
            <ImageUploadField fieldName="ogImage" defaultValue={(post.ogImage as string) ?? ""} />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <SubmitButton className="bg-brand-red hover:bg-brand-red/90 text-white">
            Save Changes
          </SubmitButton>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/blog">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
