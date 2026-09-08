"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { deleteServiceIncludedItem, deleteServicePhase, deleteServiceImage } from "@/actions/services"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2 } from "lucide-react"

export function DeleteIncludedItemButton({ id }: { id: string }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="h-7 w-7 text-red-400 hover:text-red-600"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await deleteServiceIncludedItem(id)
          router.refresh()
        })
      }
    >
      {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
    </Button>
  )
}

export function DeletePhaseButton({ id }: { id: string }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      disabled={pending}
      onClick={() => {
        if (!confirm("Delete this phase?")) return
        startTransition(async () => {
          await deleteServicePhase(id)
          router.refresh()
        })
      }}
      className="text-destructive hover:text-destructive"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </Button>
  )
}

export function DeleteServiceImageButton({ id }: { id: string }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="h-7 w-7 text-red-400 hover:text-red-600 shrink-0"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await deleteServiceImage(id)
          router.refresh()
        })
      }
    >
      {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
    </Button>
  )
}

export function DeleteServiceButton() {
  return (
    <Button
      type="submit"
      variant="outline"
      size="sm"
      onClick={(e) => {
        if (!confirm("Delete this entire service? This removes all its phases, included items, and images too.")) {
          e.preventDefault()
        }
      }}
      className="text-destructive hover:text-destructive"
    >
      <Trash2 className="h-4 w-4 mr-1.5" />
      Delete Service
    </Button>
  )
}
