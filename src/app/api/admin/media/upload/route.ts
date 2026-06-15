import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { supabaseAdmin } from "@/lib/supabase"
import { prisma } from "@/lib/prisma"
import sharp from "sharp"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await req.formData()
  const files = formData.getAll("files") as File[]

  if (!files.length) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 })
  }

  const uploaded: object[] = []
  const errors: string[] = []

  for (const file of files) {
    try {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      let finalBuffer = buffer
      let finalMimeType = file.type
      let finalName = file.name

      const isConvertible = file.type.startsWith("image/") && file.type !== "image/svg+xml"
      if (isConvertible) {
        finalBuffer = await sharp(buffer)
          .resize({ width: 1920, withoutEnlargement: true })
          .webp({ quality: 85 })
          .toBuffer()
        finalMimeType = "image/webp"
        finalName = file.name.replace(/\.[^.]+$/, ".webp")
      }

      const timestamp = Date.now()
      const safeName = finalName.replace(/[^a-zA-Z0-9._-]/g, "_")
      const storagePath = `${timestamp}-${safeName}`

      const { error: uploadError } = await supabaseAdmin.storage
        .from("media")
        .upload(storagePath, finalBuffer, {
          contentType: finalMimeType,
          upsert: false,
        })

      if (uploadError) {
        errors.push(`${file.name}: ${uploadError.message}`)
        continue
      }

      const { data: urlData } = supabaseAdmin.storage.from("media").getPublicUrl(storagePath)

      const asset = await prisma.mediaAsset.create({
        data: {
          url: urlData.publicUrl,
          filename: finalName,
          mimeType: finalMimeType,
          size: finalBuffer.length,
          bucket: "media",
          path: storagePath,
        },
      })

      uploaded.push(asset)
    } catch (err) {
      errors.push(`${file.name}: ${err instanceof Error ? err.message : "Unknown error"}`)
    }
  }

  return NextResponse.json({ uploaded, errors })
}
