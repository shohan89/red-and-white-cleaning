import { prisma } from "@/lib/prisma"
import { FileImage } from "lucide-react"
import { UploadButton, MediaSearch, SyncStaticImagesButton, ConvertToWebPButton, MediaLibraryGrid } from "./MediaClient"

export const metadata = { title: "Media Library" }

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default async function MediaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams

  let assets: Array<{ id: string; url: string; filename: string; mimeType: string; altText: string | null; title: string | null; caption: string | null; size: number; createdAt: Date }> = []
  try {
    assets = await prisma.mediaAsset.findMany({
      where: q
        ? { filename: { contains: q, mode: "insensitive" } }
        : undefined,
      orderBy: { createdAt: "desc" },
      take: 200,
    })
  } catch (err) {
    console.error("[admin/media] DB error:", err)
  }

  const totalSize = assets.reduce((sum, a) => sum + a.size, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-heading font-bold text-brand-dark">Media Library</h1>
          <p className="text-sm text-muted-foreground">
            {assets.length} files · {formatBytes(totalSize)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <MediaSearch defaultValue={q} />
          <SyncStaticImagesButton />
          <ConvertToWebPButton />
          <UploadButton />
        </div>
      </div>

      {assets.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-gray-200 py-20 text-center">
          <FileImage className="h-10 w-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            {q ? `No files matching "${q}"` : "No files uploaded yet. Click Upload Files to get started."}
          </p>
        </div>
      ) : (
        <MediaLibraryGrid assets={assets} />
      )}

      <p className="text-xs text-muted-foreground text-center">
        Files are stored in Supabase Storage. Make sure the &quot;media&quot; bucket exists and is set to public.
      </p>
    </div>
  )
}
