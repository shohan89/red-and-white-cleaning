"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { ArrowDown, ArrowUp, ExternalLink, Loader2, Plus, Trash2 } from "lucide-react"
import {
  createServiceIncludedItem,
  createServicePageItem,
  deleteServiceIncludedItem,
  deleteServicePageItem,
  reorderServicePageItems,
  saveServicePageSection,
  saveServiceRelatedPosts,
  updateService,
  updateServiceIncludedItem,
  updateServicePageItem,
  type ServicePageItemRow,
} from "@/actions/services"
import { SERVICE_PAGE_SECTION_DEFAULTS, type ServicePageSectionKey } from "@/lib/service-page-sections"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Mode = "text" | "title" | "title-body" | "link"

interface SectionState {
  heading: string
  intro: string
  enabled: boolean
}

interface Props {
  serviceId: string
  slug: string
  name: string
  hero: { title: string; description: string }
  sections: Record<ServicePageSectionKey, SectionState>
  included: { id: string; title: string }[]
  items: Record<Exclude<ServicePageSectionKey, "included">, ServicePageItemRow[]>
  posts: { id: string; title: string }[]
  relatedPostIds: string[]
  cities: string[]
}

const META: Array<{
  key: ServicePageSectionKey
  label: string
  help: string
  mode: Mode
  required?: boolean
  showIntro?: boolean
}> = [
  { key: "included", label: "What's Included", help: "Bullet list of what the service covers.", mode: "text", showIntro: false },
  { key: "how-we-work", label: "How We Work", help: "Required. Numbered steps explaining your process.", mode: "title-body", required: true },
  { key: "industries", label: "Industries / Space Types", help: "Types of businesses or spaces this service covers.", mode: "title" },
  { key: "why-choose", label: "Why Choose This Service", help: "Reasons to pick this service.", mode: "title-body" },
  { key: "service-areas", label: "Service Areas", help: "Cities / regions served. Optional link to a local page.", mode: "link" },
  { key: "related", label: "Related Posts & Internal Links", help: "Pick blog posts and/or add internal links.", mode: "link" },
]

const card = "bg-white rounded-lg border shadow-sm"

function useAction() {
  const [pending, start] = useTransition()
  const run = (fn: () => Promise<unknown>, success?: string) =>
    start(async () => {
      try {
        await fn()
        if (success) toast.success(success)
      } catch (e) {
        console.error(e)
        toast.error("Something went wrong. Please try again.")
      }
    })
  return { pending, run }
}

// ─── Item row ──────────────────────────────────────────────────────────────

