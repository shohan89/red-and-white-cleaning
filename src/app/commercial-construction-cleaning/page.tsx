import type { Metadata } from "next";
import { SITE } from "@/config/site";
import { Header } from "@/components/deep-cleaning/Header";
import { MobileCTABar } from "@/components/deep-cleaning/MobileCTABar";
import { Hero } from "@/components/commercial-cleaning/Hero";
import { TrustSection } from "@/components/commercial-cleaning/TrustSection";
import { Services } from "@/components/commercial-cleaning/Services";
import { MidCTA } from "@/components/commercial-cleaning/MidCTA";
import { WhyChooseUs } from "@/components/commercial-cleaning/WhyChooseUs";
import { Results } from "@/components/commercial-cleaning/Results";
import { Testimonials } from "@/components/commercial-cleaning/Testimonials";
import { FAQ, FAQS } from "@/components/commercial-cleaning/FAQ";
import { FinalCTA } from "@/components/commercial-cleaning/FinalCTA";
import { Footer } from "@/components/commercial-cleaning/Footer";
import styles from "@/components/deep-cleaning/deep-cleaning.module.css";

const PAGE_URL = `${SITE.url}/commercial-construction-cleaning`;
const OG_IMAGE = `${SITE.url}/images/portfolio/commercial-hero-crew.webp`;

export const metadata: Metadata = {
  title: "Commercial Cleaning & Post Construction Cleaning Services | Kitchener, Waterloo, London ON",
  description:
    "Commercial cleaning company for post construction cleaning, office cleaning, commercial building janitorial services and Airbnb cleaning across Kitchener, Waterloo (KW), Cambridge, Guelph, Hamilton, London & Brantford. Fully insured construction cleaners and office cleaners near you. Free quote.",
  keywords: [
    "commercial cleaning",
    "commercial cleaning services",
    "commercial cleaning services near me",
    "commercial cleaning company",
    "commercial cleaning companies near me",
    "commercial cleaning contractors",
    "commercial cleaners near me",
    "commercial cleaning kitchener",
    "commercial cleaning waterloo",
    "commercial cleaning cambridge",
    "commercial cleaning hamilton",
    "commercial cleaning brantford",
    "commercial cleaning services kw",
    "commercial cleaners london",
    "commercial cleaners london ontario",
    "commercial office cleaning",
    "commercial office cleaning services near me",
    "commercial building cleaning services",
    "commercial building janitorial services",
    "commercial property cleaning services",
    "commercial deep cleaning services",
    "business cleaning services",
    "cleaning company for business",
    "corporate office cleaning",
    "office cleaning",
    "office cleaning services",
    "office cleaning company",
    "office cleaning contractors",
    "office cleaners near me",
    "office cleaners guelph",
    "office cleaning kitchener",
    "office cleaning waterloo",
    "office cleaning cambridge on",
    "office cleaning hamilton",
    "office cleaning brantford",
    "affordable office cleaning",
    "best office cleaning service",
    "office and common area cleaning",
    "kitchen and lunchroom cleaning",
    "post construction cleaning near me",
    "post construction cleaning services near me",
    "post construction cleaning companies near me",
    "post construction cleaning kitchener",
    "post construction cleaning cambridge on",
    "post construction cleaning hamilton",
    "post construction cleaners guelph",
    "after construction cleaning near me",
    "after construction cleaning services near me",
    "after builders cleaning london",
    "best after builders cleaning london",
    "builders cleaning services",
    "construction cleaners near me",
    "construction cleaning company near me",
    "construction clean up services near me",
    "construction cleanup london ontario",
    "airbnb cleaning",
  ],
  alternates: { canonical: "/commercial-construction-cleaning" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: PAGE_URL,
    siteName: SITE.name,
    title: "Commercial Cleaning & Post Construction Cleaning | Red & White Cleaning Services",
    description:
      "Post construction cleaning, office cleaning, commercial building janitorial services and Airbnb cleaning across Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London & Brantford. Fully insured crews that work to your schedule.",
    images: [{ url: OG_IMAGE, width: 1920, height: 1080 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Cleaning & Post Construction Cleaning | Red & White Cleaning Services",
    description:
      "Commercial cleaners and construction cleaners near you in Southern Ontario. Fully insured, scheduled around your build and business hours.",
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
    "Commercial cleaning company serving Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London and Brantford: post construction cleaning (rough and final), PDI and occupancy cleaning, office cleaning, commercial building janitorial services, commercial deep cleaning, window cleaning and Airbnb cleaning.",
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
  serviceType: "Commercial Cleaning & Post Construction Cleaning",
  name: "Commercial & Post Construction Cleaning Services",
  description:
    "Post construction cleaning (rough and final), after builders cleaning, PDI and occupancy cleans, office cleaning, commercial building janitorial services, commercial deep cleaning, window cleaning and Airbnb cleaning for contractors, developers, property managers and business owners.",
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

export default function CommercialConstructionCleaningPage() {
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
      <Results />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
      <div className={styles.mobileCtaBarSpacer} aria-hidden="true" />
      <MobileCTABar />
    </div>
  );
}
