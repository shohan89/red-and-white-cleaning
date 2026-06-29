import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { updateService, createServiceIncludedItem, createServicePhase } from "@/actions/services"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { DeleteIncludedItemButton, DeletePhaseButton } from "../ServicesClient"

export default async function ServiceEditorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = await prisma.service.findUnique({
    where: { slug },
    include: {
      includedItems: { orderBy: { sortOrder: "asc" } },
      phases: { orderBy: { sortOrder: "asc" } },
    },
  }).catch((err: unknown) => {
    console.error("[admin/services/slug] DB error:", err)
    throw err
  })

  if (!service) notFound()

  async function handleUpdateBasic(formData: FormData) {
    "use server"
    await updateService(service!.id, {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      targetAudienceText: formData.get("targetAudienceText") as string,
      label: formData.get("label") as string,
    })
  }

  async function handleAddItem(formData: FormData) {
    "use server"
    const text = formData.get("text") as string
    if (!text?.trim()) return
    await createServiceIncludedItem(service!.id, text.trim())
  }

  async function handleAddPhase(formData: FormData) {
    "use server"
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const phaseNumber = parseInt(formData.get("phaseNumber") as string) || 1
    if (!title || !description) return
    await createServicePhase(service!.id, { title, description, phaseNumber })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/services">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Services
          </Link>
        </Button>
        <h1 className="text-xl font-heading font-bold text-brand-dark">{service.name}</h1>
      </div>

      {/* Basic Info */}
      <section className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 border-b pb-2">Basic Info</h2>
        <form action={handleUpdateBasic} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Service Name</Label>
              <Input id="name" name="name" defaultValue={service.name} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="label">Short Label</Label>
              <Input id="label" name="label" defaultValue={service.label ?? ""} placeholder="e.g. Post-Con" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={4} defaultValue={service.description} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="targetAudienceText">Target Audience</Label>
            <Input
              id="targetAudienceText"
              name="targetAudienceText"
              defaultValue={service.targetAudienceText ?? ""}
              placeholder="For: General Contractors · Developers"
            />
          </div>
          <Button type="submit" className="bg-brand-red hover:bg-brand-red/90 text-white">
            Save Basic Info
          </Button>
        </form>
      </section>

      {/* Included Items */}
      <section className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 border-b pb-2">
          What&apos;s Included ({service.includedItems.length})
        </h2>
        {service.includedItems.length > 0 && (
          <ul className="space-y-2">
            {service.includedItems.map((item) => (
              <li key={item.id} className="flex items-center gap-2">
                <span className="flex-1 text-sm text-gray-700">• {item.text}</span>
                <DeleteIncludedItemButton id={item.id} />
              </li>
            ))}
          </ul>
        )}
        <form action={handleAddItem} className="flex gap-2">
          <Input name="text" placeholder="Add included item…" className="flex-1" />
          <Button type="submit" variant="outline" size="sm">Add</Button>
        </form>
      </section>

      {/* Phases */}
      <section className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 border-b pb-2">
          Service Phases ({service.phases.length})
        </h2>
        {service.phases.length > 0 && (
          <div className="space-y-3">
            {service.phases.map((phase) => (
              <div key={phase.id} className="flex gap-3 p-3 rounded-lg border bg-gray-50">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-brand-red uppercase">Phase {phase.phaseNumber}</p>
                  <p className="text-sm font-semibold text-gray-900">{phase.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{phase.description}</p>
                </div>
                <DeletePhaseButton id={phase.id} />
              </div>
            ))}
          </div>
        )}
        <div className="border-t pt-4 space-y-3">
          <p className="text-xs font-medium text-gray-600">Add Phase</p>
          <form action={handleAddPhase} className="space-y-3">
            <div className="grid grid-cols-4 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="phaseNumber" className="text-xs">Phase #</Label>
                <Input id="phaseNumber" name="phaseNumber" type="number" min={1} defaultValue={service.phases.length + 1} className="text-sm" />
              </div>
              <div className="col-span-3 space-y-1.5">
                <Label htmlFor="phaseTitle" className="text-xs">Title</Label>
                <Input id="phaseTitle" name="title" placeholder="Phase title…" className="text-sm" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phaseDesc" className="text-xs">Description</Label>
              <Textarea id="phaseDesc" name="description" rows={2} placeholder="What happens in this phase…" className="text-sm" />
            </div>
            <Button type="submit" variant="outline" size="sm">Add Phase</Button>
          </form>
        </div>
      </section>
    </div>
  )
}
