"use client"

import { useTransition } from "react"
import { toggleSchemaConfig } from "@/actions/seo"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from "lucide-react"

export function SchemaToggle({ type, enabled }: { type: string; enabled: boolean }) {
  const [pending, startTransition] = useTransition()
  return (
    <div className="flex items-center gap-2">
      {pending && <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />}
      <Switch
        checked={enabled}
        disabled={pending}
        onCheckedChange={(v) => startTransition(() => toggleSchemaConfig(type, v))}
      />
    </div>
  )
}
