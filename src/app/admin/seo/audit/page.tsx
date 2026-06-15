import { prisma } from "@/lib/prisma"
import { CheckCircle2, AlertCircle, XCircle, ExternalLink } from "lucide-react"
import Link from "next/link"

export const metadata = { title: "SEO Audit" }

function StatusBadge({ status }: { status: "pass" | "warn" | "fail" }) {
  if (status === "pass") return <span className="flex items-center gap-1 text-green-600 text-xs font-medium"><CheckCircle2 className="h-3.5 w-3.5" />Pass</span>
  if (status === "warn") return <span className="flex items-center gap-1 text-orange-500 text-xs font-medium"><AlertCircle className="h-3.5 w-3.5" />Needs attention</span>
  return <span className="flex items-center gap-1 text-red-500 text-xs font-medium"><XCircle className="h-3.5 w-3.5" />Missing</span>
}

function AuditRow({ label, status, detail, fix }: { label: string; status: "pass" | "warn" | "fail"; detail?: string; fix?: string }) {
  return (
    <div className="flex items-start justify-between py-2.5 border-b last:border-0 gap-4">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        {detail && <p className="text-xs text-muted-foreground mt-0.5">{detail}</p>}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <StatusBadge status={status} />
        {fix && (
          <Link href={fix} className="text-xs text-brand-red hover:underline flex items-center gap-0.5">
            Fix <ExternalLink className="h-3 w-3" />
          </Link>
        )}
      </div>
    </div>
  )
}

