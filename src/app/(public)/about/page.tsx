import React from 'react';
import { Metadata } from 'next';
import { getPageMetadata } from "@/lib/metadata";
import { AboutHeader } from '@/components/sections/about/AboutHeader';
import { OurStory } from '@/components/sections/about/OurStory';
import { WhatMakesUsDifferent } from '@/components/sections/about/WhatMakesUsDifferent';
import { ServiceArea } from '@/components/sections/about/ServiceArea';
import { AboutCTA } from '@/components/sections/about/AboutCTA';
import { prisma } from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("about", {
    title: 'About Red and White Cleaning Services LTD | Commercial Cleaning KW Ontario',
    description: 'Learn about Red and White Cleaning Services — a Southern Ontario cleaning company specializing in construction and commercial cleaning.',
    canonical: "/about",
  })
}

export default async function AboutPage() {
  let heroContent = {}
  let storyContent = {}
  try {
    const records = await prisma.pageContent.findMany({ where: { pageKey: "about" } })
    for (const r of records) {
      if (r.sectionKey === "hero") heroContent = r.content as object
      if (r.sectionKey === "story") storyContent = r.content as object
    }
  } catch {}

  return (
    <main className="flex min-h-screen flex-col">
      <AboutHeader content={heroContent} />
      <OurStory content={storyContent} />
      <WhatMakesUsDifferent />
      <ServiceArea />
      <AboutCTA />
    </main>
  );
}
