import { redirect } from "next/navigation"
import { createService } from "@/actions/services"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/admin/SubmitButton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export const metadata = { title: "New Service" }

export default function NewServicePage() {
  async function handleCreate(formData: FormData) {
    "use server"
    const name = formData.get("name") as string
    const slug = formData.get("slug") as string
    const title = formData.get("title") as string
    const label = formData.get("label") as string
    const icon = formData.get("icon") as string
    const description = formData.get("description") as string
    const targetAudienceText = formData.get("targetAudienceText") as string

    if (!name || !slug || !title || !description) return
    const created = await createService({
      name,
      slug,
      title,
      label: label || undefined,
      icon: icon || undefined,
      description,
      targetAudienceText: targetAudienceText || undefined,
    })
    redirect(`/admin/services/${created.slug}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/services">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Services
          </Link>
        </Button>
        <h1 className="text-xl font-heading font-bold text-brand-dark">New Service</h1>
      </div>

      <form action={handleCreate} className="space-y-5 bg-white rounded-lg border p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Service Name *</Label>
            <Input id="name" name="name" required placeholder="e.g. Window Cleaning" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="label">Short Label</Label>
            <Input id="label" name="label" placeholder="e.g. Service 6" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="slug">Slug (URL / anchor) *</Label>
            <Input id="slug" name="slug" required pattern="[a-z0-9-]+" placeholder="window-cleaning" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="icon">Icon</Label>
            <Input id="icon" name="icon" placeholder="e.g. sparkles" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="title">Page Title *</Label>
          <Input id="title" name="title" required placeholder="e.g. Professional Window Cleaning" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="description">Description *</Label>
          <Textarea id="description" name="description" rows={5} required placeholder="Describe this service…" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="targetAudienceText">Who It&apos;s For</Label>
          <Textarea id="targetAudienceText" name="targetAudienceText" rows={2} placeholder="Property managers, business owners…" />
        </div>
        <div className="flex gap-3 pt-2">
          <SubmitButton className="bg-brand-red hover:bg-brand-red/90 text-white">
            Create Service
          </SubmitButton>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/services">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
