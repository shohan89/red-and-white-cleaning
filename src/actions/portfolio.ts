"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

async function requireAdmin() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
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
  return category
}

export async function deletePortfolioCategory(id: string) {
  await requireAdmin()
  await prisma.portfolioCategory.delete({ where: { id } })
  revalidatePath("/admin/categories")
  revalidatePath("/portfolio")
}

export async function createPortfolioItem(data: {
  title: string
  description?: string
  location?: string
  categoryId: string
  imageUrl?: string
  imageAlt?: string
  beforeImage?: string
  afterImage?: string
  beforeAlt?: string
  afterAlt?: string
  featured?: boolean
}) {
  await requireAdmin()
  const maxSort = await prisma.portfolioItem.aggregate({ _max: { sortOrder: true } })
  const item = await prisma.portfolioItem.create({
    data: { ...data, sortOrder: (maxSort._max.sortOrder ?? -1) + 1 },
  })
  revalidatePath("/admin/portfolio")
  revalidatePath("/portfolio")
  return item
}

export async function updatePortfolioItem(
  id: string,
  data: {
    title?: string
    description?: string
    location?: string
    categoryId?: string
    imageUrl?: string
    imageAlt?: string
    beforeImage?: string
    afterImage?: string
    beforeAlt?: string
    afterAlt?: string
    featured?: boolean
  }
) {
  await requireAdmin()
  await prisma.portfolioItem.update({ where: { id }, data })
  revalidatePath("/admin/portfolio")
  revalidatePath("/portfolio")
}

export async function togglePortfolioFeatured(id: string, featured: boolean) {
  await requireAdmin()
  await prisma.portfolioItem.update({ where: { id }, data: { featured } })
  revalidatePath("/admin/portfolio")
  revalidatePath("/portfolio")
}

export async function deletePortfolioItem(id: string) {
  await requireAdmin()
  await prisma.portfolioItem.delete({ where: { id } })
  revalidatePath("/admin/portfolio")
  revalidatePath("/portfolio")
}
