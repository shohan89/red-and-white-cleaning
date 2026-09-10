"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

async function requireAdmin() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
}

function revalidateBlog(slug?: string) {
  revalidatePath("/admin/blog")
  revalidatePath("/blog")
  if (slug) revalidatePath(`/blog/${slug}`)
  revalidatePath("/sitemap.xml")
}

export async function createBlogCategory(data: { name: string; slug: string }) {
  await requireAdmin()
  const maxSort = await prisma.blogCategory.aggregate({ _max: { sortOrder: true } })
  const category = await prisma.blogCategory.create({
    data: { ...data, sortOrder: (maxSort._max.sortOrder ?? -1) + 1 },
  })
  revalidatePath("/admin/blog/categories")
  return category
}

export async function deleteBlogCategory(id: string) {
  await requireAdmin()
  const postCount = await prisma.blogPost.count({ where: { categoryId: id } })
  if (postCount > 0) {
    throw new Error(`Can't delete: ${postCount} post${postCount === 1 ? "" : "s"} still in this category. Move or delete them first.`)
  }
  await prisma.blogCategory.delete({ where: { id } })
  revalidatePath("/admin/blog/categories")
}

interface BlogPostFields {
  title: string
  slug: string
  excerpt?: string
  content: string
  coverImage?: string
  coverImageAlt?: string
  status?: "DRAFT" | "PUBLISHED"
  authorName?: string
  tags?: string[]
  categoryId?: string
  seoTitle?: string
  seoDesc?: string
  ogImage?: string
}

export async function createBlogPost(data: BlogPostFields) {
  await requireAdmin()
  const status = data.status ?? "DRAFT"
  const post = await prisma.blogPost.create({
    data: {
      ...data,
      status,
      publishedAt: status === "PUBLISHED" ? new Date() : null,
    },
  })
  revalidateBlog(post.slug as string)
  return post
}

export async function updateBlogPost(id: string, data: Partial<BlogPostFields>, currentStatus?: string) {
  await requireAdmin()
  const update: Record<string, unknown> = { ...data }
  if (data.status && data.status !== currentStatus) {
    update.publishedAt = data.status === "PUBLISHED" ? new Date() : null
  }
  const post = await prisma.blogPost.update({ where: { id }, data: update })
  revalidateBlog(post!.slug as string)
  return post
}

export async function deleteBlogPost(id: string) {
  await requireAdmin()
  const post = await prisma.blogPost.findUnique({ where: { id } })
  await prisma.blogPost.delete({ where: { id } })
  revalidateBlog(post?.slug as string | undefined)
}
