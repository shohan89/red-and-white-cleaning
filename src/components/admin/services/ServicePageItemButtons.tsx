"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { deleteServicePageItem, moveServicePageItem } from "@/actions/services"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, Loader2, Trash2 } from "lucide-react"

export function ServicePageItemButtons({ id }: { id: string }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const run = (fn: () => Promise<void>) =>
    startTransition(async () => {
      await fn()
      router.refresh()
    })
  return (
    <div className="flex items-center gap-0.5">
      <Button type="button" variant="ghost" size="icon" className="h-7 w-7" disabled={pending} onClick={() => run(() => moveServicePageItem(id, "up"))}>
        <ArrowUp className="h-3.5 w-3.5" />
      </Button>
      <Button type="button" variant="ghost" size="icon" className="h-7 w-7" disabled={pending} onClick={() => run(() => moveServicePageItem(id, "down"))}>
        <ArrowDown className="h-3.5 w-3.5" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-red-400 hover:text-red-600"
        disabled={pending}
        onClick={() => {
          if (!confirm("Delete this item?")) return
          run(() => deleteServicePageItem(id))
        }}
      >
        {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
      </Button>
    </div>
  )
}
