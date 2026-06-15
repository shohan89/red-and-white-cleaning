"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Images,
  FolderOpen,
  Wrench,
  HelpCircle,
  Home,
  Info,
  FileText,
  Phone,
  ImageIcon,
  Globe,
  FileSearch,
  Code2,
  Map,
  Bot,
  ArrowRightLeft,
  Sparkles,
  BarChart3,
  Settings,
  UserCog,
} from "lucide-react"

const NAV_SECTIONS = [
  {
    label: null,
    items: [
      { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    label: "CRM",
    items: [
      { title: "Leads", href: "/admin/leads", icon: Users },
    ],
  },
  {
    label: "Content",
    items: [
      { title: "Portfolio", href: "/admin/portfolio", icon: Images },
      { title: "Categories", href: "/admin/categories", icon: FolderOpen },
      { title: "Services", href: "/admin/services", icon: Wrench },
      { title: "FAQs", href: "/admin/faqs", icon: HelpCircle },
      { title: "Page: Home", href: "/admin/content/home", icon: Home },
      { title: "Page: About", href: "/admin/content/about", icon: Info },
      { title: "Page: Services", href: "/admin/content/services", icon: FileText },
      { title: "Page: Contact", href: "/admin/content/contact", icon: Phone },
    ],
  },
  {
    label: "Media",
    items: [
      { title: "Media Library", href: "/admin/media", icon: ImageIcon },
    ],
  },
  {
    label: "SEO",
    items: [
      { title: "Global SEO", href: "/admin/seo", icon: Globe },
      { title: "Page SEO", href: "/admin/seo/pages", icon: FileSearch },
      { title: "Schema", href: "/admin/seo/schema", icon: Code2 },
      { title: "Sitemap", href: "/admin/seo/sitemap", icon: Map },
      { title: "Robots", href: "/admin/seo/robots", icon: Bot },
      { title: "Redirects", href: "/admin/seo/redirects", icon: ArrowRightLeft },
      { title: "Image SEO", href: "/admin/seo/images", icon: ImageIcon },
      { title: "GEO / AI SEO", href: "/admin/seo/geo", icon: Sparkles },
      { title: "SEO Audit", href: "/admin/seo/audit", icon: BarChart3 },
    ],
  },
  {
    label: "Settings",
    items: [
      { title: "Site Settings", href: "/admin/settings", icon: Settings },
      { title: "Users", href: "/admin/users", icon: UserCog },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin"
    return pathname.startsWith(href)
  }

  return (
    <aside className="w-60 shrink-0 bg-white border-r border-gray-200 flex flex-col h-full overflow-hidden">
      <div className="h-14 flex items-center px-5 border-b border-gray-200 shrink-0">
        <span className="font-heading font-bold text-brand-dark text-sm">
          R&amp;W Admin
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-5">
        {NAV_SECTIONS.map((section, si) => (
          <div key={si}>
            {section.label && (
              <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {section.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors",
                        active
                          ? "bg-brand-red text-white"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
