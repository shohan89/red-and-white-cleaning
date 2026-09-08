"use client"

import { useRef, useTransition, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { deleteMediaAsset, syncStaticImages, convertAllToWebP, updateMediaSeoFields } from "@/actions/media"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Loader2, Copy, Check, Upload, RefreshCw, Wand2, X, FileText } from "lucide-react"
import { toast } from "sonner"

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function UploadButton() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const router = useRouter()

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || !files.length) return
    setUploading(true)
    const formData = new FormData()
    for (const f of Array.from(files)) formData.append("files", f)

    try {
      const res = await fetch("/api/admin/media/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (data.uploaded?.length) {
        toast.success(`${data.uploaded.length} file${data.uploaded.length > 1 ? "s" : ""} uploaded`)
        router.refresh()
      }
      if (data.errors?.length) {
        toast.error(data.errors.join(", "))
      }
    } catch {
      toast.error("Upload failed")
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,application/pdf"
        className="hidden"
        onChange={handleFiles}
      />
      <Button
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="bg-brand-red hover:bg-brand-red/90 text-white"
      >
        {uploading ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Upload className="h-4 w-4 mr-2" />
        )}
        {uploading ? "Uploading…" : "Upload Files"}
      </Button>
    </>
  )
}

export function SyncStaticImagesButton() {
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  function handleSync() {
    startTransition(async () => {
      try {
        const result = await syncStaticImages()
        toast.success(`Synced ${result.synced} new image${result.synced !== 1 ? "s" : ""} (${result.total} total checked)`)
        router.refresh()
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Sync failed")
      }
    })
  }

  return (
    <Button variant="outline" onClick={handleSync} disabled={pending}>
      {pending ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <RefreshCw className="h-4 w-4 mr-2" />
      )}
      {pending ? "Syncing…" : "Sync Static Images"}
    </Button>
  )
}

export function ConvertToWebPButton() {
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  function handleConvert() {
    if (!confirm("Convert all non-WebP images to WebP? This will re-process and replace existing image files.")) return
    startTransition(async () => {
      try {
        const result = await convertAllToWebP()
        if (result.errors.length) {
          toast.error(`${result.converted}/${result.total} converted. Errors: ${result.errors.slice(0, 2).join("; ")}`)
        } else {
          toast.success(`Converted ${result.converted} image${result.converted !== 1 ? "s" : ""} to WebP`)
        }
        router.refresh()
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Conversion failed")
      }
    })
  }

  return (
    <Button variant="outline" onClick={handleConvert} disabled={pending}>
      {pending ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <Wand2 className="h-4 w-4 mr-2" />
      )}
      {pending ? "Converting…" : "Convert to WebP"}
    </Button>
  )
}

export function MediaSearch({ defaultValue }: { defaultValue?: string }) {
  const router = useRouter()
  return (
    <Input
      defaultValue={defaultValue}
      placeholder="Search by filename…"
      className="max-w-xs"
      onChange={(e) => {
        const q = e.target.value.trim()
        const url = q ? `/admin/media?q=${encodeURIComponent(q)}` : "/admin/media"
        router.push(url)
      }}
    />
  )
}

interface MediaAssetLite {
  id: string
  url: string
  filename: string
  mimeType: string
  altText: string | null
  title: string | null
  caption: string | null
  size: number
}

export function MediaLibraryGrid({ assets }: { assets: MediaAssetLite[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = assets.find((a) => a.id === selectedId) ?? null

  useEffect(() => {
    if (!selectedId) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedId(null)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [selectedId])

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {assets.map((asset) => {
          const isImage = asset.mimeType.startsWith("image/")
          return (
            <button
              key={asset.id}
              type="button"
              onClick={() => setSelectedId(asset.id)}
              className="group relative flex flex-col rounded-xl border bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-brand-red/40 transition-all text-left"
            >
              <div className="relative aspect-square bg-gray-50">
                {isImage ? (
                  <Image
                    src={asset.url}
                    alt={asset.altText ?? asset.filename}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <FileText className="h-8 w-8 text-gray-300" />
                  </div>
                )}
              </div>
              <div className="p-2.5">
                <p className="text-xs font-medium text-gray-700 truncate" title={asset.filename}>
                  {asset.filename}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{formatBytes(asset.size)}</p>
              </div>
            </button>
          )
        })}
      </div>

      {selected && <MediaDetailPanel key={selected.id} asset={selected} onClose={() => setSelectedId(null)} />}
    </>
  )
}

function MediaDetailPanel({ asset, onClose }: { asset: MediaAssetLite; onClose: () => void }) {
  const router = useRouter()
  const [values, setValues] = useState({
    altText: asset.altText ?? "",
    title: asset.title ?? "",
    caption: asset.caption ?? "",
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const [deleting, startDelete] = useTransition()
  const isImage = asset.mimeType.startsWith("image/")

  function update(field: "altText" | "title" | "caption", value: string) {
    setSaved(false)
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSave() {
    setSaving(true)
    try {
      await updateMediaSeoFields(asset.id, values)
      setSaved(true)
      toast.success("Image SEO saved")
    } catch {
      toast.error("Failed to save")
    } finally {
      setSaving(false)
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(asset.url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDelete() {
    if (!confirm(`Delete "${asset.filename}"?`)) return
    startDelete(async () => {
      await deleteMediaAsset(asset.id)
      onClose()
      router.refresh()
    })
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-4 h-14 border-b shrink-0">
          <h2 className="text-sm font-semibold text-gray-900">Image Details</h2>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-gray-100" title="Close">
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-50 border">
            {isImage ? (
              <Image src={asset.url} alt={values.altText || asset.filename} fill className="object-contain" sizes="384px" />
            ) : (
              <div className="flex items-center justify-center h-full">
                <FileText className="h-10 w-10 text-gray-300" />
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-900 break-all">{asset.filename}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{formatBytes(asset.size)}</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy} className="flex-1">
              {copied ? <Check className="h-3.5 w-3.5 mr-1.5 text-green-600" /> : <Copy className="h-3.5 w-3.5 mr-1.5" />}
              {copied ? "Copied" : "Copy URL"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleDelete} disabled={deleting} className="flex-1 text-destructive hover:text-destructive">
              {deleting ? <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5 mr-1.5" />}
              Delete
            </Button>
          </div>

          {isImage && (
            <div className="space-y-3 pt-4 border-t">
              <p className="text-xs font-semibold text-gray-900 uppercase tracking-wide">Image SEO</p>
              <div className="space-y-1.5">
                <Label className="text-xs">Alt Text</Label>
                <Input
                  value={values.altText}
                  onChange={(e) => update("altText", e.target.value)}
                  placeholder="Describe this image…"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Title</Label>
                <Input
                  value={values.title}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="Image title…"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Caption</Label>
                <Textarea
                  value={values.caption}
                  onChange={(e) => update("caption", e.target.value)}
                  placeholder="Caption…"
                  rows={2}
                />
              </div>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-brand-red hover:bg-brand-red/90 text-white"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                ) : saved ? (
                  <Check className="h-4 w-4 mr-1.5" />
                ) : null}
                {saved ? "Saved" : "Save SEO"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
