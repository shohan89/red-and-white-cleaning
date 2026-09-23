export const dynamic = 'force-dynamic'

import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/metadata";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { TrustBar } from "@/components/sections/home/TrustBar";
import { ServicesOverview } from "@/components/sections/home/ServicesOverview";
import { WhyChooseUs } from "@/components/sections/home/WhyChooseUs";
import { ServiceAreasSection } from "@/components/sections/home/ServiceAreasSection";
import { FAQPreview } from "@/components/sections/home/FAQPreview";
import { CTABanner } from "@/components/sections/home/CTABanner";
import { SITE } from "@/config/site";
import { prisma } from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getPageMetadata("home", {
    title: `${SITE.name} | Post-Construction & Commercial Cleaning Southern Ontario`,
    description: "Licensed and insured post-construction and commercial cleaning services for contractors, property managers, and developers across Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London, and Brantford, Ontario.",
    canonical: "/",
  })
  // Next.js always collapses a root-path canonical ("/") to the bare origin
  // (no trailing slash) — this is documented, intentional framework behavior,
  // not something the metadata API can override. Suppress the auto-generated
  // tag here and render the exact canonical URL manually in the page below.
  return { ...meta, alternates: { canonical: undefined } }
}

export default async function HomePage() {
  let heroContent = {}
  let trustContent = {}
  let ctaContent = {}
  let whyChooseUsContent = {}
  let faqPreviewContent = {}
  let homeFaqs: Array<{ id: string; question: string; answer: string }> = []

  try {
    const records = await prisma.pageContent.findMany({ where: { pageKey: "home" } })
    for (const r of records) {
      if (r.sectionKey === "hero") heroContent = r.content as object
      if (r.sectionKey === "trust") trustContent = r.content as object
      if (r.sectionKey === "cta") ctaContent = r.content as object
      if (r.sectionKey === "whyChooseUs") whyChooseUsContent = r.content as object
      if (r.sectionKey === "faqPreview") faqPreviewContent = r.content as object
    }
  } catch {}

  try {
    const featured = await prisma.faq.findMany({
      where: { published: true, featuredOnHome: true },
      orderBy: { sortOrder: "asc" },
      select: { id: true, question: true, answer: true },
    })
    if (featured.length > 0) {
      homeFaqs = featured as Array<{ id: string; question: string; answer: string }>
    } else {
      // No FAQs picked yet — fall back to the first 4 published, so the
      // section still shows something sensible out of the box.
      const fallback = await prisma.faq.findMany({
        where: { published: true },
        orderBy: { sortOrder: "asc" },
        take: 4,
        select: { id: true, question: true, answer: true },
      })
      homeFaqs = fallback as Array<{ id: string; question: string; answer: string }>
    }
  } catch {}

  return (
    <>
      {/* Manual canonical tag: Next.js's metadata API collapses a root-path
          canonical to the bare origin (no trailing slash) — see generateMetadata
          above. Rendered directly so the exact URL (with trailing slash) is used. */}
      <link rel="canonical" href={`${SITE.url}/`} />

      {/* 1. Hero */}
      <HeroSection heroContent={heroContent} trustContent={trustContent} />

      {/* 2. Trust Bar */}
      <TrustBar />

      {/* 3. Services Overview */}
      <ServicesOverview />

      {/* 4. Why Choose Us */}
      <WhyChooseUs content={whyChooseUsContent} />

      {/* 5. Service Areas */}
      <ServiceAreasSection />

      {/* 6. FAQ Preview */}
      <FAQPreview content={faqPreviewContent} faqs={homeFaqs} />

      {/* 7. CTA Banner */}
      <CTABanner content={ctaContent} />
    </>
  );
}
