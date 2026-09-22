import { notFound, redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { updateFaq } from "@/actions/faqs"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/admin/SubmitButton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export const metadata = { title: "Edit FAQ" }

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [faq, categories, services] = await Promise.all([
    prisma.faq.findUnique({ where: { id } }),
    prisma.faqCategory.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.service.findMany({ orderBy: { sortOrder: "asc" }, select: { id: true, name: true } }),
  ]).catch((err: unknown) => {
    console.error("[admin/faqs/edit] DB error:", err)
    throw err
  })

  if (!faq) notFound()

  async function handleUpdate(formData: FormData) {
    "use server"
    const question = formData.get("question") as string
    const answer = formData.get("answer") as string
    const categoryId = formData.get("categoryId") as string
    const serviceId = formData.get("serviceId") as string
    const featuredOnHome = formData.get("featuredOnHome") === "on"
    await updateFaq(id, {
      question,
      answer,
      categoryId,
      serviceId: serviceId && serviceId !== "none" ? serviceId : null,
      featuredOnHome,
    })
    redirect("/admin/faqs")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/faqs">
            <ChevronLeft className="h-4 w-4 mr-1" />
            FAQs
          </Link>
        </Button>
        <h1 className="text-xl font-heading font-bold text-brand-dark">Edit FAQ</h1>
      </div>

      <form action={handleUpdate} className="space-y-4 bg-white rounded-lg border p-6">
        <div className="space-y-1.5">
          <Label htmlFor="categoryId">Category</Label>
          <Select
            name="categoryId"
            defaultValue={faq.categoryId}
            items={Object.fromEntries(categories.map((cat) => [cat.id, cat.name]))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="serviceId">Service (optional)</Label>
          <Select
            name="serviceId"
            defaultValue={(faq.serviceId as string | null) ?? "none"}
            items={{ none: "— None —", ...Object.fromEntries(services.map((s) => [s.id, s.name])) }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">— None —</SelectItem>
              {services.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            If set, this FAQ also appears on that service&apos;s individual page.
          </p>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="question">Question</Label>
          <Input id="question" name="question" required defaultValue={faq.question} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="answer">Answer</Label>
          <Textarea id="answer" name="answer" required rows={6} defaultValue={faq.answer} />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="featuredOnHome" name="featuredOnHome" defaultChecked={faq.featuredOnHome} />
          <Label htmlFor="featuredOnHome" className="cursor-pointer">
            Show on homepage FAQ preview
          </Label>
        </div>

        <div className="flex gap-3 pt-2">
          <SubmitButton className="bg-brand-red hover:bg-brand-red/90 text-white">
            Save Changes
          </SubmitButton>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/faqs">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
