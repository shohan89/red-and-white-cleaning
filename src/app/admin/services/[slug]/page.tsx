import { notFound, redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import {
  updateService,
  deleteService,
  createServiceIncludedItem,
  updateServiceIncludedItem,
  createServicePhase,
  updateServicePhase,
  createServiceImage,
} from "@/actions/services"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/admin/SubmitButton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUploadField } from "@/components/admin/portfolio/ImageUploadField"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import {
  DeleteIncludedItemButton,
  DeletePhaseButton,
  DeleteServiceButton,
  DeleteServiceImageButton,
} from "../ServicesClient"
import { SaveStatus } from "@/components/admin/SaveStatus"

export default async function ServiceEditorPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ saved?: string }>
}) {
  const { slug } = await params
  const { saved } = await searchParams
  const service = await prisma.service.findUnique({
    where: { slug },
    include: {
      includedItems: { orderBy: { sortOrder: "asc" } },
      phases: { orderBy: { sortOrder: "asc" } },
      images: { orderBy: { sortOrder: "asc" } },
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
      slug: formData.get("slug") as string,
      title: formData.get("title") as string,
      icon: formData.get("icon") as string,
      description: formData.get("description") as string,
      targetAudienceText: formData.get("targetAudienceText") as string,
      label: formData.get("label") as string,
    })
    redirect(`/admin/services/${formData.get("slug")}?saved=basic`)
  }

  async function handleDeleteService() {
    "use server"
    await deleteService(service!.id)
    redirect("/admin/services")
  }

  async function handleAddItem(formData: FormData) {
    "use server"
    const text = formData.get("text") as string
    if (!text?.trim()) return
    await createServiceIncludedItem(service!.id, text.trim())
    redirect(`/admin/services/${slug}`)
  }

  async function handleAddPhase(formData: FormData) {
    "use server"
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const phaseNumber = parseInt(formData.get("phaseNumber") as string) || 1
    const icon = formData.get("icon") as string
    const frequency = formData.get("frequency") as string
    const bestFor = formData.get("bestFor") as string
    if (!title || !description) return
    await createServicePhase(service!.id, {
      title,
      description,
      phaseNumber,
      icon: icon || undefined,
      frequency: frequency || undefined,
      bestFor: bestFor || undefined,
    })
    redirect(`/admin/services/${slug}`)
  }

  async function handleUpdateItem(formData: FormData) {
    "use server"
    const itemId = formData.get("itemId") as string
    const text = formData.get("text") as string
    if (!itemId || !text?.trim()) return
    await updateServiceIncludedItem(itemId, text.trim())
    redirect(`/admin/services/${slug}`)
  }

  async function handleUpdatePhase(formData: FormData) {
    "use server"
    const phaseId = formData.get("phaseId") as string
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const phaseNumber = parseInt(formData.get("phaseNumber") as string) || 1
    const icon = formData.get("icon") as string
    const frequency = formData.get("frequency") as string
    const bestFor = formData.get("bestFor") as string
    if (!phaseId) return
    await updateServicePhase(phaseId, {
      title,
      description,
      phaseNumber,
      icon: icon || undefined,
      frequency: frequency || undefined,
      bestFor: bestFor || undefined,
    })
    redirect(`/admin/services/${slug}`)
  }

  async function handleAddImage(formData: FormData) {
    "use server"
    const imageUrl = formData.get("newImageUrl") as string
    const phaseLabel = formData.get("newImageLabel") as string
    const altText = formData.get("newImageAlt") as string
    const objectPosition = formData.get("newImageObjectPosition") as string
    if (!imageUrl?.trim()) return
    await createServiceImage(service!.id, {
      imageUrl: imageUrl.trim(),
      phaseLabel: phaseLabel || undefined,
      altText: altText || undefined,
      objectPosition: objectPosition || undefined,
    })
    redirect(`/admin/services/${slug}`)
  }

  return (
    <div className="space-y-8">
      <SaveStatus saved={saved} />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/services">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Services
            </Link>
          </Button>
          <h1 className="text-xl font-heading font-bold text-brand-dark">{service.name}</h1>
        </div>
        <form action={handleDeleteService}>
          <DeleteServiceButton />
        </form>
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
              <Input id="label" name="label" defaultValue={service.label ?? ""} placeholder="e.g. Service 1" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="slug">Slug (URL / anchor)</Label>
              <Input id="slug" name="slug" defaultValue={service.slug} required pattern="[a-z0-9-]+" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="icon">Icon</Label>
              <Input id="icon" name="icon" defaultValue={service.icon ?? ""} placeholder="e.g. hard-hat, home, sparkles" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="title">Page Title</Label>
            <Input id="title" name="title" defaultValue={service.title} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="description">Description (blank line = new paragraph)</Label>
            <Textarea id="description" name="description" rows={5} defaultValue={service.description} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="targetAudienceText">Who It&apos;s For</Label>
            <Textarea
              id="targetAudienceText"
              name="targetAudienceText"
              rows={2}
              defaultValue={service.targetAudienceText ?? ""}
              placeholder="Property managers, business owners, and facility managers…"
            />
          </div>
          <SubmitButton className="bg-brand-red hover:bg-brand-red/90 text-white">
            Save Basic Info
          </SubmitButton>
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
              <li key={item.id as string} className="flex items-center gap-2">
                <form action={handleUpdateItem} className="flex-1 flex gap-2">
                  <input type="hidden" name="itemId" value={item.id as string} />
                  <Input name="text" defaultValue={item.text as string} className="flex-1 text-sm" />
                  <Button type="submit" variant="outline" size="sm">Save</Button>
                </form>
                <DeleteIncludedItemButton id={item.id as string} />
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
          Phases / Scenarios / Plans ({service.phases.length})
        </h2>
        <p className="text-xs text-muted-foreground -mt-2">
          Used for numbered phases, use-case scenarios, or pricing plans. Fill in Frequency + Best For only for plan-style cards (e.g. weekly/bi-weekly/monthly).
        </p>
        {service.phases.length > 0 && (
          <div className="space-y-3">
            {service.phases.map((phase) => (
              <form
                key={phase.id as string}
                action={handleUpdatePhase}
                className="p-4 rounded-lg border bg-gray-50 space-y-3"
              >
                <input type="hidden" name="phaseId" value={phase.id as string} />
                <div className="grid grid-cols-4 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Phase #</Label>
                    <Input name="phaseNumber" type="number" min={1} defaultValue={phase.phaseNumber as number} className="text-sm" />
                  </div>
                  <div className="col-span-2 space-y-1.5">
                    <Label className="text-xs">Title</Label>
                    <Input name="title" defaultValue={phase.title as string} className="text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Icon</Label>
                    <Input name="icon" defaultValue={(phase.icon as string) ?? ""} className="text-sm" placeholder="e.g. truck" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Description</Label>
                  <Textarea name="description" rows={2} defaultValue={phase.description as string} className="text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Frequency (plan cards only)</Label>
                    <Input name="frequency" defaultValue={(phase.frequency as string) ?? ""} className="text-sm" placeholder="e.g. Every two weeks" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Best For (plan cards only)</Label>
                    <Input name="bestFor" defaultValue={(phase.bestFor as string) ?? ""} className="text-sm" placeholder="e.g. Mid-sized offices…" />
                  </div>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <Button type="submit" variant="outline" size="sm">Save</Button>
                  <DeletePhaseButton id={phase.id as string} />
                </div>
              </form>
            ))}
          </div>
        )}
        <div className="border-t pt-4 space-y-3">
          <p className="text-xs font-medium text-gray-600">Add Phase / Scenario / Plan</p>
          <form action={handleAddPhase} className="space-y-3">
            <div className="grid grid-cols-4 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="phaseNumber" className="text-xs">Phase #</Label>
                <Input id="phaseNumber" name="phaseNumber" type="number" min={1} defaultValue={service.phases.length + 1} className="text-sm" />
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="phaseTitle" className="text-xs">Title</Label>
                <Input id="phaseTitle" name="title" placeholder="Phase title…" className="text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phaseIcon" className="text-xs">Icon</Label>
                <Input id="phaseIcon" name="icon" placeholder="e.g. truck" className="text-sm" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phaseDesc" className="text-xs">Description</Label>
              <Textarea id="phaseDesc" name="description" rows={2} placeholder="What happens in this phase…" className="text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="phaseFrequency" className="text-xs">Frequency (plan cards only)</Label>
                <Input id="phaseFrequency" name="frequency" className="text-sm" placeholder="e.g. Once per month" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phaseBestFor" className="text-xs">Best For (plan cards only)</Label>
                <Input id="phaseBestFor" name="bestFor" className="text-sm" placeholder="e.g. Warehouses, storage facilities…" />
              </div>
            </div>
            <Button type="submit" variant="outline" size="sm">Add Phase</Button>
          </form>
        </div>
      </section>

      {/* Images */}
      <section className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 border-b pb-2">
          Example Photos ({service.images.length})
        </h2>
        {service.images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.images.map((img) => (
              <div key={img.id as string} className="flex gap-3 p-3 rounded-lg border bg-gray-50">
                <div className="relative h-16 w-16 shrink-0 rounded-md overflow-hidden bg-gray-100">
                  {img.imageUrl ? (
                    <Image src={img.imageUrl as string} alt={(img.altText as string) ?? ""} fill sizes="64px" className="object-cover" />
                  ) : null}
                </div>
                <div className="flex-1 min-w-0">
                  {img.phaseLabel ? <p className="text-xs font-semibold text-brand-red uppercase">{img.phaseLabel as string}</p> : null}
                  <p className="text-xs text-muted-foreground truncate">{(img.altText as string) || (img.imageUrl as string)}</p>
                </div>
                <DeleteServiceImageButton id={img.id as string} />
              </div>
            ))}
          </div>
        )}
        <div className="border-t pt-4 space-y-3">
          <p className="text-xs font-medium text-gray-600">Add Photo</p>
          <form action={handleAddImage} className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Image</Label>
              <ImageUploadField fieldName="newImageUrl" placeholder="/images/portfolio/…" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="newImageLabel" className="text-xs">Label (shown on image)</Label>
                <Input id="newImageLabel" name="newImageLabel" placeholder="e.g. Phase 1 — Post-Construction Clean" className="text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="newImageAlt" className="text-xs">Alt Text</Label>
                <Input id="newImageAlt" name="newImageAlt" placeholder="Descriptive alt text…" className="text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="newImageObjectPosition" className="text-xs">Object Position</Label>
                <Input id="newImageObjectPosition" name="newImageObjectPosition" placeholder="center, top, bottom…" className="text-sm" />
              </div>
            </div>
            <Button type="submit" variant="outline" size="sm">Add Photo</Button>
          </form>
        </div>
      </section>
    </div>
  )
}
