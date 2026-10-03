export const SERVICE_PAGE_SECTION_KEYS = [
  "included",
  "how-we-work",
  "industries",
  "why-choose",
  "service-areas",
  "related",
] as const

export type ServicePageSectionKey = (typeof SERVICE_PAGE_SECTION_KEYS)[number]

export const SERVICE_PAGE_SECTION_DEFAULTS: Record<ServicePageSectionKey, { heading: string; intro?: string }> = {
  included: { heading: "What's Included" },
  "how-we-work": { heading: "How We Work" },
  industries: { heading: "Industries / Space Types We Serve" },
  "why-choose": { heading: "Why Choose This Service" },
  "service-areas": { heading: "Service Areas" },
  related: { heading: "Related Articles & Resources" },
}

export type ServicePageSectionRow = { key: string; heading: string | null; intro: string | null; enabled: boolean }

export function resolveSection(rows: ServicePageSectionRow[], key: ServicePageSectionKey) {
  const row = rows.find((r) => r.key === key)
  return {
    heading: row?.heading || SERVICE_PAGE_SECTION_DEFAULTS[key].heading,
    intro: row?.intro || "",
    enabled: row?.enabled ?? true,
  }
}
