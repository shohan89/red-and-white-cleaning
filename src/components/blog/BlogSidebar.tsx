import Link from "next/link";
import Image from "next/image";
import { Search, FileText, Sparkles } from "lucide-react";
import { prisma } from "@/lib/prisma";

interface BlogSidebarProps {
  currentSlug?: string;
  activeCategorySlug?: string;
  activeTag?: string;
}

async function getSidebarData(currentSlug?: string) {
  const categories = (await prisma.blogCategory.findMany({
    orderBy: { sortOrder: "asc" },
  })) as Array<{ id: string; name: string; slug: string }>;

  const categoryCounts = await Promise.all(
    categories.map((cat) =>
      prisma.blogPost.count({ where: { categoryId: cat.id, status: "PUBLISHED" } })
    )
  );

  const recentPosts = (await prisma.blogPost.findMany({
    where: currentSlug
      ? { status: "PUBLISHED", slug: { not: currentSlug } }
      : { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: 5,
    select: { id: true, slug: true, title: true, coverImage: true, coverImageAlt: true, publishedAt: true },
  })) as Array<{
    id: string;
    slug: string;
    title: string;
    coverImage: string | null;
    coverImageAlt: string | null;
    publishedAt: Date | null;
  }>;

  const allPosts = (await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    select: { tags: true },
  })) as Array<{ tags: string[] | null }>;

  const tagCounts = new Map<string, number>();
  for (const p of allPosts) {
    for (const tag of p.tags ?? []) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }
  const topTags = [...tagCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 14)
    .map(([tag]) => tag);

  return {
    categories: categories.map((cat, i) => ({ ...cat, count: categoryCounts[i] })),
    recentPosts,
    topTags,
  };
}

export async function BlogSidebar({ currentSlug, activeCategorySlug, activeTag }: BlogSidebarProps) {
  const { categories, recentPosts, topTags } = await getSidebarData(currentSlug);

  return (
    <aside className="space-y-6">
      <form action="/blog" method="GET" className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <label htmlFor="blog-search" className="sr-only">Search the blog</label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            id="blog-search"
            name="q"
            type="search"
            placeholder="Search articles…"
            className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/30"
          />
        </div>
      </form>

      {categories.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-dark border-b border-border pb-3">
            Categories
          </h2>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/blog?category=${cat.slug}`}
                  className={`flex items-center justify-between text-sm transition-colors ${
                    activeCategorySlug === cat.slug
                      ? "text-brand-red font-semibold"
                      : "text-muted-foreground hover:text-brand-red"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-xs text-muted-foreground">{cat.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {recentPosts.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-dark border-b border-border pb-3">
            Recent Posts
          </h2>
          <ul className="space-y-4">
            {recentPosts.map((post) => (
              <li key={post.id}>
                <Link href={`/blog/${post.slug}`} className="group flex gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.coverImageAlt ?? post.title}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <FileText className="h-5 w-5 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug text-foreground group-hover:text-brand-red transition-colors line-clamp-2">
                      {post.title}
                    </p>
                    {post.publishedAt && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {new Date(post.publishedAt).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" })}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {topTags.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-dark border-b border-border pb-3">
            Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {topTags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  activeTag === tag
                    ? "bg-brand-red text-white"
                    : "bg-muted text-muted-foreground hover:bg-brand-red/10 hover:text-brand-red"
                }`}
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-brand-dark p-6 text-center text-brand-white shadow-sm">
        <Sparkles className="mx-auto mb-3 h-6 w-6 text-brand-red" aria-hidden="true" />
        <h2 className="mb-2 text-base font-bold">Need a Cleaning Quote?</h2>
        <p className="mb-4 text-sm text-brand-gray/80">
          Tell us about your space — we&rsquo;ll reply the same business day.
        </p>
        <Link
          href="/contact"
          className="inline-block rounded-lg bg-brand-red px-4 py-2 text-sm font-semibold text-white hover:bg-brand-red/90 transition-colors"
        >
          Get My Free Quote
        </Link>
      </div>
    </aside>
  );
}
