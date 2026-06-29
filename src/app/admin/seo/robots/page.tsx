import { prisma } from "@/lib/prisma"
import { saveRobotsConfig } from "@/actions/seo"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

export const metadata = { title: "Robots.txt" }

const DEFAULT_ROBOTS = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /auth/
Disallow: /api/

Sitemap: https://redandwhitecleaning.ca/sitemap.xml`

export default async function RobotsPage() {
  let config: Awaited<ReturnType<typeof prisma.robotsConfig.findFirst>> = null
  try {
    config = await prisma.robotsConfig.findFirst()
  } catch (err) {
    console.error("[admin/seo/robots] DB error:", err)
  }

  async function handleSave(formData: FormData) {
    "use server"
    await saveRobotsConfig(formData.get("content") as string)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold text-brand-dark">Robots.txt</h1>
        <Button variant="outline" size="sm" asChild>
          <Link href="/robots.txt" target="_blank">
            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
            View Live
          </Link>
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Controls which pages search engines can crawl. Changes take effect immediately.
      </p>

      <form action={handleSave} className="space-y-4">
        <Textarea
          name="content"
          rows={16}
          defaultValue={config?.content ?? DEFAULT_ROBOTS}
          className="font-mono text-sm"
        />
        <Button type="submit" className="bg-brand-red hover:bg-brand-red/90 text-white">
          Save Robots.txt
        </Button>
      </form>
    </div>
  )
}
