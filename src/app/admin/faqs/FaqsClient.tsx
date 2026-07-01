"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { toggleFaqPublished, deleteFaq } from "@/actions/faqs"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2 } from "lucide-react"

export function PublishToggle({ id, published }: { id: string; published: boolean }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  return (
    <Switch
      checked={published}
      disabled={pending}
      onCheckedChange={(v) =>
        startTransition(async () => {
          await toggleFaqPublished(id, v)
          router.refresh()
        })
      }
    />
  )
}

export function DeleteFaqButton({ id }: { id: string }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={pending}
      onClick={() => {
        if (!confirm("Delete this FAQ?")) return
        startTransition(async () => {
          await deleteFaq(id)
          router.refresh()
        })
      }}
      className="text-destructive hover:text-destructive"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </Button>
  )
}
