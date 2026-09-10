"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { deleteBlogPost, deleteBlogCategory } from "@/actions/blog"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2 } from "lucide-react"
import { toast } from "sonner"

export function DeleteBlogPostButton({ id, title }: { id: string; title: string }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={pending}
      onClick={() => {
        if (!confirm(`Delete "${title}"?`)) return
        startTransition(async () => {
          await deleteBlogPost(id)
          router.refresh()
        })
      }}
      className="text-destructive hover:text-destructive"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </Button>
  )
}

export function DeleteBlogCategoryButton({ id, name }: { id: string; name: string }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={pending}
      onClick={() => {
        if (!confirm(`Delete category "${name}"?`)) return
        startTransition(async () => {
          try {
            await deleteBlogCategory(id)
            router.refresh()
          } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to delete category")
          }
        })
      }}
      className="text-destructive hover:text-destructive"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </Button>
  )
}
