"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { deletePortfolioCategory } from "@/actions/portfolio"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2 } from "lucide-react"

export function DeleteCategoryButton({ id, name }: { id: string; name: string }) {
  const [pending, startTransition] = useTransition()
  const router = useRouter()
  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={pending}
      onClick={() => {
        if (!confirm(`Delete category "${name}"? All items in this category will also be deleted.`)) return
        startTransition(async () => {
          await deletePortfolioCategory(id)
          router.refresh()
        })
      }}
      className="text-destructive hover:text-destructive"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </Button>
  )
}
