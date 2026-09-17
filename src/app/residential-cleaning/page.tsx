import type { Metadata } from "next";
import { SITE } from "@/config/site";
import { Header } from "@/components/deep-cleaning/Header";
import { MobileCTABar } from "@/components/deep-cleaning/MobileCTABar";
import { Hero } from "@/components/residential-cleaning/Hero";
import { TrustSection } from "@/components/residential-cleaning/TrustSection";
import { Services } from "@/components/residential-cleaning/Services";
import { MidCTA } from "@/components/residential-cleaning/MidCTA";
import { WhyChooseUs } from "@/components/residential-cleaning/WhyChooseUs";
import { BeforeAfter } from "@/components/residential-cleaning/BeforeAfter";
import { Testimonials } from "@/components/residential-cleaning/Testimonials";
import { FAQ, FAQS } from "@/components/residential-cleaning/FAQ";
import { FinalCTA } from "@/components/residential-cleaning/FinalCTA";
import { Footer } from "@/components/residential-cleaning/Footer";
import styles from "@/components/deep-cleaning/deep-cleaning.module.css";

const PAGE_URL = `${SITE.url}/residential-cleaning`;
const OG_IMAGE = `${SITE.url}/images/portfolio/residential-kitchen-ba.webp`;

export const metadata: Metadata = {
  title: "Residential House Cleaning Services | Kitchener, Waterloo, Guelph ON",
  description:
    "Residential cleaning company for house cleaning, move-in/move-out cleaning, pre-sale cleans, deep cleaning and recurring home cleaning across Kitchener, Waterloo (KW), Cambridge, Guelph, Hamilton, London & Brantford. Fully insured home cleaners near you. Free quote.",
  keywords: [
    "residential cleaning",
    "residential cleaning services",
    "residential cleaning services near me",
    "residential cleaning company",
    "house cleaning near me",
    "house cleaning services",
    "house cleaning company",
    "home cleaning services",
    "home cleaning near me",
    "home cleaners near me",
    "house cleaners near me",
    "residential cleaning kitchener",
    "house cleaning waterloo",
    "home cleaning cambridge",
    "residential cleaners guelph",
    "house cleaning hamilton",
    "home cleaners london ontario",
    "residential cleaning brantford",
    "move in cleaning",
    "move out cleaning",
    "move in move out cleaning near me",
    "move out cleaning service",
    "end of lease cleaning",
    "pre sale cleaning",
    "pre listing cleaning service",
    "home cleaning before selling",
    "deep house cleaning near me",
    "deep cleaning service for home",
    "recurring house cleaning",
    "weekly house cleaning",
    "biweekly house cleaning",
    "monthly house cleaning",
    "affordable house cleaning",
    "best house cleaning service near me",
    "apartment cleaning service",
    "landlord cleaning service",
    "rental cleaning service",
  ],
  alternates: { canonical: "/residential-cleaning" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: PAGE_URL,
    siteName: SITE.name,
    title: "Residential House Cleaning Services | Red & White Cleaning Services",
    description:
      "House cleaning, move-in/move-out cleaning, pre-sale cleans, deep cleaning and recurring home cleaning across Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London & Brantford. Fully insured crews that work around your life.",
    images: [{ url: OG_IMAGE, width: 1920, height: 1080 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Residential House Cleaning Services | Red & White Cleaning Services",
    description:
      "Home cleaners near you in Southern Ontario. Fully insured, flexible scheduling, same trusted cleaners every visit.",
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
    "Residential cleaning company serving Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London and Brantford: house cleaning, move-in/move-out cleaning, pre-sale/pre-listing cleans, deep cleaning and recurring home cleaning.",
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
  serviceType: "Residential Cleaning",
  name: "Residential House Cleaning Services",
  description:
    "House cleaning, move-in/move-out cleaning, pre-sale/pre-listing cleans, deep cleaning and recurring residential cleaning for homeowners, new buyers, home sellers, landlords and renters.",
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

export default function ResidentialCleaningPage() {
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
