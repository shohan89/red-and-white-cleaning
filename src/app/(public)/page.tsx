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
  return getPageMetadata("home", {
    title: `${SITE.name} | Post-Construction & Commercial Cleaning Southern Ontario`,
    description: "Licensed and insured post-construction and commercial cleaning services for contractors, property managers, and developers across Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London, and Brantford, Ontario.",
    canonical: "/",
  })
}

export default async function HomePage() {
  let heroContent = {}
  let trustContent = {}
  let ctaContent = {}
  try {
    const records = await prisma.pageContent.findMany({ where: { pageKey: "home" } })
    for (const r of records) {
      if (r.sectionKey === "hero") heroContent = r.content as object
      if (r.sectionKey === "trust") trustContent = r.content as object
      if (r.sectionKey === "cta") ctaContent = r.content as object
    }
  } catch {}

  return (
    <>
      {/* 1. Hero */}
      <HeroSection heroContent={heroContent} trustContent={trustContent} />

      {/* 2. Trust Bar */}
      <TrustBar />

      {/* 3. Services Overview */}
      <ServicesOverview />

      {/* 4. Why Choose Us */}
      <WhyChooseUs />

      {/* 5. Service Areas */}
      <ServiceAreasSection />

      {/* 6. FAQ Preview */}
      <FAQPreview />

      {/* 7. CTA Banner */}
      <CTABanner content={ctaContent} />
    </>
  );
}
