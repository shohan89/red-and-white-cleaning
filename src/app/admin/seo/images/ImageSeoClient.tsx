"use client"

import { useState } from "react"
import { updateMediaSeoFields } from "@/actions/media"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ImageIcon, Loader2 } from "lucide-react"

interface Asset {
  id: string
  url: string
  filename: string
  mimeType: string
  altText: string | null
  title: string | null
  caption: string | null
}

export function ImageSeoClient({ assets }: { assets: Asset[] }) {
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)
  const [values, setValues] = useState<
    Record<string, { altText: string; title: string; caption: string }>
  >(
    Object.fromEntries(
      assets.map((a) => [
        a.id,
        { altText: a.altText ?? "", title: a.title ?? "", caption: a.caption ?? "" },
      ])
    )
  )

  async function handleSave(id: string) {
    setSaving(id)
    try {
      await updateMediaSeoFields(id, values[id])
      setSaved(id)
      setTimeout(() => setSaved(null), 2000)
    } finally {
      setSaving(null)
    }
  }

  function update(id: string, field: "altText" | "title" | "caption", value: string) {
    setValues((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }))
  }

  if (assets.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-lg border">
        <ImageIcon className="h-10 w-10 text-gray-300 mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">No media assets yet. Upload files in the Media Library.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {assets.map((asset) => {
        const isImage = asset.mimeType.startsWith("image/")
        const v = values[asset.id]
        const isSaving = saving === asset.id
        const isSaved = saved === asset.id
        return (
          <div key={asset.id} className="bg-white rounded-lg border p-4 flex gap-4 items-start">
            {/* Thumbnail */}
            <div className="w-20 h-20 shrink-0 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
              {isImage ? (
                <Image src={asset.url} alt={asset.altText ?? asset.filename} width={80} height={80} className="object-cover w-full h-full" />
              ) : (
                <ImageIcon className="h-6 w-6 text-gray-400" />
              )}
            </div>

            {/* Fields */}
            <div className="flex-1 min-w-0 space-y-2">
              <p className="text-xs font-medium text-gray-500 truncate">{asset.filename}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">Alt Text</label>
                  <Input
                    value={v.altText}
                    onChange={(e) => update(asset.id, "altText", e.target.value)}
                    placeholder="Describe this image…"
                    className="h-8 text-xs mt-0.5"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">Title</label>
                  <Input
                    value={v.title}
                    onChange={(e) => update(asset.id, "title", e.target.value)}
                    placeholder="Image title…"
                    className="h-8 text-xs mt-0.5"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">Caption</label>
                  <Input
                    value={v.caption}
                    onChange={(e) => update(asset.id, "caption", e.target.value)}
                    placeholder="Caption…"
                    className="h-8 text-xs mt-0.5"
                  />
                </div>
              </div>
            </div>

            {/* Save button */}
            <div className="shrink-0 pt-5">
              {isSaved ? (
                <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                  <CheckCircle2 className="h-4 w-4" /> Saved
                </span>
              ) : (
                <Button
                  size="sm"
                  onClick={() => handleSave(asset.id)}
                  disabled={isSaving}
                  className="bg-brand-red hover:bg-brand-red/90 text-white h-8 text-xs"
                >
                  {isSaving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Save"}
                </Button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
