export const dynamic = 'force-dynamic'

import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from "@/lib/prisma";
import { ChevronLeft } from "lucide-react";

async function getPost(slug: string) {
  try {
    return await prisma.blogPost.findFirst({
      where: { slug, status: "PUBLISHED" },
      include: { category: { select: { name: true, slug: true } } },
    })
  } catch (err) {
    console.error("[blog/slug] DB error:", err)
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: "Post Not Found" }

  const title = (post.seoTitle as string) || (post.title as string)
  const description = (post.seoDesc as string) || (post.excerpt as string) || undefined
  const ogImage = (post.ogImage as string) || (post.coverImage as string) || undefined
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://redandwhitecleaningservices.com"

  return {
    title,
    description,
    alternates: { canonical: `${baseUrl}/blog/${slug}` },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/blog/${slug}`,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: "article",
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: post.coverImage ? [post.coverImage] : undefined,
    datePublished: post.publishedAt ? new Date(post.publishedAt as unknown as string).toISOString() : undefined,
    dateModified: new Date(post.updatedAt as unknown as string).toISOString(),
    author: post.authorName ? { "@type": "Organization", name: post.authorName } : undefined,
  }

  return (
    <main className="flex min-h-screen flex-col">
      <article className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-brand-red transition-colors mb-8">
              <ChevronLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {post.category && (
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-brand-red mb-3">
                {post.category.name as string}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
              {post.title as string}
            </h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
              {post.authorName && <span>{post.authorName as string}</span>}
              {post.authorName && post.publishedAt ? <span aria-hidden="true">&middot;</span> : null}
              {post.publishedAt && (
                <time dateTime={new Date(post.publishedAt as unknown as string).toISOString()}>
                  {new Date(post.publishedAt as unknown as string).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
                </time>
              )}
            </div>

            {post.coverImage && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 border border-border">
                <Image
                  src={post.coverImage as string}
                  alt={(post.coverImageAlt as string) || (post.title as string)}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div
              className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-brand-red"
              dangerouslySetInnerHTML={{ __html: post.content as string }}
            />

            {((post.tags as string[]) ?? []).length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2 pt-8 border-t border-border">
                {(post.tags as string[]).map((tag) => (
                  <span key={tag} className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </main>
  );
}