function ItemRow({
  item,
  mode,
  first,
  last,
  canMove,
  onSave,
  onDelete,
  onMove,
}: {
  item: ServicePageItemRow
  mode: Mode
  first: boolean
  last: boolean
  canMove: boolean
  onSave: (v: { title: string; body: string; url: string }) => Promise<void>
  onDelete: () => Promise<void>
  onMove: (dir: -1 | 1) => void
}) {
  const [title, setTitle] = useState(item.title)
  const [body, setBody] = useState(item.body ?? "")
  const [url, setUrl] = useState(item.url ?? "")
  const { pending, run } = useAction()
  const dirty = title !== item.title || body !== (item.body ?? "") || url !== (item.url ?? "")

  return (
    <div className="rounded-md border bg-gray-50/70 p-3">
      <div className="flex items-start gap-2">
        <div className="flex-1 space-y-2 min-w-0">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={mode === "text" ? "Item text" : "Title"} className="bg-white" />
          {mode === "title-body" && (
            <Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={2} placeholder="Description" className="bg-white" />
          )}
          {mode === "link" && (
            <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Link (optional) e.g. /services/deep-cleaning" className="bg-white" />
          )}
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          {canMove && (
            <>
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8" disabled={first} onClick={() => onMove(-1)} aria-label="Move up">
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8" disabled={last} onClick={() => onMove(1)} aria-label="Move down">
                <ArrowDown className="h-4 w-4" />
              </Button>
            </>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-700"
            aria-label="Delete"
            onClick={() => {
              if (confirm("Delete this item?")) void onDelete()
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {dirty && (
        <div className="mt-2 flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            className="bg-brand-red hover:bg-brand-red/90 text-white"
            disabled={pending || !title.trim()}
            onClick={() => run(() => onSave({ title, body, url }), "Saved")}
          >
            {pending && <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />}
            Save changes
          </Button>
          <span className="text-xs text-amber-700">Unsaved changes</span>
        </div>
      )}
    </div>
  )
}

// ─── Add form ──────────────────────────────────────────────────────────────

function AddItem({
  mode,
  placeholder,
  datalistId,
  onAdd,
}: {
  mode: Mode
  placeholder?: string
  datalistId?: string
  onAdd: (v: { title: string; body: string; url: string }) => Promise<void>
}) {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [url, setUrl] = useState("")
  const { pending, run } = useAction()

  return (
    <div className="rounded-md border border-dashed bg-white p-3 space-y-2">
      <p className="text-xs font-medium text-gray-600">Add new</p>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={placeholder ?? "Title"} list={datalistId} />
      {mode === "title-body" && <Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={2} placeholder="Description" />}
      {mode === "link" && <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Link (optional) e.g. /blog/my-post" />}
      <Button
        type="button"
        size="sm"
        variant="outline"
        disabled={pending || !title.trim()}
        onClick={() =>
          run(async () => {
            await onAdd({ title, body, url })
            setTitle("")
            setBody("")
            setUrl("")
          }, "Added")
        }
      >
        {pending ? <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> : <Plus className="h-3.5 w-3.5 mr-1.5" />}
        Add
      </Button>
    </div>
  )
}

// ─── Section card ──────────────────────────────────────────────────────────

function Section({
  index,
  meta,
  serviceId,
  initial,
  initialItems,
  cities,
  extra,
}: {
  index: number
  meta: (typeof META)[number]
  serviceId: string
  initial: SectionState
  initialItems: ServicePageItemRow[]
  cities: string[]
  extra?: React.ReactNode
}) {
  const [saved, setSaved] = useState(initial)
  const [heading, setHeading] = useState(initial.heading)
  const [intro, setIntro] = useState(initial.intro)
  const [enabled, setEnabled] = useState(initial.enabled)
  const [items, setItems] = useState(initialItems)
  const settings = useAction()
  const isIncluded = meta.key === "included"
  const dirty = heading !== saved.heading || intro !== saved.intro || enabled !== saved.enabled

  const saveSettings = () =>
    settings.run(async () => {
      await saveServicePageSection(serviceId, meta.key, { heading, intro, enabled })
      setSaved({ heading, intro, enabled })
    }, "Section settings saved")

  const move = (i: number, dir: -1 | 1) => {
    const next = [...items]
    const j = i + dir
    ;[next[i], next[j]] = [next[j], next[i]]
    setItems(next)
    reorderServicePageItems(next.map((n) => n.id)).catch(() => toast.error("Could not save order"))
  }

  const remove = async (id: string) => {
    const prev = items
    setItems(items.filter((x) => x.id !== id))
    try {
      if (isIncluded) await deleteServiceIncludedItem(id, true)
      else await deleteServicePageItem(id)
      toast.success("Deleted")
    } catch {
      setItems(prev)
      toast.error("Could not delete")
    }
  }

  return (
    <section id={meta.key} className={`${card} scroll-mt-6`}>
      <header className="flex items-center justify-between gap-3 border-b px-5 py-3">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">
            {index}. {meta.label} <span className="font-normal text-gray-500">({items.length})</span>
            {meta.required && items.length === 0 && (
              <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-800">Required</span>
            )}
          </h2>
          <p className="text-xs text-muted-foreground">{meta.help}</p>
        </div>
        <label className="flex items-center gap-2 text-xs text-gray-700 shrink-0">
          <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} className="h-4 w-4" />
          Show on page
        </label>
      </header>

      <div className="space-y-5 p-5">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Section heading (H2)</Label>
            <Input value={heading} onChange={(e) => setHeading(e.target.value)} placeholder={SERVICE_PAGE_SECTION_DEFAULTS[meta.key].heading} />
          </div>
          {meta.showIntro !== false && (
            <div className="space-y-1.5 md:col-span-2">
              <Label className="text-xs">Intro text (optional)</Label>
              <Textarea value={intro} onChange={(e) => setIntro(e.target.value)} rows={2} />
            </div>
          )}
        </div>
        {dirty && (
          <Button
            type="button"
            size="sm"
            className="bg-brand-red hover:bg-brand-red/90 text-white"
            disabled={settings.pending}
            onClick={saveSettings}
          >
            {settings.pending && <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />}
            Save section settings
          </Button>
        )}

        {extra}

        <div className="space-y-2">
          {items.map((item, i) => (
            <ItemRow
              key={item.id}
              item={item}
              mode={meta.mode}
              first={i === 0}
              last={i === items.length - 1}
              canMove={!isIncluded}
              onMove={(d) => move(i, d)}
              onDelete={() => remove(item.id)}
              onSave={async (v) => {
                const row = isIncluded
                  ? (await updateServiceIncludedItem(item.id, v.title.trim(), true), { id: item.id, title: v.title.trim(), body: null, url: null })
                  : await updateServicePageItem(item.id, { title: v.title.trim(), body: v.body.trim(), url: v.url.trim() })
                setItems((cur) => cur.map((x) => (x.id === item.id ? row : x)))
              }}
            />
          ))}
          {items.length === 0 && <p className="text-xs text-muted-foreground">No items yet.</p>}
          <AddItem
            mode={meta.mode}
            placeholder={meta.key === "service-areas" ? "e.g. Kitchener" : meta.mode === "text" ? "Add included item…" : "Title"}
            datalistId={meta.key === "service-areas" ? "city-options" : undefined}
            onAdd={async (v) => {
              const row = isIncluded
                ? await createServiceIncludedItem(serviceId, v.title.trim(), true).then((r) => ({ id: r.id, title: r.text, body: null, url: null }))
                : await createServicePageItem(serviceId, meta.key, { title: v.title.trim(), body: v.body.trim(), url: v.url.trim() })
              setItems((cur) => [...cur, row])
            }}
          />
        </div>
      </div>
      {meta.key === "service-areas" && (
        <datalist id="city-options">
          {cities.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      )}
    </section>
  )
}

// ─── Related posts picker ──────────────────────────────────────────────────

function RelatedPosts({ serviceId, posts, initial }: { serviceId: string; posts: { id: string; title: string }[]; initial: string[] }) {
  const [selected, setSelected] = useState<string[]>(initial)
  const [saved, setSaved] = useState<string[]>(initial)
  const { pending, run } = useAction()
  const dirty = selected.slice().sort().join() !== saved.slice().sort().join()

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-gray-700">Related blog posts</p>
      {posts.length === 0 ? (
        <p className="text-xs text-muted-foreground">No published posts yet.</p>
      ) : (
        <div className="max-h-52 overflow-y-auto rounded-md border bg-white p-2 space-y-1">
          {posts.map((p) => (
            <label key={p.id} className="flex items-center gap-2 rounded px-1 py-0.5 text-sm hover:bg-gray-50">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={selected.includes(p.id)}
                onChange={(e) => setSelected((cur) => (e.target.checked ? [...cur, p.id] : cur.filter((x) => x !== p.id)))}
              />
              {p.title}
            </label>
          ))}
        </div>
      )}
      {dirty && (
        <Button
          type="button"
          size="sm"
          className="bg-brand-red hover:bg-brand-red/90 text-white"
          disabled={pending}
          onClick={() =>
            run(async () => {
              await saveServiceRelatedPosts(serviceId, selected)
              setSaved(selected)
            }, "Related posts saved")
          }
        >
          {pending && <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />}
          Save related posts
        </Button>
      )}
    </div>
  )
}

// ─── Root ──────────────────────────────────────────────────────────────────

export function ServicePageEditor(props: Props) {
  const { serviceId, slug, name, hero, sections, included, items, posts, relatedPostIds, cities } = props
  const [title, setTitle] = useState(hero.title)
  const [description, setDescription] = useState(hero.description)
  const [savedHero, setSavedHero] = useState(hero)
  const heroAction = useAction()
  const heroDirty = title !== savedHero.title || description !== savedHero.description

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/admin/service-pages" className="text-xs text-muted-foreground hover:text-brand-red">
            ← Service Pages
          </Link>
          <h1 className="text-xl font-heading font-bold text-brand-dark">{name}</h1>
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
              View page
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[200px_minmax(0,1fr)]">
        <nav className="hidden lg:block">
          <ul className="sticky top-6 space-y-1 text-sm">
            <li>
              <a href="#hero" className="block rounded px-2 py-1 text-gray-600 hover:bg-gray-100 hover:text-brand-red">1–2. Hero &amp; Intro</a>
            </li>
            {META.map((m, i) => (
              <li key={m.key}>
                <a href={`#${m.key}`} className="block rounded px-2 py-1 text-gray-600 hover:bg-gray-100 hover:text-brand-red">
                  {i + 3}. {m.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-6 min-w-0">
          <section id="hero" className={`${card} scroll-mt-6`}>
            <header className="border-b px-5 py-3">
              <h2 className="text-sm font-semibold text-gray-900">1–2. Hero Title &amp; Intro Paragraph</h2>
              <p className="text-xs text-muted-foreground">The title is the page&apos;s only H1. Blank line in the intro = new paragraph.</p>
            </header>
            <div className="space-y-4 p-5">
              <div className="space-y-1.5">
                <Label className="text-xs">Hero title (H1)</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Intro paragraph</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={6} />
              </div>
              {heroDirty && (
                <Button
                  type="button"
                  size="sm"
                  className="bg-brand-red hover:bg-brand-red/90 text-white"
                  disabled={heroAction.pending || !title.trim() || !description.trim()}
                  onClick={() =>
                    heroAction.run(async () => {
                      await updateService(serviceId, { title: title.trim(), description: description.trim() }, true)
                      setSavedHero({ title, description })
                    }, "Hero & intro saved")
                  }
                >
                  {heroAction.pending && <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />}
                  Save hero &amp; intro
                </Button>
              )}
            </div>
          </section>

          {META.map((m, i) => (
            <Section
              key={m.key}
              index={i + 3}
              meta={m}
              serviceId={serviceId}
              initial={sections[m.key]}
              initialItems={
                m.key === "included"
                  ? included.map((x) => ({ id: x.id, title: x.title, body: null, url: null }))
                  : items[m.key as Exclude<ServicePageSectionKey, "included">]
              }
              cities={cities}
              extra={m.key === "related" ? <RelatedPosts serviceId={serviceId} posts={posts} initial={relatedPostIds} /> : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
