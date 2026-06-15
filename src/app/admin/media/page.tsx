import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { FileImage, FileText } from "lucide-react"
import { UploadButton, CopyUrlButton, DeleteMediaButton, MediaSearch, SyncStaticImagesButton, ConvertToWebPButton } from "./MediaClient"

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

  const assets = await prisma.mediaAsset.findMany({
    where: q
      ? { filename: { contains: q, mode: "insensitive" } }
      : undefined,
    orderBy: { createdAt: "desc" },
    take: 200,
  })

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {assets.map((asset) => {
            const isImage = asset.mimeType.startsWith("image/")
            return (
              <div
                key={asset.id}
                className="group rounded-xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Thumbnail */}
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

                {/* Info + Actions */}
                <div className="p-2.5">
                  <p
                    className="text-xs font-medium text-gray-700 truncate"
                    title={asset.filename}
                  >
                    {asset.filename}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatBytes(asset.size)}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <CopyUrlButton url={asset.url} />
                    <DeleteMediaButton id={asset.id} filename={asset.filename} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center">
        Files are stored in Supabase Storage. Make sure the &quot;media&quot; bucket exists and is set to public.
      </p>
    </div>
  )
}
