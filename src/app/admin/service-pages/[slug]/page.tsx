import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import {
  saveServicePageSection,
  createServicePageItem,
  updateServicePageItem,
  saveServiceRelatedPosts,
  createServiceIncludedItem,
  updateServiceIncludedItem,
  updateService,
} from "@/actions/services"
import { SERVICE_PAGE_SECTION_DEFAULTS, resolveSection, type ServicePageSectionKey } from "@/lib/service-page-sections"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/admin/SubmitButton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SaveStatus } from "@/components/admin/SaveStatus"
import { ServicePageItemButtons } from "@/components/admin/services/ServicePageItemButtons"
import { DeleteIncludedItemButton } from "../../services/ServicesClient"
import { ChevronLeft, ExternalLink } from "lucide-react"

export const metadata = { title: "Service Page Content" }

type ItemMode = "title" | "title-body" | "link"

const SECTION_META: Record<
  Exclude<ServicePageSectionKey, "included">,
  { label: string; help: string; mode: ItemMode; required?: boolean }
> = {
  "how-we-work": {
    label: "How We Work",
    help: "Required. Numbered steps explaining your process (title + description).",
    mode: "title-body",
    required: true,
  },
  industries: {
    label: "Industries / Space Types",
    help: "Types of businesses or spaces this service covers (one per item).",
    mode: "title",
  },
  "why-choose": {
    label: "Why Choose This Service",
    help: "Reasons to pick this service (title + short description).",
    mode: "title-body",
  },
  "service-areas": {
    label: "Service Areas",
    help: "Cities / regions served. Add each area as an item; optional link to a local page.",
    mode: "link",
  },
  related: {
    label: "Related Blog Posts & Internal Links",
    help: "Pick blog posts below and/or add internal links (title + URL).",
    mode: "link",
  },
}

