"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import type { LeadStatus } from "@prisma/client"

async function requireAdmin() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
}

export async function updateLeadStatus(leadId: string, status: LeadStatus) {
  await requireAdmin()
  const lead = await prisma.lead.update({
    where: { id: leadId },
    data: { status, updatedAt: new Date() },
  })
  await prisma.leadEvent.create({
    data: { leadId, type: "status_change", note: `Status changed to ${status}` },
  })
  revalidatePath(`/admin/leads/${leadId}`)
  revalidatePath("/admin/leads")
  revalidatePath("/admin")
  return lead
}

export async function addLeadNote(leadId: string, note: string) {
  await requireAdmin()
  if (!note.trim()) return
  await prisma.leadEvent.create({
    data: { leadId, type: "note_added", note: note.trim() },
  })
  await prisma.lead.update({
    where: { id: leadId },
    data: { notes: note.trim(), updatedAt: new Date() },
  })
  revalidatePath(`/admin/leads/${leadId}`)
}

export async function setLeadFollowUp(leadId: string, date: string | null) {
  await requireAdmin()
  const followUpDate = date ? new Date(date) : null
  await prisma.lead.update({
    where: { id: leadId },
    data: { followUpDate, updatedAt: new Date() },
  })
  await prisma.leadEvent.create({
    data: {
      leadId,
      type: "follow_up_set",
      note: date ? `Follow-up set for ${new Date(date).toLocaleDateString("en-CA")}` : "Follow-up cleared",
    },
  })
  revalidatePath(`/admin/leads/${leadId}`)
}

export async function deleteLead(leadId: string) {
  await requireAdmin()
  await prisma.lead.delete({ where: { id: leadId } })
  revalidatePath("/admin/leads")
  revalidatePath("/admin")
}

export async function exportLeadsCsv(): Promise<string> {
  await requireAdmin()
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      companyName: true,
      email: true,
      phone: true,
      location: true,
      serviceType: true,
      status: true,
      message: true,
      howDidYouHear: true,
      followUpDate: true,
      createdAt: true,
    },
  })

  const headers = [
    "ID", "Name", "Company", "Email", "Phone", "Location",
    "Service", "Status", "Message", "How They Heard", "Follow Up Date", "Created At",
  ]

  const escape = (val: string | null | undefined) => {
    if (!val) return ""
    const s = String(val).replace(/"/g, '""')
    return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s}"` : s
  }

  const rows = leads.map((l) => [
    l.id,
    l.name,
    l.companyName ?? "",
    l.email,
    l.phone ?? "",
    l.location,
    l.serviceType,
    l.status,
    l.message,
    l.howDidYouHear ?? "",
    l.followUpDate ? l.followUpDate.toISOString().split("T")[0] : "",
    l.createdAt.toISOString().split("T")[0],
  ].map(escape).join(","))

  return [headers.join(","), ...rows].join("\n")
}
