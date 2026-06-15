"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

async function requireAdmin() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
}

export async function createFaqCategory(data: { name: string; slug: string; icon?: string }) {
  await requireAdmin()
  const maxSort = await prisma.faqCategory.aggregate({ _max: { sortOrder: true } })
  const category = await prisma.faqCategory.create({
    data: { ...data, sortOrder: (maxSort._max.sortOrder ?? -1) + 1 },
  })
  revalidatePath("/admin/faqs")
  return category
}

export async function createFaq(data: {
  question: string
  answer: string
  categoryId: string
  published?: boolean
}) {
  await requireAdmin()
  const maxSort = await prisma.faq.aggregate({
    _max: { sortOrder: true },
    where: { categoryId: data.categoryId },
  })
  const faq = await prisma.faq.create({
    data: { ...data, sortOrder: (maxSort._max.sortOrder ?? -1) + 1, published: data.published ?? true },
  })
  revalidatePath("/admin/faqs")
  revalidatePath("/faq")
  return faq
}

export async function updateFaq(
  id: string,
  data: { question?: string; answer?: string; categoryId?: string; published?: boolean }
) {
  await requireAdmin()
  const faq = await prisma.faq.update({
    where: { id },
    data: { ...data, updatedAt: new Date() },
  })
  revalidatePath("/admin/faqs")
  revalidatePath("/faq")
  return faq
}

export async function toggleFaqPublished(id: string, published: boolean) {
  await requireAdmin()
  await prisma.faq.update({ where: { id }, data: { published, updatedAt: new Date() } })
  revalidatePath("/admin/faqs")
  revalidatePath("/faq")
}

export async function deleteFaq(id: string) {
  await requireAdmin()
  await prisma.faq.delete({ where: { id } })
  revalidatePath("/admin/faqs")
  revalidatePath("/faq")
}

export async function reorderFaqs(orderedIds: string[]) {
  await requireAdmin()
  await Promise.all(
    orderedIds.map((id, index) =>
      prisma.faq.update({ where: { id }, data: { sortOrder: index } })
    )
  )
  revalidatePath("/admin/faqs")
  revalidatePath("/faq")
}