export default async function ServiceContentEditorPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ saved?: string }>
}) {
  const { slug } = await params
  const { saved } = await searchParams

  const service = await prisma.service.findUnique({
    where: { slug },
    include: {
      includedItems: { orderBy: { sortOrder: "asc" } },
      pageSections: true,
      pageItems: { orderBy: [{ sortOrder: "asc" }, { id: "asc" }] },
    },
  })
  if (!service) notFound()

  const [posts, cities] = await Promise.all([
    prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      select: { id: true, title: true },
    }),
    prisma.serviceCity.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" }, select: { id: true, name: true } }),
  ])

  const serviceId = service.id
  const back = `/admin/service-pages/${slug}`

  async function handleHero(formData: FormData) {
    "use server"
    const title = (formData.get("title") as string)?.trim()
    const description = (formData.get("description") as string)?.trim()
    if (!title || !description) return
    await updateService(serviceId, { title, description })
    redirect(`${back}?saved=hero`)
  }

  async function handleSection(formData: FormData) {
    "use server"
    const key = formData.get("key") as string
    await saveServicePageSection(serviceId, key, {
      heading: formData.get("heading") as string,
      intro: formData.get("intro") as string,
      enabled: formData.get("enabled") === "on",
    })
    redirect(`${back}?saved=${key}`)
  }

  async function handleAddItem(formData: FormData) {
    "use server"
    const key = formData.get("key") as string
    const title = (formData.get("title") as string)?.trim()
    if (!title) return
    await createServicePageItem(serviceId, key, {
      title,
      body: (formData.get("body") as string)?.trim(),
      url: (formData.get("url") as string)?.trim(),
    })
  }

  async function handleUpdateItem(formData: FormData) {
    "use server"
    const id = formData.get("itemId") as string
    const title = (formData.get("title") as string)?.trim()
    if (!id || !title) return
    await updateServicePageItem(id, {
      title,
      body: (formData.get("body") as string)?.trim(),
      url: (formData.get("url") as string)?.trim(),
    })
  }

  async function handleAddIncluded(formData: FormData) {
    "use server"
    const text = (formData.get("text") as string)?.trim()
    if (!text) return
    await createServiceIncludedItem(serviceId, text)
  }

  async function handleUpdateIncluded(formData: FormData) {
    "use server"
    const id = formData.get("itemId") as string
    const text = (formData.get("text") as string)?.trim()
    if (!id || !text) return
    await updateServiceIncludedItem(id, text)
  }

  async function handleRelatedPosts(formData: FormData) {
    "use server"
    await saveServiceRelatedPosts(serviceId, formData.getAll("postIds") as string[])
    redirect(`${back}?saved=related-posts`)
  }

  function SectionSettings({ k, showIntro = true }: { k: ServicePageSectionKey; showIntro?: boolean }) {
    const s = resolveSection(service!.pageSections, k)
    return (
      <form action={handleSection} className="space-y-3">
        <input type="hidden" name="key" value={k} />
        <div className="space-y-1.5">
          <Label className="text-xs">Section Heading (H2)</Label>
          <Input name="heading" defaultValue={s.heading} placeholder={SERVICE_PAGE_SECTION_DEFAULTS[k].heading} />
        </div>
        {showIntro && (
          <div className="space-y-1.5">
            <Label className="text-xs">Intro text (optional)</Label>
            <Textarea name="intro" rows={2} defaultValue={s.intro} />
          </div>
        )}
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="enabled" defaultChecked={s.enabled} className="h-4 w-4" />
          Show this section on the page
        </label>
        <SubmitButton className="bg-brand-red hover:bg-brand-red/90 text-white">Save Section Settings</SubmitButton>
      </form>
    )
  }

  const itemsFor = (key: string) => service.pageItems.filter((i) => i.sectionKey === key)

  return (
    <div className="space-y-8">
      <SaveStatus saved={saved} />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/service-pages">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Service Pages
            </Link>
          </Button>
          <h1 className="text-xl font-heading font-bold text-brand-dark">{service.name} — Page Content</h1>
        </div>
        <div className="flex gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/services/${slug}`}>Photos, Phases &amp; SEO</Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/faqs">FAQs</Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/services/${slug}`} target="_blank">
            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
            View Page
          </Link>
        </Button>
        </div>
      </div>

      <section className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 border-b pb-2">1–2. Hero Title &amp; Intro Paragraph</h2>
        <form action={handleHero} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="title">Hero Title (H1)</Label>
            <Input id="title" name="title" defaultValue={service.title} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="description">Intro Paragraph (blank line = new paragraph)</Label>
            <Textarea id="description" name="description" rows={6} defaultValue={service.description} required />
          </div>
          <SubmitButton className="bg-brand-red hover:bg-brand-red/90 text-white">Save Hero &amp; Intro</SubmitButton>
        </form>
      </section>

      <section className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 border-b pb-2">3. What&apos;s Included ({service.includedItems.length})</h2>
        <SectionSettings k="included" showIntro={false} />
        <div className="border-t pt-4 space-y-2">
          {service.includedItems.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <form action={handleUpdateIncluded} className="flex-1 flex gap-2">
                <input type="hidden" name="itemId" value={item.id} />
                <Input name="text" defaultValue={item.text} className="flex-1 text-sm" />
                <Button type="submit" variant="outline" size="sm">Save</Button>
              </form>
              <DeleteIncludedItemButton id={item.id} />
            </div>
          ))}
          <form action={handleAddIncluded} className="flex gap-2 pt-2">
            <Input name="text" placeholder="Add included item…" className="flex-1" />
            <Button type="submit" variant="outline" size="sm">Add</Button>
          </form>
        </div>
      </section>

      {(Object.keys(SECTION_META) as Array<keyof typeof SECTION_META>).map((key, idx) => {
        const meta = SECTION_META[key]
        const items = itemsFor(key)
        return (
          <section key={key} className="bg-white rounded-lg border p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-900 border-b pb-2">
              {idx + 4}. {meta.label} ({items.length})
              {meta.required && items.length === 0 && (
                <span className="ml-2 text-xs font-normal text-amber-700">Required — add at least one step</span>
              )}
            </h2>
            <p className="text-xs text-muted-foreground -mt-2">{meta.help}</p>
            <SectionSettings k={key} />

            {key === "related" && (
              <form action={handleRelatedPosts} className="border-t pt-4 space-y-2">
                <p className="text-xs font-medium text-gray-600">Related Blog Posts</p>
                {posts.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No published posts yet.</p>
                ) : (
                  <div className="max-h-56 overflow-y-auto rounded border p-2 space-y-1">
                    {posts.map((p) => (
                      <label key={p.id} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" name="postIds" value={p.id} defaultChecked={service.relatedPostIds.includes(p.id)} className="h-4 w-4" />
                        {p.title}
                      </label>
                    ))}
                  </div>
                )}
                <SubmitButton className="bg-brand-red hover:bg-brand-red/90 text-white">Save Related Posts</SubmitButton>
              </form>
            )}

            <div className="border-t pt-4 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-2 p-3 rounded-lg border bg-gray-50">
                  <form action={handleUpdateItem} className="flex-1 space-y-2">
                    <input type="hidden" name="itemId" value={item.id} />
                    <Input name="title" defaultValue={item.title} className="text-sm" placeholder="Title" />
                    {meta.mode === "title-body" && (
                      <Textarea name="body" rows={2} defaultValue={item.body ?? ""} className="text-sm" placeholder="Description" />
                    )}
                    {meta.mode === "link" && (
                      <Input name="url" defaultValue={item.url ?? ""} className="text-sm" placeholder="Link (optional) e.g. /services/deep-cleaning" />
                    )}
                    <Button type="submit" variant="outline" size="sm">Save</Button>
                  </form>
                  <ServicePageItemButtons id={item.id} />
                </div>
              ))}

              <form action={handleAddItem} className="space-y-2">
                <input type="hidden" name="key" value={key} />
                <p className="text-xs font-medium text-gray-600">Add Item</p>
                <Input
                  name="title"
                  placeholder={key === "service-areas" ? "e.g. Kitchener" : "Title…"}
                  className="text-sm"
                  list={key === "service-areas" ? "city-options" : undefined}
                />
                {meta.mode === "title-body" && <Textarea name="body" rows={2} className="text-sm" placeholder="Description…" />}
                {meta.mode === "link" && <Input name="url" className="text-sm" placeholder="Link (optional) e.g. /blog/my-post" />}
                <Button type="submit" variant="outline" size="sm">Add</Button>
              </form>
            </div>
          </section>
        )
      })}

      <datalist id="city-options">
        {cities.map((c) => (
          <option key={c.id} value={c.name} />
        ))}
      </datalist>
    </div>
  )
}
