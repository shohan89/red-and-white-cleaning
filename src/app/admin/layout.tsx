import { auth } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar"
import { AdminHeader } from "@/components/admin/layout/AdminHeader"

export const metadata = {
  robots: "noindex, nofollow",
  title: { template: "%s | R&W Admin", default: "Admin" },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let session: Awaited<ReturnType<typeof auth>> | null = null
  try {
    session = await auth()
  } catch {
    // non-fatal; middleware already verified the session
  }
  const user = session?.user as
    | { email?: string | null; name?: string | null; role?: string }
    | undefined

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-h-0">
        <AdminHeader user={user} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
