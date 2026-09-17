"use server"

import { revalidatePath, refresh } from "next/cache"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

async function requireAdmin() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
}

function revalidatePortfolio() {
  revalidatePath("/admin/portfolio")
  revalidatePath("/admin/portfolio/[id]/edit", "page")
  revalidatePath("/portfolio")
  refresh()
}

export async function createPortfolioCategory(data: {
  name: string
  slug: string
  description?: string
}) {
  await requireAdmin()
  const maxSort = await prisma.portfolioCategory.aggregate({ _max: { sortOrder: true } })
  const category = await prisma.portfolioCategory.create({
    data: { ...data, sortOrder: (maxSort._max.sortOrder ?? -1) + 1 },
  })
  revalidatePath("/admin/categories")
  revalidatePath("/portfolio")
  refresh()
  return category
}

export async function updatePortfolioCategory(
  id: string,
  data: { name?: string; slug?: string; description?: string }
) {
  await requireAdmin()
  const category = await prisma.portfolioCategory.update({ where: { id }, data })
  revalidatePath("/admin/categories")
  revalidatePath("/portfolio")
  refresh()
  return category
}

export async function deletePortfolioCategory(id: string) {
  await requireAdmin()
  await prisma.portfolioCategory.delete({ where: { id } })
  revalidatePath("/admin/categories")
  revalidatePath("/portfolio")
  refresh()
}

interface PortfolioItemFields {
  title: string
  description?: string
  location?: string
  clientName?: string
  completedAt?: Date
  categoryId: string
  imageUrl?: string
  imageAlt?: string
  imageCaption?: string
  imageTitle?: string
  beforeImage?: string
  afterImage?: string
  beforeAlt?: string
  afterAlt?: string
  featured?: boolean
  seoTitle?: string
  seoDesc?: string
  ogImage?: string
}

export async function createPortfolioItem(data: PortfolioItemFields) {
  await requireAdmin()
  const maxSort = await prisma.portfolioItem.aggregate({ _max: { sortOrder: true } })
  const item = await prisma.portfolioItem.create({
    data: { ...data, sortOrder: (maxSort._max.sortOrder ?? -1) + 1 },
  })
  revalidatePortfolio()
  return item
}

export async function updatePortfolioItem(id: string, data: Partial<PortfolioItemFields>) {
  await requireAdmin()
  await prisma.portfolioItem.update({ where: { id }, data })
  revalidatePortfolio()
}

export async function togglePortfolioFeatured(id: string, featured: boolean) {
  await requireAdmin()
  await prisma.portfolioItem.update({ where: { id }, data: { featured } })
  revalidatePortfolio()
}

export async function deletePortfolioItem(id: string) {
  await requireAdmin()
  await prisma.portfolioItem.delete({ where: { id } })
  revalidatePortfolio()
}

// ─── PORTFOLIO IMAGE GALLERY ────────────────────────────────────────────────

export async function createPortfolioImage(
  portfolioItemId: string,
  data: { imageUrl: string; label?: string; altText?: string; caption?: string }
) {
  await requireAdmin()
  const maxSort = await prisma.portfolioImage.aggregate({
    _max: { sortOrder: true },
    where: { portfolioItemId },
  })
  await prisma.portfolioImage.create({
    data: { portfolioItemId, ...data, sortOrder: (maxSort._max.sortOrder ?? -1) + 1 },
  })
  revalidatePortfolio()
}

export async function updatePortfolioImage(
  id: string,
  data: { imageUrl?: string; label?: string; altText?: string; caption?: string }
) {
  await requireAdmin()
  await prisma.portfolioImage.update({ where: { id }, data })
  revalidatePortfolio()
}

export async function deletePortfolioImage(id: string) {
  await requireAdmin()
  await prisma.portfolioImage.delete({ where: { id } })
  revalidatePortfolio()
}
