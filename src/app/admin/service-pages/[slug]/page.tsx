import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { SERVICE_PAGE_SECTION_KEYS, resolveSection, type ServicePageSectionKey } from "@/lib/service-page-sections"
import { ServicePageEditor } from "@/components/admin/services/ServicePageEditor"
import type { ServicePageItemRow } from "@/actions/services"

export const metadata = { title: "Edit Service Page" }

type Row = Record<string, unknown>

export default async function ServicePageEditorRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const [service, posts, cities] = await Promise.all([
    prisma.service.findUnique({
      where: { slug },
      include: {
        includedItems: { orderBy: { sortOrder: "asc" } },
        pageSections: true,
        pageItems: { orderBy: [{ sortOrder: "asc" }, { id: "asc" }] },
      },
    }),
    prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      select: { id: true, title: true },
    }),
    prisma.serviceCity.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" }, select: { id: true, name: true } }),
  ])
  if (!service) notFound()

  const pageSections = (service.pageSections as Row[]) as unknown as Parameters<typeof resolveSection>[0]
  const pageItems = service.pageItems as Row[]

  const sections = {} as Record<ServicePageSectionKey, { heading: string; intro: string; enabled: boolean }>
  const items = {} as Record<Exclude<ServicePageSectionKey, "included">, ServicePageItemRow[]>
  for (const key of SERVICE_PAGE_SECTION_KEYS) {
    sections[key] = resolveSection(pageSections, key)
    if (key !== "included") {
      items[key] = pageItems
        .filter((i) => i.sectionKey === key)
        .map((i) => ({
          id: i.id as string,
          title: i.title as string,
          body: (i.body as string | null) ?? null,
          url: (i.url as string | null) ?? null,
        }))
    }
  }

  return (
    <ServicePageEditor
      serviceId={service.id as string}
      slug={service.slug as string}
      name={service.name as string}
      hero={{ title: service.title as string, description: service.description as string }}
      sections={sections}
      included={(service.includedItems as Row[]).map((i) => ({ id: i.id as string, title: i.text as string }))}
      items={items}
      posts={(posts as Row[]).map((p) => ({ id: p.id as string, title: p.title as string }))}
      relatedPostIds={(service.relatedPostIds as string[] | null) ?? []}
      cities={(cities as Row[]).map((c) => c.name as string)}
    />
  )
}