export default async function SeoAuditPage() {
  const [globalSeo, pageSeoRecords, schemaConfigs, missingAlt, robotsConfig, sitemapCount] = await Promise.all([
    prisma.globalSeo.findFirst(),
    prisma.pageSeo.findMany(),
    prisma.schemaConfig.findMany(),
    prisma.mediaAsset.count({ where: { altText: null } }),
    prisma.robotsConfig.findFirst(),
    prisma.sitemapEntry.count(),
  ])

  const PAGE_KEYS = ["home", "services", "portfolio", "faq", "about", "contact", "privacy"]
  const pageSeoMap = Object.fromEntries(pageSeoRecords.map((p) => [p.pageKey, p]))

  const schemaMap = Object.fromEntries(schemaConfigs.map((s) => [s.type, s.enabled]))

  const totalAssets = await prisma.mediaAsset.count()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-heading font-bold text-brand-dark">SEO Audit</h1>
        <p className="text-sm text-muted-foreground mt-1">A snapshot of your current SEO completeness. Fix any issues to improve search visibility.</p>
      </div>

      {/* Global SEO */}
      <section className="bg-white rounded-lg border p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-900">Global SEO</h2>
          <Link href="/admin/seo" className="text-xs text-brand-red hover:underline">Edit →</Link>
        </div>
        <AuditRow
          label="Site Name"
          status={globalSeo?.siteName ? "pass" : "fail"}
          detail={globalSeo?.siteName ?? "Not set"}
          fix={!globalSeo?.siteName ? "/admin/seo" : undefined}
        />
        <AuditRow
          label="Site URL"
          status={globalSeo?.siteUrl ? "pass" : "fail"}
          detail={globalSeo?.siteUrl ?? "Not set"}
          fix={!globalSeo?.siteUrl ? "/admin/seo" : undefined}
        />
        <AuditRow
          label="Default Meta Description"
          status={globalSeo?.defaultMetaDesc ? "pass" : "warn"}
          detail={globalSeo?.defaultMetaDesc ? `${globalSeo.defaultMetaDesc.length} chars` : "Not set — pages without a meta description will use this fallback"}
          fix={!globalSeo?.defaultMetaDesc ? "/admin/seo" : undefined}
        />
        <AuditRow
          label="Default OG Image"
          status={globalSeo?.defaultOgImage ? "pass" : "warn"}
          detail={globalSeo?.defaultOgImage ?? "Not set — social previews may show no image"}
          fix={!globalSeo?.defaultOgImage ? "/admin/seo" : undefined}
        />
        <AuditRow
          label="Google Analytics (GA4)"
          status={globalSeo?.ga4Id ? "pass" : "warn"}
          detail={globalSeo?.ga4Id ?? "Not configured"}
          fix={!globalSeo?.ga4Id ? "/admin/seo" : undefined}
        />
        <AuditRow
          label="Business Info (Phone/Email/Address)"
          status={globalSeo?.businessPhone && globalSeo?.businessEmail ? "pass" : "warn"}
          detail={globalSeo?.businessPhone ? `${globalSeo.businessPhone} · ${globalSeo.businessEmail ?? "no email"}` : "Missing — used in Schema markup"}
          fix={!globalSeo?.businessPhone ? "/admin/seo" : undefined}
        />
      </section>

      {/* Page SEO */}
      <section className="bg-white rounded-lg border p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-900">Page SEO</h2>
          <Link href="/admin/seo/pages" className="text-xs text-brand-red hover:underline">Edit →</Link>
        </div>
        {PAGE_KEYS.map((key) => {
          const seo = pageSeoMap[key]
          const hasTitle = !!seo?.metaTitle
          const hasDesc = !!seo?.metaDesc
          const status = hasTitle && hasDesc ? "pass" : hasTitle || hasDesc ? "warn" : "fail"
          return (
            <AuditRow
              key={key}
              label={`/${key === "home" ? "" : key}`}
              status={status}
              detail={
                hasTitle && hasDesc
                  ? `Title: ${seo!.metaTitle!.length}c · Desc: ${seo!.metaDesc!.length}c`
                  : !hasTitle && !hasDesc
                  ? "No meta title or description set"
                  : !hasTitle
                  ? "Missing meta title"
                  : "Missing meta description"
              }
              fix={status !== "pass" ? "/admin/seo/pages" : undefined}
            />
          )
        })}
      </section>

      {/* Schema */}
      <section className="bg-white rounded-lg border p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-900">Schema (JSON-LD)</h2>
          <Link href="/admin/seo/schema" className="text-xs text-brand-red hover:underline">Edit →</Link>
        </div>
        {["LocalBusiness", "CleaningService", "Organization", "WebSite", "FAQPage"].map((type) => (
          <AuditRow
            key={type}
            label={type}
            status={schemaMap[type] ? "pass" : "warn"}
            detail={schemaMap[type] ? "Enabled" : "Disabled — not outputting this schema type"}
            fix={!schemaMap[type] ? "/admin/seo/schema" : undefined}
          />
        ))}
      </section>

      {/* Image SEO */}
      <section className="bg-white rounded-lg border p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-900">Image SEO</h2>
          <Link href="/admin/seo/images" className="text-xs text-brand-red hover:underline">Edit →</Link>
        </div>
        <AuditRow
          label="Media assets with alt text"
          status={missingAlt === 0 ? "pass" : missingAlt < totalAssets / 2 ? "warn" : "fail"}
          detail={totalAssets === 0 ? "No media assets uploaded yet" : `${totalAssets - missingAlt} of ${totalAssets} have alt text`}
          fix={missingAlt > 0 ? "/admin/seo/images" : undefined}
        />
      </section>

      {/* Technical */}
      <section className="bg-white rounded-lg border p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-900">Technical SEO</h2>
        </div>
        <AuditRow
          label="Robots.txt configured"
          status={robotsConfig ? "pass" : "warn"}
          detail={robotsConfig ? "Custom robots.txt is active" : "Using default robots.txt — consider customising"}
          fix={!robotsConfig ? "/admin/seo/robots" : undefined}
        />
        <AuditRow
          label="Sitemap entries"
          status={sitemapCount > 0 ? "pass" : "warn"}
          detail={sitemapCount > 0 ? `${sitemapCount} custom entries` : "No custom sitemap entries — default static routes still served"}
          fix={sitemapCount === 0 ? "/admin/seo/sitemap" : undefined}
        />
      </section>
    </div>
  )
}
