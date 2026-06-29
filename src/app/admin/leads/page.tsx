import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { LeadsFilters, CsvExportButton } from "./LeadsClient"
import { ExternalLink } from "lucide-react"
import type { LeadStatus } from "@/types"

export const metadata = { title: "Leads" }

const STATUS_COLORS: Record<LeadStatus, string> = {
  NEW: "bg-blue-100 text-blue-700 border-blue-200",
  CONTACTED: "bg-yellow-100 text-yellow-700 border-yellow-200",
  QUOTED: "bg-purple-100 text-purple-700 border-purple-200",
  WON: "bg-green-100 text-green-700 border-green-200",
  LOST: "bg-red-100 text-red-700 border-red-200",
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; page?: string }>
}) {
  const params = await searchParams
  const status = params.status
  const q = params.q
  const page = Math.max(1, Number(params.page ?? 1))
  const pageSize = 20

  const where = {
    ...(status && status !== "all" ? { status: status as LeadStatus } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" as const } },
            { email: { contains: q, mode: "insensitive" as const } },
            { companyName: { contains: q, mode: "insensitive" as const } },
          ],
        }
      : {}),
  }

  let leads: Array<{ id: string; name: string; companyName: string | null; email: string; phone: string | null; serviceType: string; location: string; status: LeadStatus; createdAt: Date; followUpDate: Date | null }> = []
  let total = 0
  try {
    ;[leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          name: true,
          companyName: true,
          email: true,
          phone: true,
          serviceType: true,
          location: true,
          status: true,
          createdAt: true,
          followUpDate: true,
        },
      }),
      prisma.lead.count({ where }),
    ])
  } catch (err) {
    console.error("[admin/leads] DB error:", err)
  }

  const totalPages = Math.ceil(total / pageSize)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-brand-dark">Leads</h1>
          <p className="text-sm text-muted-foreground">{total} total</p>
        </div>
        <CsvExportButton />
      </div>

      <LeadsFilters />

      <div className="rounded-lg border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Company</TableHead>
              <TableHead>Service</TableHead>
              <TableHead className="hidden lg:table-cell">Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                  No leads found
                </TableCell>
              </TableRow>
            )}
            {leads.map((lead) => (
              <TableRow key={lead.id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="font-medium text-sm">{lead.name}</div>
                  <div className="text-xs text-muted-foreground">{lead.email}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                  {lead.companyName ?? "—"}
                </TableCell>
                <TableCell className="text-sm">{lead.serviceType}</TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                  {lead.location}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[lead.status]}`}
                  >
                    {lead.status}
                  </span>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">
                  {lead.createdAt.toLocaleDateString("en-CA")}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/leads/${lead.id}`}>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            {page > 1 && (
              <Button variant="outline" size="sm" asChild>
                <Link href={`?page=${page - 1}${status ? `&status=${status}` : ""}${q ? `&q=${q}` : ""}`}>
                  Previous
                </Link>
              </Button>
            )}
            {page < totalPages && (
              <Button variant="outline" size="sm" asChild>
                <Link href={`?page=${page + 1}${status ? `&status=${status}` : ""}${q ? `&q=${q}` : ""}`}>
                  Next
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
