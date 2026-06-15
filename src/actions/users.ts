"use server"

import { prisma } from "@/lib/prisma"
import { requireSuperAdmin } from "@/lib/rbac"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"

export async function createUser(formData: FormData) {
  await requireSuperAdmin()

  const email = formData.get("email") as string
  const name = formData.get("name") as string
  const password = formData.get("password") as string
  const role = (formData.get("role") as string) === "SUPER_ADMIN" ? "SUPER_ADMIN" : "ADMIN"

  if (!email || !password) throw new Error("Email and password are required")

  const hashed = await bcrypt.hash(password, 12)
  await prisma.user.create({
    data: { email, name: name || null, password: hashed, role: role as any },
  })

  revalidatePath("/admin/users")
}

export async function updateUserRole(id: string, role: "SUPER_ADMIN" | "ADMIN") {
  await requireSuperAdmin()
  await prisma.user.update({ where: { id }, data: { role } })
  revalidatePath("/admin/users")
}

export async function deleteUser(id: string) {
  await requireSuperAdmin()
  await prisma.user.delete({ where: { id } })
  revalidatePath("/admin/users")
}
