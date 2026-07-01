import { prisma } from "@/lib/prisma"
import { upsertSitemapEntry } from "@/actions/seo"
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
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { SitemapIncludedToggle, DeleteSitemapButton } from "./SitemapClient"

export const metadata = { title: "Sitemap" }

export default async function SitemapPage() {
  let entries: Awaited<ReturnType<typeof prisma.sitemapEntry.findMany>> = []
  try {
    entries = await prisma.sitemapEntry.findMany({ orderBy: { priority: "desc" } })
  } catch (err) {
    console.error("[admin/seo/sitemap] DB error:", err)
  }

  async function handleAdd(formData: FormData) {
    "use server"
    const url = formData.get("url") as string
    const priority = parseFloat(formData.get("priority") as string) || 0.5
    const changeFrequency = formData.get("changeFrequency") as string
    if (!url) return
    await upsertSitemapEntry({ url, priority, changeFrequency: changeFrequency || "monthly", included: true })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-brand-dark">Sitemap</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {entries.length} entries. If no entries exist, the sitemap uses the default static routes.
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/sitemap.xml" target="_blank">
            <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
            View Live
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border bg-white overflow-hidden">
        {entries.length === 0 ? (
          <p className="text-sm text-muted-foreground p-4">
            No custom entries. Using default static sitemap. Add URLs below to manage them.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-2 text-xs font-medium text-gray-500">URL</th>
                <th className="text-left px-4 py-2 text-xs font-medium text-gray-500">Priority</th>
                <th className="text-left px-4 py-2 text-xs font-medium text-gray-500">Frequency</th>
                <th className="text-left px-4 py-2 text-xs font-medium text-gray-500">Include</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 font-mono text-xs text-gray-700">{entry.url}</td>
                  <td className="px-4 py-2.5 text-xs text-gray-600">{entry.priority}</td>
                  <td className="px-4 py-2.5 text-xs text-gray-600">{entry.changeFrequency}</td>
                  <td className="px-4 py-2.5">
                    <SitemapIncludedToggle
                      url={entry.url}
                      priority={entry.priority}
                      changeFrequency={entry.changeFrequency}
                      included={entry.included}
                    />
                  </td>
                  <td className="px-4 py-2.5">
                    <DeleteSitemapButton id={entry.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="bg-white rounded-lg border p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">Add URL</h2>
        <form action={handleAdd} className="grid grid-cols-4 gap-3 items-end">
          <div className="col-span-2 space-y-1.5">
            <Label className="text-xs">URL Path or Full URL</Label>
            <Input name="url" placeholder="https://redandwhitecleaning.ca/services" className="text-sm" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Priority</Label>
            <Input name="priority" type="number" min="0" max="1" step="0.1" defaultValue="0.8" className="text-sm" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Change Frequency</Label>
            <Select name="changeFrequency" defaultValue="monthly">
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="always">Always</SelectItem>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-4">
            <SubmitButton className="bg-brand-red hover:bg-brand-red/90 text-white">Add URL</SubmitButton>
          </div>
        </form>
      </div>
    </div>
  )
}
