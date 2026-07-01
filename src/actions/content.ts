"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

async function requireAdmin() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
}

export async function savePageContent(
  pageKey: string,
  sectionKey: string,
  content: Record<string, string | string[]>
) {
  await requireAdmin()
  try {
    await prisma.pageContent.upsert({
      where: { pageKey_sectionKey: { pageKey, sectionKey } },
      create: { pageKey, sectionKey, content },
      update: { content },
    })
    revalidatePath(`/admin/content/${pageKey}`)
    revalidatePath(pageKey === "home" ? "/" : `/${pageKey}`)
    return { success: true }
  } catch (err) {
    console.error("[savePageContent] DB error:", err)
    return { error: "Failed to save content. Please try again." }
  }
}
