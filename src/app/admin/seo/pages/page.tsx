import { prisma } from "@/lib/prisma"
import { PageSeoEditor } from "./PageSeoClient"

export const metadata = { title: "Page SEO" }

const PAGES = [
  { key: "home", label: "Home", path: "/" },
  { key: "services", label: "Services", path: "/services" },
  { key: "portfolio", label: "Portfolio", path: "/portfolio" },
  { key: "faq", label: "FAQ", path: "/faq" },
  { key: "about", label: "About", path: "/about" },
  { key: "contact", label: "Contact", path: "/contact" },
  { key: "privacy", label: "Privacy Policy", path: "/privacy" },
]

export default async function PageSeoPage() {
  const [seoRecords, globalSeo] = await Promise.all([
    prisma.pageSeo.findMany(),
    prisma.globalSeo.findFirst(),
  ])

  const seoByKey = Object.fromEntries(seoRecords.map((s) => [s.pageKey, s]))
  const baseUrl = globalSeo?.siteUrl ?? "https://redandwhitecleaning.ca"

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-heading font-bold text-brand-dark">Page SEO</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Click a page to expand and edit its meta title, description, and Open Graph settings.
        </p>
      </div>

      <div className="space-y-2">
        {PAGES.map((page) => (
          <PageSeoEditor
            key={page.key}
            page={page}
            seo={seoByKey[page.key]}
            baseUrl={baseUrl}
          />
        ))}
      </div>
    </div>
  )
}
