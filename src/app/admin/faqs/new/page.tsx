import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { createFaq } from "@/actions/faqs"
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

export const metadata = { title: "New FAQ" }

export default async function NewFaqPage() {
  let categories: Array<{ id: string; name: string }> = []
  try {
    categories = await prisma.faqCategory.findMany({ orderBy: { sortOrder: "asc" } })
  } catch (err) {
    console.error("[admin/faqs/new] DB error:", err)
  }

  async function handleCreate(formData: FormData) {
    "use server"
    const question = formData.get("question") as string
    const answer = formData.get("answer") as string
    const categoryId = formData.get("categoryId") as string
    if (!question || !answer || !categoryId) return
    await createFaq({ question, answer, categoryId, published: true })
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
        <h1 className="text-xl font-heading font-bold text-brand-dark">New FAQ</h1>
      </div>

      <form action={handleCreate} className="space-y-4 bg-white rounded-lg border p-6">
        <div className="space-y-1.5">
          <Label htmlFor="categoryId">Category</Label>
          <Select name="categoryId" required>
            <SelectTrigger>
              <SelectValue placeholder="Select category…" />
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
          <Input id="question" name="question" required placeholder="What is…" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="answer">Answer</Label>
          <Textarea id="answer" name="answer" required rows={6} placeholder="The answer…" />
        </div>

        <div className="flex gap-3 pt-2">
          <SubmitButton className="bg-brand-red hover:bg-brand-red/90 text-white">
            Create FAQ
          </SubmitButton>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/faqs">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
