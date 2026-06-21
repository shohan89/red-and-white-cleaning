"use client"

import { useState, useTransition } from "react"
import { updateLeadStatus, addLeadNote, setLeadFollowUp, deleteLead } from "@/actions/leads"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { Loader2, Trash2 } from "lucide-react"
import type { LeadStatus } from "@/types"

const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "QUOTED", label: "Quoted" },
  { value: "WON", label: "Won" },
  { value: "LOST", label: "Lost" },
]

export function StatusUpdater({ leadId, currentStatus }: { leadId: string; currentStatus: LeadStatus }) {
  const [pending, startTransition] = useTransition()

  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Status</Label>
      <Select
        defaultValue={currentStatus}
        onValueChange={(v) =>
          startTransition(() => void updateLeadStatus(leadId, v as LeadStatus))
        }
        disabled={pending}
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export function NoteForm({ leadId, existingNote }: { leadId: string; existingNote?: string | null }) {
  const [note, setNote] = useState(existingNote ?? "")
  const [pending, startTransition] = useTransition()

  return (
    <div className="space-y-2">
      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Internal Notes</Label>
      <Textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={4}
        placeholder="Add internal notes…"
        disabled={pending}
      />
      <Button
        size="sm"
        disabled={pending || !note.trim()}
        onClick={() => startTransition(() => addLeadNote(leadId, note))}
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        Save Note
      </Button>
    </div>
  )
}

export function FollowUpForm({ leadId, currentDate }: { leadId: string; currentDate?: Date | null }) {
  const [pending, startTransition] = useTransition()
  const defaultValue = currentDate ? currentDate.toISOString().split("T")[0] : ""

  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Follow-Up Date</Label>
      <div className="flex gap-2">
        <Input
          type="date"
          defaultValue={defaultValue}
          disabled={pending}
          onChange={(e) =>
            startTransition(() => setLeadFollowUp(leadId, e.target.value || null))
          }
        />
      </div>
    </div>
  )
}

export function DeleteLeadButton({ leadId }: { leadId: string }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  function handleDelete() {
    if (!confirm("Delete this lead? This cannot be undone.")) return
    startTransition(async () => {
      await deleteLead(leadId)
      router.push("/admin/leads")
    })
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={pending}
      onClick={handleDelete}
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Trash2 className="h-4 w-4 mr-1" />}
      Delete Lead
    </Button>
  )
}
