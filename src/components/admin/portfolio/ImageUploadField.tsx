"use client"

import { useRef, useState } from "react"
import { Upload, Loader2, X } from "lucide-react"
import { toast } from "sonner"

interface Props {
  fieldName: string
  defaultValue?: string
  placeholder?: string
}

export function ImageUploadField({ fieldName, defaultValue = "", placeholder = "/images/..." }: Props) {
  const [url, setUrl] = useState(defaultValue)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("files", file)
      const res = await fetch("/api/admin/media/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (data.uploaded?.[0]?.url) {
        setUrl(data.uploaded[0].url)
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
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={placeholder}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-1.5 px-3 h-9 rounded-md border border-input bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50 shrink-0"
        >
          {uploading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Upload className="h-3.5 w-3.5" />
          )}
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

      <input type="hidden" name={fieldName} value={url} />
      <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  )
}
