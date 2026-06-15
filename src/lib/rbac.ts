import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function getSession() {
  return auth()
}

export async function requireAuth() {
  const session = await auth()
  if (!session?.user) redirect("/auth/login")
  return session
}

export async function requireSuperAdmin() {
  const session = await auth()
  if ((session?.user as any)?.role !== "SUPER_ADMIN") redirect("/admin")
  return session
}

export function isSuperAdmin(session: any): boolean {
  return session?.user?.role === "SUPER_ADMIN"
}

export async function requireAdmin() {
  const session = await auth()
  if (!session?.user) redirect("/auth/login")
  if (!["ADMIN", "SUPER_ADMIN"].includes((session.user as any)?.role)) redirect("/admin")
  return session
}