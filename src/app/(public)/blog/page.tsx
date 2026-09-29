export const dynamic = 'force-dynamic'

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPageMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";
import { FileText, X } from "lucide-react";
import { BlogSidebar } from "@/components/blog/BlogSidebar";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("blog", {
    title: 'Blog | Red and White Cleaning Services',
    description: 'Cleaning tips, project stories, and updates from Red and White Cleaning Services — serving KW Region, Guelph, Hamilton, London, and Brantford.',
    canonical: "/blog",
  })
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; tag?: string; q?: string }>
}) {
  const { category, tag, q } = await searchParams

  let posts: Array<{
    id: string
    title: string
    slug: string
    excerpt: string | null
    coverImage: string | null
    coverImageAlt: string | null
    publishedAt: Date | null
    tags: string[] | null
    category: { name: string; slug: string } | null
  }> = []

  try {
    posts = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      include: { category: { select: { name: true, slug: true } } },
    })
  } catch (err) {
    console.error("[blog] DB error:", err)
  }

  if (category) posts = posts.filter((p) => p.category?.slug === category)
  if (tag) posts = posts.filter((p) => (p.tags ?? []).includes(tag))
  if (q) {
    const needle = q.toLowerCase()
    posts = posts.filter(
      (p) => p.title.toLowerCase().includes(needle) || (p.excerpt ?? "").toLowerCase().includes(needle)
    )
  }

  let activeFilterLabel: string | null = null
  if (category) {
    const cat = await prisma.blogCategory.findFirst({ where: { slug: category }, select: { name: true } }).catch(() => null)
    activeFilterLabel = `Category: ${(cat?.name as string | undefined) ?? category}`
  } else if (tag) {
    activeFilterLabel = `Tag: #${tag}`
  } else if (q) {
    activeFilterLabel = `Search: "${q}"`
  }

  return (
    <main className="flex min-h-screen flex-col">
      <section className="relative overflow-hidden bg-brand-dark pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-brand-dark/75 to-brand-dark" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-brand-red),transparent_50%)] opacity-25" aria-hidden="true" />
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-brand-white sm:text-5xl md:text-6xl leading-tight">
              Blog
            </h1>
            <p className="mt-6 text-lg leading-8 text-brand-gray/80 sm:text-xl max-w-2xl mx-auto">
              Cleaning tips, project stories, and updates from our crew.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-3 items-start">
          <div className="lg:col-span-2">
          {activeFilterLabel && (
            <div className="mb-8 flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-sm font-medium text-foreground">
                {activeFilterLabel}
                <Link href="/blog" aria-label="Clear filter" className="text-muted-foreground hover:text-brand-red">
                  <X className="h-3.5 w-3.5" />
                </Link>
              </span>
            </div>
          )}
          {posts.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <FileText className="h-10 w-10 mx-auto mb-3 text-gray-300" />
              <p>No posts found.</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg hover:border-brand-red/40 transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] bg-muted overflow-hidden">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.coverImageAlt ?? post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <FileText className="h-10 w-10 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-6">
                    {post.category && (
                      <span className="inline-block text-xs font-semibold uppercase tracking-wider text-brand-red mb-2">
                        {post.category.name}
                      </span>
                    )}
                    <h2 className="text-lg font-bold text-foreground group-hover:text-brand-red transition-colors duration-200 mb-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
                    )}
                    {post.publishedAt && (
                      <p className="text-xs text-muted-foreground mt-4">
                        {new Date(post.publishedAt).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
          </div>

          <BlogSidebar activeCategorySlug={category} activeTag={tag} />
          </div>
        </div>
      </section>
    </main>
  );
}
