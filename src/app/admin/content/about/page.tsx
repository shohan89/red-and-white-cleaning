import { prisma } from "@/lib/prisma"
import { savePageContent } from "@/actions/content"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { redirect } from "next/navigation"

export const metadata = { title: "Page: About" }

export default async function AboutContentPage() {
  const records = await prisma.pageContent.findMany({ where: { pageKey: "about" } })
  const content: Record<string, Record<string, string>> = {}
  for (const r of records) {
    content[r.sectionKey] = r.content as Record<string, string>
  }

  const hero = content.hero ?? {}
  const story = content.story ?? {}

  async function saveHero(formData: FormData) {
    "use server"
    await savePageContent("about", "hero", {
      heading: formData.get("heading") as string,
      subheading: formData.get("subheading") as string,
    })
    redirect("/admin/content/about")
  }

  async function saveStory(formData: FormData) {
    "use server"
    await savePageContent("about", "story", {
      title: formData.get("title") as string,
      body: formData.get("body") as string,
    })
    redirect("/admin/content/about")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-brand-dark">Page: About</h1>
        <p className="text-sm text-muted-foreground mt-1">Edit the about page header and our story section.</p>
      </div>

      {/* Hero */}
      <form action={saveHero} className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 border-b pb-2">Page Header</h2>
        <div className="space-y-1.5">
          <Label className="text-xs">Heading</Label>
          <Textarea
            name="heading"
            rows={2}
            defaultValue={hero.heading ?? "We're a Commercial and Construction Cleaning Company That Gets It Done"}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Subheading</Label>
          <Textarea
            name="subheading"
            rows={3}
            defaultValue={hero.subheading ?? "Red and White Cleaning Services LTD is a locally operated cleaning company based in the KW Region, serving contractors, property managers, and businesses across Southern Ontario."}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="bg-brand-red hover:bg-brand-red/90 text-white">Save Header</Button>
        </div>
      </form>

      <Separator />

      {/* Our Story */}
      <form action={saveStory} className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 border-b pb-2">Our Story Section</h2>
        <div className="space-y-1.5">
          <Label className="text-xs">Section Title</Label>
          <Input name="title" defaultValue={story.title ?? "Our Story"} />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Story Body (plain text, paragraph breaks preserved)</Label>
          <Textarea
            name="body"
            rows={8}
            defaultValue={story.body ?? `Red and White Cleaning Services was built on a simple idea: do the job properly, treat clients with respect, and show up when you say you will.

Our team founded the company after seeing firsthand how many cleaning contractors cut corners — leaving construction sites with hidden dust, smeared windows, and missed areas that caused problems down the line.

Today, we specialize in post-construction and commercial cleaning across the KW Region, Guelph, Hamilton, London, Brantford, and the communities around them.`}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="bg-brand-red hover:bg-brand-red/90 text-white">Save Story</Button>
        </div>
      </form>
    </div>
  )
}
