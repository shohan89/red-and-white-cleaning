"use client"

import { useTransition } from "react"
import { deleteSitemapEntry, upsertSitemapEntry } from "@/actions/seo"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2 } from "lucide-react"

export function SitemapIncludedToggle({ url, priority, changeFrequency, included }: {
  url: string
  priority: number
  changeFrequency: string
  included: boolean
}) {
  const [pending, startTransition] = useTransition()
  return (
    <Switch
      checked={included}
      disabled={pending}
      onCheckedChange={(v) =>
        startTransition(() => upsertSitemapEntry({ url, priority, changeFrequency, included: v }))
      }
    />
  )
}

export function DeleteSitemapButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition()
  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={pending}
      onClick={() => {
        if (!confirm("Remove this URL from the sitemap?")) return
        startTransition(() => deleteSitemapEntry(id))
      }}
      className="text-destructive hover:text-destructive"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </Button>
  )
}
