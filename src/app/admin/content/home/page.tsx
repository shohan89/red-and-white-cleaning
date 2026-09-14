import { prisma } from "@/lib/prisma"
import { savePageContent } from "@/actions/content"
import { SubmitButton } from "@/components/admin/SubmitButton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ImageUploadField } from "@/components/admin/portfolio/ImageUploadField"
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
  const whyChooseUs = content.whyChooseUs ?? {}
  const faqPreview = content.faqPreview ?? {}

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
      buttonText: formData.get("buttonText") as string,
    })
    if (result?.error) redirect("/admin/content/home?error=1")
    redirect("/admin/content/home?saved=cta")
  }

  async function saveWhyChooseUs(formData: FormData) {
    "use server"
    const result = await savePageContent("home", "whyChooseUs", {
      eyebrow: formData.get("eyebrow") as string,
      title: formData.get("title") as string,
      image: formData.get("image") as string,
      imageAlt: formData.get("imageAlt") as string,
      quoteText: formData.get("quoteText") as string,
      quoteAttribution: formData.get("quoteAttribution") as string,
      badgeNumber: formData.get("badgeNumber") as string,
      badgeLabel: formData.get("badgeLabel") as string,
      buttonText: formData.get("buttonText") as string,
      feature1Icon: formData.get("feature1Icon") as string,
      feature1Title: formData.get("feature1Title") as string,
      feature1Desc: formData.get("feature1Desc") as string,
      feature2Icon: formData.get("feature2Icon") as string,
      feature2Title: formData.get("feature2Title") as string,
      feature2Desc: formData.get("feature2Desc") as string,
      feature3Icon: formData.get("feature3Icon") as string,
      feature3Title: formData.get("feature3Title") as string,
      feature3Desc: formData.get("feature3Desc") as string,
    })
    if (result?.error) redirect("/admin/content/home?error=1")
    redirect("/admin/content/home?saved=whyChooseUs")
  }

  async function saveFaqPreview(formData: FormData) {
    "use server"
    const result = await savePageContent("home", "faqPreview", {
      eyebrow: formData.get("eyebrow") as string,
      title: formData.get("title") as string,
      subtext: formData.get("subtext") as string,
    })
    if (result?.error) redirect("/admin/content/home?error=1")
    redirect("/admin/content/home?saved=faqPreview")
  }

  return (
    <div className="space-y-6">
      <SaveStatus saved={sp.saved} error={!!sp.error} />
      <div>
        <h1 className="text-2xl font-heading font-bold text-brand-dark">Page: Home</h1>
        <p className="text-sm text-muted-foreground mt-1">Edit the home page hero, trust signals, Why Choose Us section, FAQ preview, and final CTA banner.</p>
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
          <SubmitButton className="bg-brand-red hover:bg-brand-red/90 text-white">Save Hero</SubmitButton>
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
          <SubmitButton className="bg-brand-red hover:bg-brand-red/90 text-white">Save Trust Signals</SubmitButton>
        </div>
      </form>

      <Separator />

      {/* Why Choose Us */}
      <form action={saveWhyChooseUs} className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 border-b pb-2">Why Choose Us Section</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Eyebrow</Label>
            <Input name="eyebrow" defaultValue={whyChooseUs.eyebrow ?? "Why Choose Us"} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Title</Label>
            <Input name="title" defaultValue={whyChooseUs.title ?? "Why Clients Keep Calling Us Back"} />
          </div>
        </div>

        <div className="border-t pt-4 space-y-1.5">
          <Label className="text-xs">Panel Image</Label>
          <ImageUploadField fieldName="image" defaultValue={whyChooseUs.image ?? "/images/why-choose-us.webp"} />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Image Alt Text</Label>
          <Input name="imageAlt" defaultValue={whyChooseUs.imageAlt ?? "Professional commercial cleaner polishing a glass wall"} />
        </div>

        <div className="border-t pt-4 space-y-1.5">
          <Label className="text-xs">Quote (over image)</Label>
          <Textarea
            name="quoteText"
            rows={2}
            defaultValue={whyChooseUs.quoteText ?? "We understand the demands of commercial and construction projects — tight deadlines, strict site requirements, and zero tolerance for missed details."}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Quote Attribution</Label>
          <Input name="quoteAttribution" defaultValue={whyChooseUs.quoteAttribution ?? "Red & White Cleaning Services LTD"} />
        </div>

        <div className="border-t pt-4 grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Badge Number</Label>
            <Input name="badgeNumber" defaultValue={whyChooseUs.badgeNumber ?? "10+"} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Badge Label</Label>
            <Input name="badgeLabel" defaultValue={whyChooseUs.badgeLabel ?? "Years Trusted"} />
          </div>
        </div>

        <div className="border-t pt-4 space-y-1.5">
          <Label className="text-xs">Button Text</Label>
          <Input name="buttonText" defaultValue={whyChooseUs.buttonText ?? "Get Your Free Quote"} />
        </div>

        <div className="border-t pt-4 space-y-4">
          <p className="text-xs font-medium text-gray-600">Feature 1</p>
          <div className="grid grid-cols-3 gap-3">
            <Input name="feature1Icon" placeholder="icon (users, hard-hat, calendar-clock)" defaultValue={whyChooseUs.feature1Icon ?? "users"} className="text-sm" />
            <Input name="feature1Title" placeholder="Title" defaultValue={whyChooseUs.feature1Title ?? "We Show Up and We Do the Work"} className="col-span-2 text-sm" />
          </div>
          <Textarea name="feature1Desc" rows={2} className="text-sm" defaultValue={whyChooseUs.feature1Desc ?? "No subcontractors, no surprises. When you hire Red and White, you get our team on-site — people who take pride in what they do and get the job done right the first time."} />
        </div>

        <div className="border-t pt-4 space-y-4">
          <p className="text-xs font-medium text-gray-600">Feature 2</p>
          <div className="grid grid-cols-3 gap-3">
            <Input name="feature2Icon" placeholder="icon" defaultValue={whyChooseUs.feature2Icon ?? "hard-hat"} className="text-sm" />
            <Input name="feature2Title" placeholder="Title" defaultValue={whyChooseUs.feature2Title ?? "We Know Construction Sites"} className="col-span-2 text-sm" />
          </div>
          <Textarea name="feature2Desc" rows={2} className="text-sm" defaultValue={whyChooseUs.feature2Desc ?? "Post-construction cleanup is different from regular cleaning. Concrete dust, drywall residue, adhesive on windows — we know what to look for and how to handle it."} />
        </div>

        <div className="border-t pt-4 space-y-4">
          <p className="text-xs font-medium text-gray-600">Feature 3</p>
          <div className="grid grid-cols-3 gap-3">
            <Input name="feature3Icon" placeholder="icon" defaultValue={whyChooseUs.feature3Icon ?? "calendar-clock"} className="text-sm" />
            <Input name="feature3Title" placeholder="Title" defaultValue={whyChooseUs.feature3Title ?? "We Work Around Your Schedule"} className="col-span-2 text-sm" />
          </div>
          <Textarea name="feature3Desc" rows={2} className="text-sm" defaultValue={whyChooseUs.feature3Desc ?? "Contractors and property managers have tight timelines. We adapt to yours, including early mornings, evenings, and weekends when needed."} />
        </div>

        <div className="flex justify-end">
          <SubmitButton className="bg-brand-red hover:bg-brand-red/90 text-white">Save Why Choose Us</SubmitButton>
        </div>
      </form>

      <Separator />

      {/* FAQ Preview */}
      <form action={saveFaqPreview} className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 border-b pb-2">FAQ Preview Section</h2>
        <p className="text-xs text-muted-foreground -mt-2">
          Shows the first 4 published FAQs (by sort order) from the FAQs section below.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Eyebrow</Label>
            <Input name="eyebrow" defaultValue={faqPreview.eyebrow ?? "Frequently Asked Questions"} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Title</Label>
            <Input name="title" defaultValue={faqPreview.title ?? "Common Questions"} />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Subtext (before "Contact us directly" link)</Label>
          <Input name="subtext" defaultValue={faqPreview.subtext ?? "Can't find your answer?"} />
        </div>
        <div className="flex justify-end">
          <SubmitButton className="bg-brand-red hover:bg-brand-red/90 text-white">Save FAQ Preview</SubmitButton>
        </div>
      </form>

      <Separator />

      {/* CTA Banner */}
      <form action={saveCta} className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900 border-b pb-2">Bottom CTA Banner (Final CTA)</h2>
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
        <div className="space-y-1.5">
          <Label className="text-xs">Button Text</Label>
          <Input name="buttonText" defaultValue={cta.buttonText ?? "Get a Free Quote"} />
        </div>
        <div className="flex justify-end">
          <SubmitButton className="bg-brand-red hover:bg-brand-red/90 text-white">Save CTA Banner</SubmitButton>
        </div>
      </form>
    </div>
  )
}
