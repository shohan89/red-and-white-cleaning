"use server"

import fs from "fs"
import nodePath from "path"
import sharp from "sharp"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { supabaseAdmin } from "@/lib/supabase"
import { auth } from "@/lib/auth"

async function requireAdmin() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
}

export async function deleteMediaAsset(id: string) {
  await requireAdmin()
  const asset = await prisma.mediaAsset.findUnique({ where: { id } })
  if (!asset) throw new Error("Asset not found")

  // Static public images: delete DB record only, no Supabase Storage to remove
  if (asset.bucket !== "static") {
    const { error } = await supabaseAdmin.storage.from(asset.bucket).remove([asset.path])
    if (error) throw new Error(`Storage delete failed: ${error.message}`)
  }

  await prisma.mediaAsset.delete({ where: { id } })
  revalidatePath("/admin/media")
}

export async function syncStaticImages() {
  await requireAdmin()

  const MIME: Record<string, string> = {
    jpg: "image/jpeg", jpeg: "image/jpeg",
    png: "image/png", webp: "image/webp",
    gif: "image/gif", svg: "image/svg+xml",
  }

  const staticImages = [
    "/images/about-header.png",
    "/images/contact-header.png",
    "/images/faq-header.png",
    "/images/hero-bg.jpeg",
    "/images/hero-bg.png",
    "/images/logo.jpg",
    "/images/portfolio-header.png",
    "/images/services-header.png",
    "/images/why-choose-us.png",
    "/images/portfolio/after-1.png",
    "/images/portfolio/before-1.png",
    "/images/portfolio/commercial-1.png",
    "/images/portfolio/ctpm-2.jpeg",
    "/images/portfolio/ctpm-3.jpeg",
    "/images/portfolio/ctpm-4.jpeg",
    "/images/portfolio/ctpm-5.jpeg",
    "/images/portfolio/ctpm-commercial.jpeg",
    "/images/portfolio/deep-clean-1.png",
    "/images/portfolio/generator-1.jpg",
    "/images/portfolio/generator-2.jpg",
    "/images/portfolio/generator-3.jpg",
    "/images/portfolio/generator-4.jpg",
    "/images/portfolio/post-construction-1.png",
    "/images/portfolio/residential-bathroom-ba.png",
    "/images/portfolio/residential-kitchen-ba.png",
    "/images/portfolio/residential-sink-ba.png",
    "/images/portfolio/tricar-guelph-area-1.jpeg",
    "/images/portfolio/tricar-guelph-area-2.jpeg",
    "/images/portfolio/tricar-guelph-area-3.jpeg",
    "/images/portfolio/tricar-guelph-common.jpeg",
    "/images/portfolio/tricar-guelph-const-1.jpeg",
    "/images/portfolio/tricar-guelph-const-2.jpeg",
    "/images/portfolio/tricar-guelph-occ-1.jpeg",
    "/images/portfolio/tricar-guelph-occ-2.jpeg",
    "/images/portfolio/tricar-guelph-occ-3.jpeg",
    "/images/portfolio/tricar-guelph-occupancy.jpeg",
    "/images/portfolio/tricar-guelph-pdi-2.jpg",
    "/images/portfolio/tricar-guelph-pdi-3.jpg",
    "/images/portfolio/tricar-guelph-pdi-4.jpeg",
    "/images/portfolio/tricar-guelph-pdi.jpg",
    "/images/portfolio/tricar-guelph-phase1-debris.jpeg",
    "/images/portfolio/tricar-guelph-phase3-staged.jpeg",
    "/images/portfolio/tricar-guelph-win-1.jpeg",
    "/images/portfolio/tricar-guelph-win-2.jpg",
    "/images/portfolio/tricar-guelph-win-3.jpg",
    "/images/portfolio/tricar-guelph-win-4.jpg",
    "/images/portfolio/tricar-sportsworld.png",
    "/images/portfolio/zehr-sylk.png",
  ]

  let synced = 0
  for (const imgPath of staticImages) {
    const fullPath = nodePath.join(process.cwd(), "public", imgPath)
    let size = 0
    try { size = fs.statSync(fullPath).size } catch {}
    const ext = imgPath.split(".").pop()?.toLowerCase() ?? ""
    const mimeType = MIME[ext] ?? "image/jpeg"
    const filename = imgPath.split("/").pop() ?? imgPath

    const existing = await prisma.mediaAsset.findFirst({ where: { url: imgPath } })
    if (!existing) {
      await prisma.mediaAsset.create({
        data: {
          url: imgPath,
          filename,
          mimeType,
          size,
          bucket: "static",
          path: imgPath,
        },
      })
      synced++
    }
  }

  revalidatePath("/admin/media")
  return { synced, total: staticImages.length }
}

