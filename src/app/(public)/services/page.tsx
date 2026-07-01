export const dynamic = 'force-dynamic'

import React from 'react';
import { Metadata } from 'next';
import { getPageMetadata } from "@/lib/metadata";
import { ServicesHeader } from '@/components/sections/services/ServicesHeader';
import { ServicePostConstruction } from '@/components/sections/services/ServicePostConstruction';
import { ServiceCommercial } from '@/components/sections/services/ServiceCommercial';
import { ServiceDeepCleaning } from '@/components/sections/services/ServiceDeepCleaning';
import { ServiceMaintenance } from '@/components/sections/services/ServiceMaintenance';
import { ServiceResidential } from '@/components/sections/services/ServiceResidential';
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
  try {
    const rec = await prisma.pageContent.findFirst({
      where: { pageKey: "services", sectionKey: "hero" },
    })
    if (rec) heroContent = rec.content as object
  } catch {}

  return (
    <main className="flex min-h-screen flex-col">
      <ServicesHeader content={heroContent} />
      <ServicePostConstruction />
      <ServiceCommercial />
      <ServiceDeepCleaning />
      <ServiceMaintenance />
      <ServiceResidential />
      <ServicesCTA />
    </main>
  );
}
