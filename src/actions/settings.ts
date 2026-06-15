"use server"

import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/rbac"
import { revalidatePath } from "next/cache"

export async function saveSiteSettings(formData: FormData) {
  await requireAdmin()

  const data = {
    companyName: formData.get("companyName") as string | null,
    legalName: formData.get("legalName") as string | null,
    phone: formData.get("phone") as string | null,
    email: formData.get("email") as string | null,
    addressStreet: formData.get("addressStreet") as string | null,
    addressCity: formData.get("addressCity") as string | null,
    addressProvince: formData.get("addressProvince") as string | null,
    addressPostal: formData.get("addressPostal") as string | null,
    businessHours: formData.get("businessHours") as string | null,
    foundedYear: formData.get("foundedYear") ? parseInt(formData.get("foundedYear") as string) : null,
    facebook: formData.get("facebook") as string | null,
    instagram: formData.get("instagram") as string | null,
    linkedin: formData.get("linkedin") as string | null,
    footerText: formData.get("footerText") as string | null,
    googleMapsEmbed: formData.get("googleMapsEmbed") as string | null,
  }

  const existing = await prisma.siteSettings.findFirst()
  if (existing) {
    await prisma.siteSettings.update({ where: { id: existing.id }, data })
  } else {
    await prisma.siteSettings.create({ data })
  }

  revalidatePath("/admin/settings")
}
