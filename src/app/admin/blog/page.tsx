import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil } from "lucide-react"
import { DeleteBlogPostButton } from "./BlogClient"

export const metadata = { title: "Blog" }

export default async function BlogAdminPage() {
  let posts: Array<{ id: string; title: string; slug: string; status: string; publishedAt: Date | null; category: { name: string } | null }> = []
  try {
    posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: { select: { name: true } } },
    })
  } catch (err) {
    console.error("[admin/blog] DB error:", err)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-brand-dark">Blog</h1>
          <p className="text-sm text-muted-foreground">{posts.length} posts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/blog/categories">Manage Categories</Link>
          </Button>
          <Button asChild className="bg-brand-red hover:bg-brand-red/90 text-white">
            <Link href="/admin/blog/new">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Link>
          </Button>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-gray-200 py-16 text-center">
          <p className="text-sm text-muted-foreground">No posts yet.</p>
          <Button asChild className="mt-4 bg-brand-red hover:bg-brand-red/90 text-white">
            <Link href="/admin/blog/new">
              <Plus className="h-4 w-4 mr-2" />
              Write First Post
            </Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-lg border bg-white overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {posts.map((post) => (
              <li key={post.id} className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-gray-900 truncate">{post.title}</p>
                    <Badge variant={post.status === "PUBLISHED" ? "default" : "secondary"} className={post.status === "PUBLISHED" ? "bg-green-100 text-green-700 hover:bg-green-100" : "text-xs"}>
                      {post.status === "PUBLISHED" ? "Published" : "Draft"}
                    </Badge>
                    {post.category && (
                      <Badge variant="secondary" className="text-xs">{post.category.name}</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">/{post.slug}</p>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/admin/blog/${post.id}/edit`}>
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>
                <DeleteBlogPostButton id={post.id} title={post.title} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
