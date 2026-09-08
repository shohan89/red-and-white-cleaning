"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { togglePortfolioFeatured, deletePortfolioItem, deletePortfolioImage } from "@/actions/portfolio"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2 } from "lucide-react"

export function FeaturedToggle({ id, featured }: { id: string; featured: boolean }) {
  const [pending, startTransition] = useTransition()
  return (
    <Switch
      checked={featured}
      disabled={pending}
      onCheckedChange={(v) => startTransition(() => togglePortfolioFeatured(id, v))}
    />
  )
}

export function DeleteItemButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition()
  const router = useRouter()
  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={pending}
      onClick={() => {
        if (!confirm("Delete this portfolio item?")) return
        startTransition(async () => {
          await deletePortfolioItem(id)
          router.refresh()
        })
      }}
      className="text-destructive hover:text-destructive"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </Button>
  )
}

export function DeletePortfolioImageButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition()
  const router = useRouter()
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7 text-red-400 hover:text-red-600"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await deletePortfolioImage(id)
          router.refresh()
        })
      }
    >
      {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
    </Button>
  )
}
