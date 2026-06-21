import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { StatusUpdater, NoteForm, FollowUpForm, DeleteLeadButton } from "./LeadActions"
import type { LeadStatus } from "@/types"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const lead = await prisma.lead.findUnique({ where: { id }, select: { name: true } })
  return { title: lead ? `Lead: ${lead.name}` : "Lead" }
}

const STATUS_COLORS: Record<LeadStatus, string> = {
  NEW: "bg-blue-100 text-blue-700",
  CONTACTED: "bg-yellow-100 text-yellow-700",
  QUOTED: "bg-purple-100 text-purple-700",
  WON: "bg-green-100 text-green-700",
  LOST: "bg-red-100 text-red-700",
}

const EVENT_LABELS: Record<string, string> = {
  created: "Lead created",
  status_change: "Status updated",
  note_added: "Note added",
  follow_up_set: "Follow-up updated",
}

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: { timeline: { orderBy: { createdAt: "desc" } } },
  })

  if (!lead) notFound()

  return (
    <div className="space-y-6 ">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/leads">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Leads
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-heading font-bold text-brand-dark">{lead.name}</h1>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[lead.status]}`}>
              {lead.status}
            </span>
          </div>
        </div>
        <DeleteLeadButton leadId={lead.id} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Info */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              {[
                ["Name", lead.name],
                ["Company", lead.companyName ?? "—"],
                ["Email", lead.email],
                ["Phone", lead.phone ?? "—"],
                ["Location", lead.location],
                ["Service Requested", lead.serviceType],
                ["How They Heard", lead.howDidYouHear ?? "—"],
                ["Submitted", lead.createdAt.toLocaleDateString("en-CA")],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-muted-foreground font-medium">{label}</p>
                  <p className="font-medium mt-0.5">{value}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Message</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap text-gray-700">{lead.message}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              {lead.timeline.length === 0 ? (
                <p className="text-sm text-muted-foreground">No events yet.</p>
              ) : (
                <ul className="space-y-3">
                  {lead.timeline.map((event) => (
                    <li key={event.id} className="flex gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-brand-red mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {EVENT_LABELS[event.type] ?? event.type}
                        </p>
                        {event.note && (
                          <p className="text-muted-foreground text-xs mt-0.5">{event.note}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {event.createdAt.toLocaleString("en-CA")}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar actions */}
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-4 space-y-4">
              <StatusUpdater leadId={lead.id} currentStatus={lead.status} />
              <FollowUpForm leadId={lead.id} currentDate={lead.followUpDate} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <NoteForm leadId={lead.id} existingNote={lead.notes} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
