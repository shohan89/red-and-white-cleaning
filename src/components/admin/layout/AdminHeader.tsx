"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"

interface AdminHeaderProps {
  user?: {
    email?: string | null
    name?: string | null
    role?: string
  }
}

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="h-14 shrink-0 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div />
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>{user?.name ?? user?.email ?? "Admin"}</span>
          {user?.role === "SUPER_ADMIN" && (
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-brand-red/10 text-brand-red px-1.5 py-0.5 rounded">
              Super Admin
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
        >
          <LogOut className="h-4 w-4 mr-1.5" />
          Sign out
        </Button>
      </div>
    </header>
  )
}
