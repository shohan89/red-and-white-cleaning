import { prisma } from "@/lib/prisma"
import { savePageContent } from "@/actions/content"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { redirect } from "next/navigation"

export const metadata = { title: "Page: Contact" }

export default async function ContactContentPage() {
  let records: Awaited<ReturnType<typeof prisma.pageContent.findMany>> = []
  try {
    records = await prisma.pageContent.findMany({ where: { pageKey: "contact" } })
  } catch (err) {
    console.error("[admin/content/contact] DB error:", err)
  }
  const content: Record<string, Record<string, string>> = {}
  for (const r of records) {
    content[r.sectionKey] = r.content as Record<string, string>
  }

  const hero = content.hero ?? {}

  async function saveHero(formData: FormData) {
    "use server"
    await savePageContent("contact", "hero", {
      heading: formData.get("heading") as string,
      subheading: formData.get("subheading") as string,
    })
    redirect("/admin/content/contact")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-brand-dark">Page: Contact</h1>
        <p className="text-sm text-muted-foreground mt-1">Edit the contact page header. Phone, email, and address are managed in Site Settings.</p>
      </div>

      {/* Hero */}
      <form action={saveHero} className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 border-b pb-2">Page Header</h2>
        <div className="space-y-1.5">
          <Label className="text-xs">Heading</Label>
          <Textarea
            name="heading"
            rows={2}
            defaultValue={hero.heading ?? "Get in Touch"}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Subheading</Label>
          <Textarea
            name="subheading"
            rows={3}
            defaultValue={hero.subheading ?? "Whether you need a post-construction quote, want to discuss a commercial cleaning contract, or have a general inquiry, our team is ready to help."}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="bg-brand-red hover:bg-brand-red/90 text-white">Save Header</Button>
        </div>
      </form>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <p className="font-medium mb-1">Phone, email & address</p>
        <p className="text-blue-700 mb-3">Contact details shown on this page are pulled from Site Settings.</p>
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/settings" className="inline-flex items-center gap-1">
            Go to Site Settings <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
