import type { Role, LeadStatus } from "@prisma/client"

export type { Role, LeadStatus }

export interface AdminUser {
  id: string
  email: string | null
  name?: string | null
  role: Role
}

export interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  superAdminOnly?: boolean
}

export interface NavSection {
  label: string | null
  items: NavItem[]
}
