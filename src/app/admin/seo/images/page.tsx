import { prisma } from "@/lib/prisma"
import { ImageSeoClient } from "./ImageSeoClient"

export const metadata = { title: "Image SEO" }

export default async function ImageSeoPage() {
  const assets = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, url: true, filename: true, mimeType: true, altText: true, title: true, caption: true },
  })

  const missing = assets.filter((a) => !a.altText).length

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-brand-dark">Image SEO</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Add alt text, titles, and captions to all media assets for better accessibility and SEO.
          </p>
        </div>
        {missing > 0 && (
          <span className="text-xs font-medium bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full">
            {missing} missing alt text
          </span>
        )}
      </div>

      <ImageSeoClient assets={assets} />
    </div>
  )
}
