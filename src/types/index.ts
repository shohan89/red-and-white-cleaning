export type Role = "SUPER_ADMIN" | "ADMIN"
export type LeadStatus = "NEW" | "CONTACTED" | "QUOTED" | "WON" | "LOST"

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
