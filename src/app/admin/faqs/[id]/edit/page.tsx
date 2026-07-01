import { notFound, redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { updateFaq } from "@/actions/faqs"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/admin/SubmitButton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  const [faq, categories] = await Promise.all([
    prisma.faq.findUnique({ where: { id } }),
    prisma.faqCategory.findMany({ orderBy: { sortOrder: "asc" } }),
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
    await updateFaq(id, { question, answer, categoryId })
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
          <Select name="categoryId" defaultValue={faq.categoryId}>
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
          <Label htmlFor="question">Question</Label>
          <Input id="question" name="question" required defaultValue={faq.question} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="answer">Answer</Label>
          <Textarea id="answer" name="answer" required rows={6} defaultValue={faq.answer} />
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