export async function updateMediaAltText(id: string, altText: string) {
  await requireAdmin()
  await prisma.mediaAsset.update({ where: { id }, data: { altText } })
  revalidatePath("/admin/media")
}

export async function updateMediaSeoFields(
  id: string,
  fields: { altText?: string; title?: string; caption?: string }
) {
  await requireAdmin()
  await prisma.mediaAsset.update({ where: { id }, data: fields })
  revalidatePath("/admin/seo/images")
  revalidatePath("/admin/media")
}

export async function convertAllToWebP() {
  await requireAdmin()

  const assets = await prisma.mediaAsset.findMany({
    where: { mimeType: { not: "image/webp" } },
  })

  const processable = assets.filter(
    (a) => a.mimeType.startsWith("image/") && a.mimeType !== "image/svg+xml"
  )

  let converted = 0
  const errors: string[] = []

  for (const asset of processable) {
    try {
      let inputBuffer: Buffer

      if (asset.bucket === "static") {
        const fullPath = nodePath.join(process.cwd(), "public", asset.url)
        inputBuffer = fs.readFileSync(fullPath)
      } else {
        const { data, error } = await supabaseAdmin.storage
          .from(asset.bucket)
          .download(asset.path)
        if (error || !data) throw new Error(`Download failed: ${error?.message}`)
        inputBuffer = Buffer.from(await data.arrayBuffer())
      }

      const webpBuffer = await sharp(inputBuffer)
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toBuffer()

      const newFilename = asset.filename.replace(/\.[^.]+$/, ".webp")
      let newUrl: string
      let newPath: string

      if (asset.bucket === "static") {
        const publicDir = nodePath.join(process.cwd(), "public")
        const originalAbs = nodePath.join(publicDir, asset.url)
        const dir = nodePath.dirname(originalAbs)
        const newAbs = nodePath.join(dir, newFilename)
        fs.writeFileSync(newAbs, webpBuffer)
        newPath = "/" + nodePath.relative(publicDir, newAbs).replace(/\\/g, "/")
        newUrl = newPath
      } else {
        const newStoragePath = asset.path.replace(/\.[^.]+$/, ".webp")
        const { error: uploadError } = await supabaseAdmin.storage
          .from(asset.bucket)
          .upload(newStoragePath, webpBuffer, { contentType: "image/webp", upsert: true })
        if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`)

        if (asset.path !== newStoragePath) {
          await supabaseAdmin.storage.from(asset.bucket).remove([asset.path])
        }

        const { data: urlData } = supabaseAdmin.storage
          .from(asset.bucket)
          .getPublicUrl(newStoragePath)
        newUrl = urlData.publicUrl
        newPath = newStoragePath
      }

      await prisma.mediaAsset.update({
        where: { id: asset.id },
        data: {
          url: newUrl,
          path: newPath,
          filename: newFilename,
          mimeType: "image/webp",
          size: webpBuffer.length,
        },
      })

      converted++
    } catch (err) {
      errors.push(`${asset.filename}: ${err instanceof Error ? err.message : "Unknown error"}`)
    }
  }

  revalidatePath("/admin/media")
  return { converted, total: processable.length, errors }
}
