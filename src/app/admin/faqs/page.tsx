import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil } from "lucide-react"
import { PublishToggle, DeleteFaqButton } from "./FaqsClient"

export const metadata = { title: "FAQs" }

export default async function FaqsPage() {
  const categories = await prisma.faqCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      faqs: { orderBy: { sortOrder: "asc" } },
    },
  })

  const totalFaqs = categories.reduce((sum, c) => sum + c.faqs.length, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-brand-dark">FAQs</h1>
          <p className="text-sm text-muted-foreground">{totalFaqs} total</p>
        </div>
        <Button asChild className="bg-brand-red hover:bg-brand-red/90 text-white">
          <Link href="/admin/faqs/new">
            <Plus className="h-4 w-4 mr-2" />
            New FAQ
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        {categories.map((cat) => (
          <div key={cat.id} className="rounded-lg border bg-white overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-sm text-gray-900">{cat.name}</h2>
                <Badge variant="secondary" className="text-xs">
                  {cat.faqs.length}
                </Badge>
              </div>
            </div>
            {cat.faqs.length === 0 ? (
              <p className="text-sm text-muted-foreground p-4">No FAQs in this category.</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {cat.faqs.map((faq) => (
                  <li key={faq.id} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 group">
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${!faq.published ? "text-muted-foreground" : "text-gray-900"}`}>
                        {faq.question}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{faq.answer}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <PublishToggle id={faq.id} published={faq.published} />
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/faqs/${faq.id}/edit`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <DeleteFaqButton id={faq.id} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {categories.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-10">
            No FAQ categories yet. Seed the database to get started.
          </p>
        )}
      </div>
    </div>
  )
}
