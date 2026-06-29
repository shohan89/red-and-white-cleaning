import { prisma } from "@/lib/prisma"
import { saveGlobalSeo } from "@/actions/seo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export const metadata = { title: "Global SEO" }

export default async function GlobalSeoPage() {
  let seo: Awaited<ReturnType<typeof prisma.globalSeo.findFirst>> = null
  try {
    seo = await prisma.globalSeo.findFirst()
  } catch (err) {
    console.error("[admin/seo] DB error:", err)
  }

  async function handleSave(formData: FormData) {
    "use server"
    await saveGlobalSeo({
      siteName: formData.get("siteName") as string,
      siteUrl: formData.get("siteUrl") as string,
      defaultTitleTemplate: formData.get("defaultTitleTemplate") as string,
      defaultMetaDesc: formData.get("defaultMetaDesc") as string,
      defaultOgImage: formData.get("defaultOgImage") as string,
      brandName: formData.get("brandName") as string,
      businessPhone: formData.get("businessPhone") as string,
      businessEmail: formData.get("businessEmail") as string,
      businessAddress: formData.get("businessAddress") as string,
      ga4Id: formData.get("ga4Id") as string,
      gscVerification: formData.get("gscVerification") as string,
      gtmId: formData.get("gtmId") as string,
      googleBusinessUrl: formData.get("googleBusinessUrl") as string,
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-brand-dark">Global SEO</h1>

      <form action={handleSave} className="space-y-6">
        <section className="bg-white rounded-lg border p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 border-b pb-2">Site Identity</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="siteName">Site Name</Label>
              <Input id="siteName" name="siteName" defaultValue={seo?.siteName ?? ""} placeholder="Red and White Cleaning Services" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="brandName">Brand Name</Label>
              <Input id="brandName" name="brandName" defaultValue={seo?.brandName ?? ""} placeholder="Red & White Cleaning" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="siteUrl">Site URL</Label>
            <Input id="siteUrl" name="siteUrl" defaultValue={seo?.siteUrl ?? ""} placeholder="https://redandwhitecleaning.ca" />
          </div>
        </section>

        <section className="bg-white rounded-lg border p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 border-b pb-2">Default Meta</h2>
          <div className="space-y-1.5">
            <Label htmlFor="defaultTitleTemplate">Title Template</Label>
            <Input id="defaultTitleTemplate" name="defaultTitleTemplate" defaultValue={seo?.defaultTitleTemplate ?? ""} placeholder="%s | Red and White Cleaning Services" />
            <p className="text-xs text-muted-foreground">Use %s for the page title</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="defaultMetaDesc">Default Meta Description</Label>
            <Textarea id="defaultMetaDesc" name="defaultMetaDesc" rows={3} defaultValue={seo?.defaultMetaDesc ?? ""} placeholder="Commercial and construction cleaning across KW Region and Southern Ontario." />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="defaultOgImage">Default OG Image URL</Label>
            <Input id="defaultOgImage" name="defaultOgImage" defaultValue={seo?.defaultOgImage ?? ""} placeholder="/images/og-default.jpg" />
          </div>
        </section>

        <section className="bg-white rounded-lg border p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 border-b pb-2">Business Info (for Schema)</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="businessPhone">Phone</Label>
              <Input id="businessPhone" name="businessPhone" defaultValue={seo?.businessPhone ?? ""} placeholder="519-574-1552" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="businessEmail">Email</Label>
              <Input id="businessEmail" name="businessEmail" defaultValue={seo?.businessEmail ?? ""} placeholder="redandwhiteclean@gmail.com" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="businessAddress">Address</Label>
            <Input id="businessAddress" name="businessAddress" defaultValue={seo?.businessAddress ?? ""} placeholder="Kitchener, ON, Canada" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="googleBusinessUrl">Google Business Profile URL</Label>
            <Input id="googleBusinessUrl" name="googleBusinessUrl" defaultValue={seo?.googleBusinessUrl ?? ""} placeholder="https://g.page/..." />
          </div>
        </section>

        <section className="bg-white rounded-lg border p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 border-b pb-2">Google Integrations</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="ga4Id">GA4 Measurement ID</Label>
              <Input id="ga4Id" name="ga4Id" defaultValue={seo?.ga4Id ?? ""} placeholder="G-XXXXXXXXXX" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="gtmId">GTM Container ID</Label>
              <Input id="gtmId" name="gtmId" defaultValue={seo?.gtmId ?? ""} placeholder="GTM-XXXXXXX" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="gscVerification">Google Search Console Verification</Label>
            <Input id="gscVerification" name="gscVerification" defaultValue={seo?.gscVerification ?? ""} placeholder="google-site-verification=..." />
          </div>
        </section>

        <Button type="submit" className="bg-brand-red hover:bg-brand-red/90 text-white w-full">
          Save Global SEO Settings
        </Button>
      </form>
    </div>
  )
}
