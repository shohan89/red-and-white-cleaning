"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createGeoContent, deleteGeoContent } from "@/actions/seo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Plus, ChevronDown, ChevronUp } from "lucide-react"

interface GeoRecord {
  id: string
  entityType: string
  entityKeywords: string[]
  serviceKeywords: string[]
  locationKeywords: string[]
  aiSummary: string | null
  whatIsService: string | null
  whoNeedsService: string | null
  whyChooseCompany: string | null
  createdAt: Date
}

function parseKeywords(raw: string): string[] {
  return raw.split(",").map((s) => s.trim()).filter(Boolean)
}

export function GeoClient({ records }: { records: GeoRecord[] }) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleCreate(formData: FormData) {
    setPending(true)
    try {
      await createGeoContent({
        entityType: formData.get("entityType") as string,
        entityKeywords: parseKeywords(formData.get("entityKeywords") as string),
        serviceKeywords: parseKeywords(formData.get("serviceKeywords") as string),
        locationKeywords: parseKeywords(formData.get("locationKeywords") as string),
        aiSummary: (formData.get("aiSummary") as string) || undefined,
        whatIsService: (formData.get("whatIsService") as string) || undefined,
        whoNeedsService: (formData.get("whoNeedsService") as string) || undefined,
        whyChooseCompany: (formData.get("whyChooseCompany") as string) || undefined,
      })
      setShowForm(false)
      router.refresh()
    } finally {
      setPending(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this GEO content entry?")) return
    await deleteGeoContent(id)
    router.refresh()
  }

  return (
    <div className="space-y-4">
      {/* Existing Records */}
      {records.map((rec) => (
        <div key={rec.id} className="bg-white rounded-lg border">
          <div
            className="flex items-center justify-between px-4 py-3 cursor-pointer"
            onClick={() => setExpanded(expanded === rec.id ? null : rec.id)}
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">{rec.entityType}</p>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                {[...rec.entityKeywords, ...rec.locationKeywords].join(", ")}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-3">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleDelete(rec.id) }}
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              {expanded === rec.id ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
            </div>
          </div>

          {expanded === rec.id && (
            <div className="px-4 pb-4 border-t pt-3 space-y-3">
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <p className="font-medium text-gray-500 uppercase tracking-wide mb-1">Entity Keywords</p>
                  <p className="text-gray-700">{rec.entityKeywords.join(", ") || "—"}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-500 uppercase tracking-wide mb-1">Service Keywords</p>
                  <p className="text-gray-700">{rec.serviceKeywords.join(", ") || "—"}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-500 uppercase tracking-wide mb-1">Location Keywords</p>
                  <p className="text-gray-700">{rec.locationKeywords.join(", ") || "—"}</p>
                </div>
              </div>
              {rec.aiSummary && (
                <div className="text-xs">
                  <p className="font-medium text-gray-500 uppercase tracking-wide mb-1">AI Summary</p>
                  <p className="text-gray-700">{rec.aiSummary}</p>
                </div>
              )}
              {rec.whatIsService && (
                <div className="text-xs">
                  <p className="font-medium text-gray-500 uppercase tracking-wide mb-1">What is this service?</p>
                  <p className="text-gray-700">{rec.whatIsService}</p>
                </div>
              )}
              {rec.whoNeedsService && (
                <div className="text-xs">
                  <p className="font-medium text-gray-500 uppercase tracking-wide mb-1">Who needs this service?</p>
                  <p className="text-gray-700">{rec.whoNeedsService}</p>
                </div>
              )}
              {rec.whyChooseCompany && (
                <div className="text-xs">
                  <p className="font-medium text-gray-500 uppercase tracking-wide mb-1">Why choose this company?</p>
                  <p className="text-gray-700">{rec.whyChooseCompany}</p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Add New Form */}
      {showForm ? (
        <form action={handleCreate} className="bg-white rounded-lg border p-5 space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">New GEO Content Entry</h3>
          <div className="space-y-1.5">
            <Label className="text-xs">Entity Type <span className="text-muted-foreground">(e.g. service, location, company)</span></Label>
            <Input name="entityType" required placeholder="post-construction-cleaning" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Entity Keywords <span className="text-muted-foreground">(comma-separated)</span></Label>
              <Input name="entityKeywords" placeholder="post-construction, cleaning, builders clean" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Service Keywords</Label>
              <Input name="serviceKeywords" placeholder="phase 1 clean, PDI clean, final clean" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Location Keywords</Label>
              <Input name="locationKeywords" placeholder="Kitchener, Waterloo, KW Region" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">AI Summary</Label>
            <Textarea name="aiSummary" rows={2} placeholder="One-paragraph summary for AI/LLM consumption…" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">What is this service?</Label>
              <Textarea name="whatIsService" rows={3} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Who needs this service?</Label>
              <Textarea name="whoNeedsService" rows={3} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Why choose this company?</Label>
              <Textarea name="whyChooseCompany" rows={3} />
            </div>
          </div>
          <div className="flex gap-2 justify-end pt-1">
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button type="submit" disabled={pending} className="bg-brand-red hover:bg-brand-red/90 text-white">
              {pending ? "Saving…" : "Create Entry"}
            </Button>
          </div>
        </form>
      ) : (
        <Button variant="outline" onClick={() => setShowForm(true)} className="w-full border-dashed">
          <Plus className="h-4 w-4 mr-2" />
          Add GEO / AI Content Entry
        </Button>
      )}
    </div>
  )
}
