import { prisma } from "@/lib/prisma"
import { saveSiteSettings } from "@/actions/settings"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { redirect } from "next/navigation"

export const metadata = { title: "Site Settings" }

export default async function SettingsPage() {
  let settings: Awaited<ReturnType<typeof prisma.siteSettings.findFirst>> = null
  try {
    settings = await prisma.siteSettings.findFirst()
  } catch (err) {
    console.error("[admin/settings] DB error:", err)
  }

  async function handleSave(formData: FormData) {
    "use server"
    await saveSiteSettings(formData)
    redirect("/admin/settings")
  }

  const v = (key: string) => ((settings as any)?.[key] ?? "") as string

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-brand-dark">Site Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Business information used across the site and emails.</p>
      </div>

      <form action={handleSave} className="bg-white rounded-lg border p-6 space-y-6">
        {/* Company */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Company Identity</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Company Name</Label>
              <Input name="companyName" defaultValue={v("companyName")} placeholder="Red & White Cleaning Services" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Legal Name</Label>
              <Input name="legalName" defaultValue={v("legalName")} placeholder="Red and White Cleaning Services LTD" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Founded Year</Label>
            <Input name="foundedYear" type="number" defaultValue={v("foundedYear")} placeholder="2020" className="w-32" />
          </div>
        </div>

        <Separator />

        {/* Contact */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Contact Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Phone</Label>
              <Input name="phone" defaultValue={v("phone")} placeholder="+1 (226) 123-4567" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Email</Label>
              <Input name="email" type="email" defaultValue={v("email")} placeholder="info@redandwhitecleaning.ca" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Street Address</Label>
              <Input name="addressStreet" defaultValue={v("addressStreet")} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">City</Label>
              <Input name="addressCity" defaultValue={v("addressCity")} placeholder="Kitchener" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Province</Label>
              <Input name="addressProvince" defaultValue={v("addressProvince")} placeholder="ON" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Postal Code</Label>
              <Input name="addressPostal" defaultValue={v("addressPostal")} placeholder="N2K 1A1" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Business Hours</Label>
            <Input name="businessHours" defaultValue={v("businessHours")} placeholder="Mon–Fri 7am–6pm, Sat 8am–4pm" />
          </div>
        </div>

        <Separator />

        {/* Social */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Social Media</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Facebook URL</Label>
              <Input name="facebook" defaultValue={v("facebook")} placeholder="https://facebook.com/..." />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Instagram URL</Label>
              <Input name="instagram" defaultValue={v("instagram")} placeholder="https://instagram.com/..." />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">LinkedIn URL</Label>
              <Input name="linkedin" defaultValue={v("linkedin")} placeholder="https://linkedin.com/company/..." />
            </div>
          </div>
        </div>

        <Separator />

        {/* Footer / Embed */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Footer & Maps</h2>
          <div className="space-y-1.5">
            <Label className="text-xs">Footer Text</Label>
            <Textarea name="footerText" defaultValue={v("footerText")} rows={3} placeholder="Licensed and insured commercial cleaning company serving Southern Ontario." />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Google Maps Embed HTML</Label>
            <Textarea name="googleMapsEmbed" defaultValue={v("googleMapsEmbed")} rows={4} className="font-mono text-xs" placeholder="<iframe src=..." />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" className="bg-brand-red hover:bg-brand-red/90 text-white">
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  )
}
