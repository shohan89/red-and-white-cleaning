import { requireSuperAdmin } from "@/lib/rbac"
import { prisma } from "@/lib/prisma"
import { createUser } from "@/actions/users"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Shield } from "lucide-react"
import { RoleSelect, DeleteUserButton } from "./UsersClient"

export const metadata = { title: "Users" }

export default async function UsersPage() {
  await requireSuperAdmin()

  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } })

  async function handleCreate(formData: FormData) {
    "use server"
    await createUser(formData)
    redirect("/admin/users")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-brand-dark">Users</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {users.length} admin user{users.length !== 1 ? "s" : ""}. Super Admin access only.
        </p>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {users.map((user) => (
            <li key={user.id} className="flex items-center gap-3 px-4 py-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900 truncate">{user.name ?? user.email}</p>
                  {user.role === "SUPER_ADMIN" ? (
                    <ShieldCheck className="h-3.5 w-3.5 text-brand-red shrink-0" />
                  ) : (
                    <Shield className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
              <RoleSelect id={user.id} role={user.role} />
              <DeleteUserButton id={user.id} />
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">Add User</h2>
        <form action={handleCreate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Name</Label>
              <Input name="name" placeholder="Jane Smith" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Email</Label>
              <Input name="email" type="email" required placeholder="jane@example.com" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Password</Label>
              <Input name="password" type="password" required minLength={8} placeholder="Min 8 characters" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Role</Label>
              <Select name="role" defaultValue="ADMIN">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="bg-brand-red hover:bg-brand-red/90 text-white">
              Create User
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
