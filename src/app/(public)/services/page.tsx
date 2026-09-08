// ISR instead of force-dynamic: admin saves already call revalidatePath("/services"),
// so edits show up immediately anyway. force-dynamic meant every visitor re-ran the
// full DB query (main + 3 relation queries) on every request; this serves the cached
// render instead and only re-fetches in the background after `revalidate` seconds.
export const revalidate = 3600

import React from 'react';
import { Metadata } from 'next';
import { getPageMetadata } from "@/lib/metadata";
import { ServicesHeader } from '@/components/sections/services/ServicesHeader';
import { ServiceSection } from '@/components/sections/services/ServiceSection';
import { ServicesCTA } from '@/components/sections/services/ServicesCTA';
import { prisma } from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("services", {
    title: 'Commercial & Construction Cleaning Services | KW, Guelph, Hamilton, Ontario',
    description: 'Red and White Cleaning Services offers post-construction cleaning, commercial cleaning, deep cleaning, and ongoing maintenance across KW Region and Southern Ontario.',
    canonical: "/services",
  })
}

export default async function ServicesPage() {
  let heroContent = {}
  let services: Array<{
    id: string
    slug: string
    label: string | null
    title: string
    description: string
    targetAudienceText: string | null
    icon: string | null
    phases: Array<{ id: string; title: string; description: string; icon: string | null; frequency: string | null; bestFor: string | null }>
    includedItems: Array<{ id: string; text: string }>
    images: Array<{ id: string; imageUrl: string; altText: string | null; phaseLabel: string | null; objectPosition: string | null }>
  }> = []

  try {
    const rec = await prisma.pageContent.findFirst({
      where: { pageKey: "services", sectionKey: "hero" },
    })
    if (rec) heroContent = rec.content as object
  } catch {}

  try {
    services = await prisma.service.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        phases: { orderBy: { sortOrder: "asc" } },
        includedItems: { orderBy: { sortOrder: "asc" } },
        images: { orderBy: { sortOrder: "asc" } },
      },
    })
  } catch (err) {
    console.error("[services] DB error:", err)
  }

  return (
    <main className="flex min-h-screen flex-col">
      <ServicesHeader content={heroContent} />
      {services.map((service, index) => (
        <ServiceSection key={service.id} service={service} index={index} />
      ))}
      <ServicesCTA />
    </main>
  );
}
