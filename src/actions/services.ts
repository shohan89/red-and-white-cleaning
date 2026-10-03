"use server"

import { revalidatePath, refresh } from "next/cache"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { SERVICE_PAGE_SECTION_KEYS, type ServicePageSectionKey } from "@/lib/service-page-sections"

async function requireAdmin() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
}

function revalidateService() {
  revalidatePath("/admin/services")
  revalidatePath("/admin/service-pages")
  revalidatePath("/admin/services/[slug]", "page")
  revalidatePath("/admin/service-pages/[slug]", "page")
  revalidatePath("/services")
  revalidatePath("/services/[slug]", "page")
  revalidatePath("/sitemap.xml")
  refresh()
}

interface ServiceFields {
  name: string
  slug: string
  label?: string
  title: string
  description: string
  targetAudienceText?: string
  icon?: string
  seoTitle?: string
  seoDesc?: string
  ogImage?: string
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

interface ServiceDetailSectionFields {
  title: string
  body: string
  icon?: string
}

export async function createServiceDetailSection(serviceId: string, data: ServiceDetailSectionFields) {
  await requireAdmin()
  const maxSort = await prisma.serviceDetailSection.aggregate({
    _max: { sortOrder: true },
    where: { serviceId },
  })
  await prisma.serviceDetailSection.create({
    data: { serviceId, ...data, sortOrder: (maxSort._max.sortOrder ?? -1) + 1 },
  })
  revalidateService()
}

export async function updateServiceDetailSection(id: string, data: Partial<ServiceDetailSectionFields>) {
  await requireAdmin()
  await prisma.serviceDetailSection.update({ where: { id }, data })
  revalidateService()
}

export async function deleteServiceDetailSection(id: string) {
  await requireAdmin()
  await prisma.serviceDetailSection.delete({ where: { id } })
  revalidateService()
}

// ─── Page sections (dedicated service page content editor) ──────────────────

function assertSectionKey(key: string): asserts key is ServicePageSectionKey {
  if (!(SERVICE_PAGE_SECTION_KEYS as readonly string[]).includes(key)) throw new Error("Invalid section")
}

export async function saveServicePageSection(
  serviceId: string,
  key: string,
  data: { heading?: string; intro?: string; enabled: boolean },
) {
  await requireAdmin()
  assertSectionKey(key)
  const values = {
    heading: data.heading?.trim() || null,
    intro: data.intro?.trim() || null,
    enabled: data.enabled,
  }
  await prisma.servicePageSection.upsert({
    where: { serviceId_key: { serviceId, key } },
    update: values,
    create: { serviceId, key, ...values },
  })
  revalidateService()
}

interface ServicePageItemFields {
  title: string
  body?: string
  url?: string
}

export async function createServicePageItem(serviceId: string, sectionKey: string, data: ServicePageItemFields) {
  await requireAdmin()
  assertSectionKey(sectionKey)
  const maxSort = await prisma.servicePageItem.aggregate({
    _max: { sortOrder: true },
    where: { serviceId, sectionKey },
  })
  await prisma.servicePageItem.create({
    data: {
      serviceId,
      sectionKey,
      title: data.title,
      body: data.body || null,
      url: data.url || null,
      sortOrder: (maxSort._max.sortOrder ?? -1) + 1,
    },
  })
  revalidateService()
}

export async function updateServicePageItem(id: string, data: ServicePageItemFields) {
  await requireAdmin()
  await prisma.servicePageItem.update({
    where: { id },
    data: { title: data.title, body: data.body || null, url: data.url || null },
  })
  revalidateService()
}

export async function deleteServicePageItem(id: string) {
  await requireAdmin()
  await prisma.servicePageItem.delete({ where: { id } })
  revalidateService()
}

// Swap sortOrder with the neighbouring item in the same section.
export async function moveServicePageItem(id: string, direction: "up" | "down") {
  await requireAdmin()
  const item = await prisma.servicePageItem.findUnique({ where: { id } })
  if (!item) return
  const siblings = await prisma.servicePageItem.findMany({
    where: { serviceId: item.serviceId, sectionKey: item.sectionKey },
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  })
  const i = siblings.findIndex((s) => s.id === id)
  const j = direction === "up" ? i - 1 : i + 1
  if (j < 0 || j >= siblings.length) return
  const reordered = [...siblings]
  ;[reordered[i], reordered[j]] = [reordered[j], reordered[i]]
  for (let idx = 0; idx < reordered.length; idx++) {
    if (reordered[idx].sortOrder !== idx) {
      await prisma.servicePageItem.update({ where: { id: reordered[idx].id }, data: { sortOrder: idx } })
    }
  }
  revalidateService()
}

export async function saveServiceRelatedPosts(serviceId: string, postIds: string[]) {
  await requireAdmin()
  await prisma.service.update({ where: { id: serviceId }, data: { relatedPostIds: postIds } })
  revalidateService()
}
