import type { Metadata } from "next";
import { SITE } from "@/config/site";
import { Header } from "@/components/deep-cleaning/Header";
import { Hero } from "@/components/deep-cleaning/Hero";
import { TrustSection } from "@/components/deep-cleaning/TrustSection";
import { Services } from "@/components/deep-cleaning/Services";
import { MidCTA } from "@/components/deep-cleaning/MidCTA";
import { WhyChooseUs } from "@/components/deep-cleaning/WhyChooseUs";
import { BeforeAfter } from "@/components/deep-cleaning/BeforeAfter";
import { Testimonials } from "@/components/deep-cleaning/Testimonials";
import { FAQ, FAQS } from "@/components/deep-cleaning/FAQ";
import { FinalCTA } from "@/components/deep-cleaning/FinalCTA";
import { Footer } from "@/components/deep-cleaning/Footer";
import { MobileCTABar } from "@/components/deep-cleaning/MobileCTABar";
import styles from "@/components/deep-cleaning/deep-cleaning.module.css";

const PAGE_URL = `${SITE.url}/deep-cleaning`;
const OG_IMAGE = `${SITE.url}/images/portfolio/deep-clean-hero.webp`;

export const metadata: Metadata = {
  title: "Professional Deep Cleaning Services Near Me | Kitchener, Waterloo, London & Southern Ontario",
  description:
    "Deep cleaning company serving Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London & Brantford. Move in / move out cleaning, end of tenancy cleaning, Airbnb deep cleans, after-event & seasonal cleaning. Licensed, insured, satisfaction guaranteed. Free quote today.",
  keywords: [
    "deep cleaning near me",
    "deep cleaning services near me",
    "professional deep cleaning services",
    "professional deep cleaners near me",
    "best deep cleaning service near me",
    "home deep cleaning service near me",
    "deep cleaning house near me",
    "deep cleaning company",
    "deep cleaning companies near me",
    "deep cleaning experts",
    "deep cleaning professionals",
    "deep cleaning service",
    "deep cleaning kitchener",
    "deep cleaning waterloo",
    "deep cleaning cambridge",
    "deep cleaning guelph",
    "deep cleaning hamilton",
    "deep cleaning london",
    "deep cleaning brantford",
    "bathroom deep clean london",
    "one off deep clean london",
    "one off deep clean price",
    "london best cleaning service",
    "best move in cleaning london",
    "end of tenancy cleaning london",
    "move in cleaning",
    "move in cleaning service",
    "move in deep cleaning service",
    "move in deep cleaning service near me",
    "move in move out cleaning service",
    "move out cleaning",
    "move out cleaning company",
    "move out cleaning service",
    "move out cleaning services near me",
    "move out cleaners near me",
    "move out house cleaning services near me",
    "move out professional cleaning",
    "professional move out cleaning services",
    "residential move out cleaning",
    "tenant move out cleaning",
    "apartment move out cleaning",
    "apartment move out cleaning services near me",
    "moving cleaning services near me",
    "moving house cleaning service near me",
    "air bnb deep clean",
    "after event cleaners",
    "after event cleaning",
    "fast clean up",
    "seasonal cleaning",
    "annual cleaning",
    "consistent cleaning crew",
  ],
  alternates: { canonical: "/deep-cleaning" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: PAGE_URL,
    siteName: SITE.name,
    title: "Professional Deep Cleaning Services | Red & White Cleaning Services",
    description:
      "Deep cleaning, move in / move out cleaning, Airbnb deep cleans and after-event cleaning across Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London & Brantford. Licensed, insured, satisfaction guaranteed.",
    images: [{ url: OG_IMAGE, width: 1024, height: 1024 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Deep Cleaning Services | Red & White Cleaning Services",
    description:
      "Deep cleaning, move out cleaning & Airbnb deep cleans across Southern Ontario. Licensed, insured, satisfaction guaranteed.",
    images: [OG_IMAGE],
  },
};

const AREA_SERVED = [
  "Kitchener",
  "Waterloo",
  "Cambridge",
  "Guelph",
  "Hamilton",
  "London",
  "Brantford",
].map((name) => ({ "@type": "City", name }));

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  telephone: SITE.phone,
  email: SITE.email,
  url: PAGE_URL,
  image: OG_IMAGE,
  description:
    "Professional deep cleaning company serving Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London and Brantford: whole-home deep cleans, move in / move out cleaning, end of tenancy cleaning, Airbnb deep cleans, after-event and seasonal cleaning.",
  areaServed: AREA_SERVED,
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.address.city,
    addressRegion: "ON",
    addressCountry: "CA",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Deep Cleaning",
  name: "Residential Deep Cleaning",
  description:
    "Top-to-bottom professional deep cleaning services covering kitchens, bathrooms, baseboards and appliances, plus move in / move out cleaning, end of tenancy cleaning, Airbnb deep cleans, after-event and seasonal deep cleans.",
  provider: {
    "@type": "LocalBusiness",
    name: SITE.name,
    telephone: SITE.phone,
    url: SITE.url,
  },
  areaServed: AREA_SERVED,
  url: PAGE_URL,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function DeepCleaningPage() {
  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />
      <Hero />
      <TrustSection />
      <Services />
      <MidCTA />
      <WhyChooseUs />
      <BeforeAfter />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
      <div className={styles.mobileCtaBarSpacer} aria-hidden="true" />
      <MobileCTABar />
    </div>
  );
}
