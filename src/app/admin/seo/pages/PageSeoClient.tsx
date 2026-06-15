"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { savePageSeo } from "@/actions/seo"
import { ChevronDown, ChevronUp, Search } from "lucide-react"

type PageSeoRecord = {
  pageKey: string
  metaTitle?: string | null
  metaDesc?: string | null
  focusKeyword?: string | null
  canonicalUrl?: string | null
  robots?: string | null
  ogTitle?: string | null
  ogDesc?: string | null
  ogImage?: string | null
}

function SerpPreview({ title, desc, url }: { title: string; desc: string; url: string }) {
  return (
    <div className="bg-white rounded-lg border p-4 space-y-1">
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
        <Search className="h-3 w-3" />
        <span>Google Search Preview</span>
      </div>
      <p className="text-xs text-green-700 truncate">{url || "https://redandwhitecleaning.ca"}</p>
      <p className="text-lg text-blue-700 hover:underline cursor-pointer truncate leading-tight">
        {title || "Page Title"}
      </p>
      <p className="text-sm text-gray-600 line-clamp-2">{desc || "Meta description will appear here…"}</p>
    </div>
  )
}

export function PageSeoEditor({
  page,
  seo,
  baseUrl,
}: {
  page: { key: string; label: string; path: string }
  seo?: PageSeoRecord | null
  baseUrl: string
}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(seo?.metaTitle ?? "")
  const [desc, setDesc] = useState(seo?.metaDesc ?? "")

  async function handleSave(formData: FormData) {
    await savePageSeo(page.key, {
      metaTitle: formData.get("metaTitle") as string,
      metaDesc: formData.get("metaDesc") as string,
      focusKeyword: formData.get("focusKeyword") as string,
      canonicalUrl: formData.get("canonicalUrl") as string,
      robots: formData.get("robots") as string,
      ogTitle: formData.get("ogTitle") as string,
      ogDesc: formData.get("ogDesc") as string,
      ogImage: formData.get("ogImage") as string,
    })
  }

  return (
    <div className="border rounded-lg bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-900">{page.label}</span>
          <span className="text-xs text-muted-foreground font-mono">{page.path}</span>
          {seo?.metaTitle && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">SEO set</span>
          )}
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
      </button>

      {open && (
        <div className="border-t px-4 py-4 space-y-4">
          <SerpPreview title={title} desc={desc} url={`${baseUrl}${page.path}`} />

          <form action={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Meta Title</Label>
                <Input
                  name="metaTitle"
                  defaultValue={seo?.metaTitle ?? ""}
                  placeholder="Page title for Google…"
                  className="text-sm"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">{title.length}/60 chars</p>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Focus Keyword</Label>
                <Input name="focusKeyword" defaultValue={seo?.focusKeyword ?? ""} placeholder="post-construction cleaning KW" className="text-sm" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Meta Description</Label>
              <Textarea
                name="metaDesc"
                rows={2}
                defaultValue={seo?.metaDesc ?? ""}
                placeholder="Description shown in Google search results…"
                className="text-sm"
                onChange={(e) => setDesc(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">{desc.length}/160 chars</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Canonical URL</Label>
                <Input name="canonicalUrl" defaultValue={seo?.canonicalUrl ?? ""} className="text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Robots</Label>
                <Input name="robots" defaultValue={seo?.robots ?? "index, follow"} className="text-sm" />
              </div>
            </div>

            <div className="border-t pt-4 grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">OG Title</Label>
                <Input name="ogTitle" defaultValue={seo?.ogTitle ?? ""} className="text-sm" placeholder="Same as meta title if blank" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">OG Image URL</Label>
                <Input name="ogImage" defaultValue={seo?.ogImage ?? ""} className="text-sm" placeholder="/images/og-page.jpg" />
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label className="text-xs">OG Description</Label>
                <Textarea name="ogDesc" rows={2} defaultValue={seo?.ogDesc ?? ""} className="text-sm" placeholder="Same as meta description if blank" />
              </div>
            </div>

            <Button type="submit" size="sm" className="bg-brand-red hover:bg-brand-red/90 text-white">
              Save {page.label} SEO
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}
