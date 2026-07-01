import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { createRedirect } from "@/actions/seo"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/admin/SubmitButton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { DeleteRedirectButton } from "./RedirectsClient"

export const metadata = { title: "Redirects" }

export default async function RedirectsPage() {
  let redirects: Awaited<ReturnType<typeof prisma.redirect.findMany>> = []
  try {
    redirects = await prisma.redirect.findMany({ orderBy: { createdAt: "desc" } })
  } catch (err) {
    console.error("[admin/seo/redirects] DB error:", err)
  }

  async function handleCreate(formData: FormData) {
    "use server"
    const source = formData.get("source") as string
    const destination = formData.get("destination") as string
    const type = parseInt(formData.get("type") as string) || 301
    if (!source || !destination) return
    await createRedirect({ source, destination, type })
    redirect("/admin/seo/redirects")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-brand-dark">Redirects</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {redirects.length} redirect{redirects.length !== 1 ? "s" : ""}. Applied via middleware at runtime — no rebuild needed.
        </p>
      </div>

      {/* Existing redirects */}
      <div className="rounded-lg border bg-white overflow-hidden">
        {redirects.length === 0 ? (
          <p className="text-sm text-muted-foreground p-4">No redirects configured.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {redirects.map((r) => (
              <li key={r.id} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1 flex items-center gap-2 min-w-0 text-sm">
                  <code className="text-gray-700 truncate">{r.source}</code>
                  <ArrowRight className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                  <code className="text-gray-700 truncate">{r.destination}</code>
                </div>
                <Badge variant={r.type === 301 ? "default" : "secondary"} className="shrink-0 text-xs">
                  {r.type}
                </Badge>
                <DeleteRedirectButton id={r.id} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add redirect form */}
      <div className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">Add Redirect</h2>
        <form action={handleCreate} className="space-y-4">
          <div className="grid grid-cols-5 gap-3 items-end">
            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="source" className="text-xs">Source Path</Label>
              <Input id="source" name="source" required placeholder="/old-page" className="text-sm" />
            </div>
            <div className="flex justify-center pb-2">
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="destination" className="text-xs">Destination</Label>
              <Input id="destination" name="destination" required placeholder="/new-page" className="text-sm" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="space-y-1.5 w-32">
              <Label className="text-xs">Type</Label>
              <Select name="type" defaultValue="301">
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="301">301 — Permanent</SelectItem>
                  <SelectItem value="302">302 — Temporary</SelectItem>
                  <SelectItem value="410">410 — Gone</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="pt-5">
              <SubmitButton className="bg-brand-red hover:bg-brand-red/90 text-white">
                Add Redirect
              </SubmitButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
