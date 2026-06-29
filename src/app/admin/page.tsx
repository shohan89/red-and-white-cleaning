import { prisma } from "@/lib/prisma"
import Link from "next/link"
import {
  Users,
  FileImage,
  MessageSquare,
  HelpCircle,
  TrendingUp,
  ArrowRight,
  Clock,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const metadata = { title: "Dashboard" }

const STATUS_COLOR: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-800",
  CONTACTED: "bg-yellow-100 text-yellow-800",
  QUOTED: "bg-purple-100 text-purple-800",
  WON: "bg-green-100 text-green-800",
  LOST: "bg-gray-100 text-gray-600",
}

export default async function AdminDashboard() {
  let totalLeads = 0, newLeads = 0, portfolioItems = 0, faqs = 0
  let recentLeads: Array<{ id: string; name: string; companyName: string | null; serviceType: string; status: string; createdAt: Date }> = []

  try {
    ;[totalLeads, newLeads, portfolioItems, faqs, recentLeads] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "NEW" } }),
      prisma.portfolioItem.count(),
      prisma.faq.count({ where: { published: true } }),
      prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
        select: { id: true, name: true, companyName: true, serviceType: true, status: true, createdAt: true },
      }),
    ])
  } catch (err) {
    console.error("[admin/dashboard] DB error:", err)
  }

  const stats = [
    { label: "Total Leads", value: totalLeads, sub: `${newLeads} new`, icon: Users, href: "/admin/leads", color: "text-blue-600 bg-blue-50" },
    { label: "Portfolio Items", value: portfolioItems, sub: "published", icon: FileImage, href: "/admin/portfolio", color: "text-purple-600 bg-purple-50" },
    { label: "Published FAQs", value: faqs, sub: "live on site", icon: HelpCircle, href: "/admin/faqs", color: "text-green-600 bg-green-50" },
    { label: "New Leads", value: newLeads, sub: "awaiting contact", icon: TrendingUp, href: "/admin/leads?status=NEW", color: "text-orange-600 bg-orange-50" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-heading font-bold text-brand-dark">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back. Here's what's happening.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white rounded-lg border p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
                <p className="text-3xl font-bold text-brand-dark mt-1">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
              </div>
              <div className={`p-2 rounded-lg ${s.color}`}>
                <s.icon className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-lg border">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-brand-red" />
            Recent Leads
          </h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/leads" className="text-xs flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
        {recentLeads.length === 0 ? (
          <p className="text-sm text-muted-foreground p-4">No leads yet. Submit the contact form to create one.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {recentLeads.map((lead) => (
              <li key={lead.id}>
                <Link href={`/admin/leads/${lead.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{lead.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{lead.companyName ?? lead.serviceType}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLOR[lead.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {lead.status}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                    <Clock className="h-3 w-3" />
                    {new Date(lead.createdAt).toLocaleDateString("en-CA", { month: "short", day: "numeric" })}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { label: "Add Portfolio Item", href: "/admin/portfolio/new" },
            { label: "Add FAQ", href: "/admin/faqs/new" },
            { label: "Edit Global SEO", href: "/admin/seo" },
            { label: "Manage Media", href: "/admin/media" },
            { label: "Edit Page SEO", href: "/admin/seo/pages" },
            { label: "View Leads", href: "/admin/leads" },
            { label: "Site Settings", href: "/admin/settings" },
            { label: "Edit Services", href: "/admin/services" },
          ].map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="text-sm text-center px-3 py-2.5 rounded-lg border bg-white hover:bg-gray-50 hover:border-brand-red/30 transition-colors text-gray-700 font-medium"
            >
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
