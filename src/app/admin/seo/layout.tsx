import Link from "next/link"
import { ReactNode } from "react"

const SEO_TABS = [
  { href: "/admin/seo", label: "Global" },
  { href: "/admin/seo/pages", label: "Page SEO" },
  { href: "/admin/seo/schema", label: "Schema" },
  { href: "/admin/seo/sitemap", label: "Sitemap" },
  { href: "/admin/seo/robots", label: "Robots" },
  { href: "/admin/seo/redirects", label: "Redirects" },
]

export default function SeoLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6">
      <nav className="flex gap-1 border-b pb-0 overflow-x-auto">
        {SEO_TABS.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-brand-red whitespace-nowrap border-b-2 border-transparent hover:border-brand-red/50 transition-colors -mb-px"
          >
            {tab.label}
          </Link>
        ))}
      </nav>
      <div>{children}</div>
    </div>
  )
}
