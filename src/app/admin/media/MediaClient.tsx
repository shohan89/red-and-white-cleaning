"use client"

import { useRef, useTransition, useState } from "react"
import { useRouter } from "next/navigation"
import { deleteMediaAsset, syncStaticImages, convertAllToWebP } from "@/actions/media"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Loader2, Copy, Check, Upload, RefreshCw, Wand2 } from "lucide-react"
import { toast } from "sonner"

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

export function CopyUrlButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
      title="Copy URL"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-600" />
      ) : (
        <Copy className="h-3.5 w-3.5 text-gray-500" />
      )}
    </button>
  )
}

export function DeleteMediaButton({ id, filename }: { id: string; filename: string }) {
  const [pending, startTransition] = useTransition()
  return (
    <button
      disabled={pending}
      onClick={() => {
        if (!confirm(`Delete "${filename}"?`)) return
        startTransition(() => deleteMediaAsset(id))
      }}
      className="p-1.5 rounded-md hover:bg-red-50 transition-colors text-red-500 disabled:opacity-50"
      title="Delete"
    >
      {pending ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Trash2 className="h-3.5 w-3.5" />
      )}
    </button>
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
