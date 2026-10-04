"use client"

import { useRef, useState } from "react"
import { Upload, Loader2, X, FolderOpen } from "lucide-react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MediaPickerModal } from "@/components/admin/MediaPickerModal"
import { compressImage } from "@/lib/compress-image"
import type { MediaAssetPickerItem } from "@/actions/media"

interface CoverImageFieldProps {
  defaultUrl?: string
  defaultAlt?: string
  defaultTitle?: string
  defaultCaption?: string
}

export function CoverImageField({
  defaultUrl = "",
  defaultAlt = "",
  defaultTitle = "",
  defaultCaption = "",
}: CoverImageFieldProps) {
  const [url, setUrl] = useState(defaultUrl)
  const [altText, setAltText] = useState(defaultAlt)
  const [title, setTitle] = useState(defaultTitle)
  const [caption, setCaption] = useState(defaultCaption)
  const [uploading, setUploading] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function applyAsset(asset: MediaAssetPickerItem | { url: string; altText?: string | null; title?: string | null; caption?: string | null }) {
    setUrl(asset.url)
    setAltText(asset.altText ?? "")
    setTitle(asset.title ?? "")
    setCaption(asset.caption ?? "")
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("files", await compressImage(file))
      const res = await fetch("/api/admin/media/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (data.uploaded?.[0]?.url) {
        setUrl(data.uploaded[0].url)
        setAltText("")
        setTitle("")
        setCaption("")
        toast.success("Image uploaded")
      } else {
        toast.error(data.errors?.[0] ?? "Upload failed")
      }
    } catch {
      toast.error("Upload failed")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="/images/blog/…"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 h-9 rounded-md border border-input bg-white text-sm font-medium hover:bg-gray-50 shrink-0"
          >
            <FolderOpen className="h-3.5 w-3.5" />
            Library
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-1.5 px-3 h-9 rounded-md border border-input bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50 shrink-0"
          >
            {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
            {uploading ? "Uploading…" : "Upload"}
          </button>
          {url && (
            <button
              type="button"
              onClick={() => setUrl("")}
              className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-input bg-white hover:bg-red-50 hover:text-red-500 shrink-0"
              title="Clear"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {url && (
          <div className="relative h-20 w-20 rounded-md overflow-hidden border border-border bg-gray-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="h-full w-full object-cover" />
          </div>
        )}

        <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleFile} />
        <input type="hidden" name="coverImage" value={url} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="coverImageAlt">Alt Text</Label>
          <Input
            id="coverImageAlt"
            name="coverImageAlt"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="Descriptive alt text…"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="coverImageMetaTitle">Image Title</Label>
          <Input
            id="coverImageMetaTitle"
            name="coverImageMetaTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Image title…"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="coverImageMetaCaption">Image Description</Label>
        <Textarea
          id="coverImageMetaCaption"
          name="coverImageMetaCaption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Caption / description shown in the Media Library…"
          rows={2}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Title and description are saved to this image&rsquo;s Media Library entry.
      </p>

      <MediaPickerModal open={pickerOpen} onOpenChange={setPickerOpen} onSelect={applyAsset} />
    </div>
  )
}
