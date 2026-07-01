import { prisma } from "@/lib/prisma"
import { savePageContent } from "@/actions/content"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { redirect } from "next/navigation"
import { SaveStatus } from "@/components/admin/SaveStatus"

export const metadata = { title: "Page: Home" }

export default async function HomeContentPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>
}) {
  const sp = await searchParams
  let records: Awaited<ReturnType<typeof prisma.pageContent.findMany>> = []
  try {
    records = await prisma.pageContent.findMany({ where: { pageKey: "home" } })
  } catch (err) {
    console.error("[admin/content/home] DB error:", err)
  }
  const content: Record<string, Record<string, string>> = {}
  for (const r of records) {
    content[r.sectionKey] = r.content as Record<string, string>
  }

  const hero = content.hero ?? {}
  const cta = content.cta ?? {}
  const trust = content.trust ?? {}

  async function saveHero(formData: FormData) {
    "use server"
    const result = await savePageContent("home", "hero", {
      heading: formData.get("heading") as string,
      subheading: formData.get("subheading") as string,
      cta1Text: formData.get("cta1Text") as string,
      cta2Text: formData.get("cta2Text") as string,
    })
    if (result?.error) redirect("/admin/content/home?error=1")
    redirect("/admin/content/home?saved=hero")
  }

  async function saveTrust(formData: FormData) {
    "use server"
    const result = await savePageContent("home", "trust", {
      signal1: formData.get("signal1") as string,
      signal2: formData.get("signal2") as string,
      signal3: formData.get("signal3") as string,
    })
    if (result?.error) redirect("/admin/content/home?error=1")
    redirect("/admin/content/home?saved=trust")
  }

  async function saveCta(formData: FormData) {
    "use server"
    const result = await savePageContent("home", "cta", {
      heading: formData.get("heading") as string,
      subheading: formData.get("subheading") as string,
    })
    if (result?.error) redirect("/admin/content/home?error=1")
    redirect("/admin/content/home?saved=cta")
  }

  return (
    <div className="space-y-6">
      <SaveStatus saved={sp.saved} error={!!sp.error} />
      <div>
        <h1 className="text-2xl font-heading font-bold text-brand-dark">Page: Home</h1>
        <p className="text-sm text-muted-foreground mt-1">Edit the home page hero, trust signals, and CTA banner.</p>
      </div>

      {/* Hero Section */}
      <form action={saveHero} className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 border-b pb-2">Hero Section</h2>
        <div className="space-y-1.5">
          <Label className="text-xs">Heading</Label>
          <Textarea
            name="heading"
            rows={2}
            defaultValue={hero.heading ?? "Commercial & Construction Cleaning Done Right — Across KW, Guelph, Hamilton, London and Brantford"}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Subheading</Label>
          <Textarea
            name="subheading"
            rows={3}
            defaultValue={hero.subheading ?? "We clean construction sites, commercial spaces, and everything in between. Fast, thorough, and built for contractors and property managers who need it done properly."}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Primary CTA Text</Label>
            <Input name="cta1Text" defaultValue={hero.cta1Text ?? "Get a Free Quote"} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Secondary CTA Text</Label>
            <Input name="cta2Text" defaultValue={hero.cta2Text ?? "See Our Work"} />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="bg-brand-red hover:bg-brand-red/90 text-white">Save Hero</Button>
        </div>
      </form>

      <Separator />

      {/* Trust Signals */}
      <form action={saveTrust} className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 border-b pb-2">Trust Signals (below hero buttons)</h2>
        <div className="space-y-1.5">
          <Label className="text-xs">Signal 1</Label>
          <Input name="signal1" defaultValue={trust.signal1 ?? "Fully Licensed & Insured"} />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Signal 2</Label>
          <Input name="signal2" defaultValue={trust.signal2 ?? "Free Quotes — No Obligation"} />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Signal 3</Label>
          <Input name="signal3" defaultValue={trust.signal3 ?? "Response Within 1 Business Day"} />
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="bg-brand-red hover:bg-brand-red/90 text-white">Save Trust Signals</Button>
        </div>
      </form>

      <Separator />

      {/* CTA Banner */}
      <form action={saveCta} className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 border-b pb-2">Bottom CTA Banner</h2>
        <div className="space-y-1.5">
          <Label className="text-xs">Heading</Label>
          <Input name="heading" defaultValue={cta.heading ?? "Ready to Get a Clean Site?"} />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Subheading</Label>
          <Textarea
            name="subheading"
            rows={2}
            defaultValue={cta.subheading ?? "Whether it's a one-time post-construction clean or an ongoing commercial contract — we're ready when you are."}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="bg-brand-red hover:bg-brand-red/90 text-white">Save CTA Banner</Button>
        </div>
      </form>
    </div>
  )
}
