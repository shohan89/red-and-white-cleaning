"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

async function requireAdmin() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
}

function revalidateService() {
  revalidatePath("/admin/services")
  revalidatePath("/services")
}

interface ServiceFields {
  name: string
  slug: string
  label?: string
  title: string
  description: string
  targetAudienceText?: string
  icon?: string
}

export async function createService(data: ServiceFields) {
  await requireAdmin()
  const maxSort = await prisma.service.aggregate({ _max: { sortOrder: true } })
  const service = await prisma.service.create({
    data: { ...data, sortOrder: (maxSort._max.sortOrder ?? -1) + 1 },
  })
  revalidateService()
  return service
}

export async function updateService(id: string, data: Partial<ServiceFields>) {
  await requireAdmin()
  await prisma.service.update({ where: { id }, data })
  revalidateService()
}

export async function deleteService(id: string) {
  await requireAdmin()
  await prisma.service.delete({ where: { id } })
  revalidateService()
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
  revalidateService()
}

export async function updateServiceIncludedItem(id: string, text: string) {
  await requireAdmin()
  await prisma.serviceIncludedItem.update({ where: { id }, data: { text } })
  revalidateService()
}

export async function deleteServiceIncludedItem(id: string) {
  await requireAdmin()
  await prisma.serviceIncludedItem.delete({ where: { id } })
  revalidateService()
}

interface ServicePhaseFields {
  phaseNumber: number
  title: string
  description: string
  icon?: string
  frequency?: string
  bestFor?: string
}

export async function createServicePhase(serviceId: string, data: ServicePhaseFields) {
  await requireAdmin()
  const maxSort = await prisma.servicePhase.aggregate({
    _max: { sortOrder: true },
    where: { serviceId },
  })
  await prisma.servicePhase.create({
    data: { serviceId, ...data, sortOrder: (maxSort._max.sortOrder ?? -1) + 1 },
  })
  revalidateService()
}

export async function updateServicePhase(id: string, data: Partial<ServicePhaseFields>) {
  await requireAdmin()
  await prisma.servicePhase.update({ where: { id }, data })
  revalidateService()
}

export async function deleteServicePhase(id: string) {
  await requireAdmin()
  await prisma.servicePhase.delete({ where: { id } })
  revalidateService()
}

interface ServiceImageFields {
  imageUrl: string
  phaseLabel?: string
  altText?: string
  caption?: string
  objectPosition?: string
}

export async function createServiceImage(serviceId: string, data: ServiceImageFields) {
  await requireAdmin()
  const maxSort = await prisma.serviceImage.aggregate({
    _max: { sortOrder: true },
    where: { serviceId },
  })
  await prisma.serviceImage.create({
    data: { serviceId, ...data, sortOrder: (maxSort._max.sortOrder ?? -1) + 1 },
  })
  revalidateService()
}

export async function updateServiceImage(id: string, data: Partial<ServiceImageFields>) {
  await requireAdmin()
  await prisma.serviceImage.update({ where: { id }, data })
  revalidateService()
}

export async function deleteServiceImage(id: string) {
  await requireAdmin()
  await prisma.serviceImage.delete({ where: { id } })
  revalidateService()
}
