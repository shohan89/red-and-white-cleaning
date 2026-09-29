"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Loader2, Search, Upload, FileImage } from "lucide-react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { listMediaAssets, type MediaAssetPickerItem } from "@/actions/media"

interface MediaPickerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (asset: MediaAssetPickerItem) => void
}

export function MediaPickerModal({ open, onOpenChange, onSelect }: MediaPickerModalProps) {
  const [assets, setAssets] = useState<MediaAssetPickerItem[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [query, setQuery] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    setLoading(true)
    listMediaAssets(query || undefined)
      .then((data) => setAssets(data.filter((a) => a.mimeType.startsWith("image/"))))
      .catch(() => toast.error("Failed to load media library"))
      .finally(() => setLoading(false))
  }, [open, query])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("files", file)
      const res = await fetch("/api/admin/media/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (data.uploaded?.[0]) {
        toast.success("Image uploaded")
        onSelect(data.uploaded[0] as MediaAssetPickerItem)
        onOpenChange(false)
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Media Library</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by filename…"
              className="pl-8"
            />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg border border-input bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50 shrink-0"
          >
            {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
            {uploading ? "Uploading…" : "Upload New"}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto min-h-[300px]">
          {loading ? (
            <div className="flex items-center justify-center h-full py-16">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : assets.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center text-muted-foreground">
              <FileImage className="h-8 w-8 mb-2 text-gray-300" />
              <p className="text-sm">No images found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {assets.map((asset) => (
                <button
                  key={asset.id}
                  type="button"
                  onClick={() => {
                    onSelect(asset)
                    onOpenChange(false)
                  }}
                  className="group relative aspect-square rounded-lg border border-border overflow-hidden bg-gray-50 hover:border-brand-red/50 hover:ring-2 hover:ring-brand-red/30 transition-all"
                  title={asset.title || asset.filename}
                >
                  <Image
                    src={asset.url}
                    alt={asset.altText ?? asset.filename}
                    fill
                    sizes="150px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
