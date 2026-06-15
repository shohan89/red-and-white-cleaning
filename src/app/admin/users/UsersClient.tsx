"use client"

import { useTransition } from "react"
import { updateUserRole, deleteUser } from "@/actions/users"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Trash2, Loader2 } from "lucide-react"

export function RoleSelect({ id, role }: { id: string; role: string }) {
  const [pending, startTransition] = useTransition()
  return (
    <div className="flex items-center gap-2">
      {pending && <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />}
      <Select
        value={role}
        disabled={pending}
        onValueChange={(v) =>
          startTransition(() => updateUserRole(id, v as "SUPER_ADMIN" | "ADMIN"))
        }
      >
        <SelectTrigger className="h-8 text-xs w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ADMIN">Admin</SelectItem>
          <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export function DeleteUserButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition()
  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={pending}
      onClick={() => {
        if (!confirm("Delete this user? This cannot be undone.")) return
        startTransition(() => deleteUser(id))
      }}
      className="text-destructive hover:text-destructive"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </Button>
  )
}
