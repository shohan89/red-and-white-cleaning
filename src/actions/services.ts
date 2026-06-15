"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

async function requireAdmin() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
}

export async function updateService(
  id: string,
  data: { name?: string; description?: string; targetAudienceText?: string; label?: string }
) {
  await requireAdmin()
  await prisma.service.update({ where: { id }, data })
  revalidatePath("/admin/services")
}

export async function createServiceIncludedItem(serviceId: string, text: string) {
  await requireAdmin()
  const maxSort = await prisma.serviceIncludedItem.aggregate({
    _max: { sortOrder: true },
    where: { serviceId },
  })
  await prisma.serviceIncludedItem.create({
    data: { serviceId, text, sortOrder: (maxSort._max.sortOrder ?? -1) + 1 },
  })
  revalidatePath("/admin/services")
}

export async function deleteServiceIncludedItem(id: string) {
  await requireAdmin()
  await prisma.serviceIncludedItem.delete({ where: { id } })
  revalidatePath("/admin/services")
}

export async function createServicePhase(
  serviceId: string,
  data: { phaseNumber: number; title: string; description: string; icon?: string }
) {
  await requireAdmin()
  const maxSort = await prisma.servicePhase.aggregate({
    _max: { sortOrder: true },
    where: { serviceId },
  })
  await prisma.servicePhase.create({
    data: { serviceId, ...data, sortOrder: (maxSort._max.sortOrder ?? -1) + 1 },
  })
  revalidatePath("/admin/services")
}

export async function updateServicePhase(
  id: string,
  data: { title?: string; description?: string; phaseNumber?: number }
) {
  await requireAdmin()
  await prisma.servicePhase.update({ where: { id }, data })
  revalidatePath("/admin/services")
}

export async function deleteServicePhase(id: string) {
  await requireAdmin()
  await prisma.servicePhase.delete({ where: { id } })
  revalidatePath("/admin/services")
}
