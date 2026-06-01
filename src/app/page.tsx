import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { TrustBar } from "@/components/sections/home/TrustBar";
import { ServicesOverview } from "@/components/sections/home/ServicesOverview";
import { WhyChooseUs } from "@/components/sections/home/WhyChooseUs";
import { ServiceAreasSection } from "@/components/sections/home/ServiceAreasSection";
import { FAQPreview } from "@/components/sections/home/FAQPreview";
import { CTABanner } from "@/components/sections/home/CTABanner";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: `${SITE.name} | Post-Construction & Commercial Cleaning Southern Ontario`,
  description:
    "Licensed and insured post-construction and commercial cleaning services for contractors, property managers, and developers across Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London, and Brantford, Ontario.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

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
      <CTABanner />
    </>
  );
}
