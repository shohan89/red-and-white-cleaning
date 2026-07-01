import React from "react";
import { Metadata } from "next";
import { getPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import Image from "next/image";
import { FAQSection } from "@/components/sections/faq/FAQSection";
import { ArrowRight, Phone } from "lucide-react";
import { prisma } from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("faq", {
    title: "FAQs | Commercial & Construction Cleaning | Red and White Cleaning Services",
    description: "Answers to common questions about post-construction and commercial cleaning services from Red and White Cleaning Services LTD - serving KW, Guelph, Hamilton, London, Brantford.",
    canonical: "/faq",
  })
}

const HARDCODED_FALLBACK = [
  {
    id: "general",
    name: "GENERAL",
    slug: "general",
    icon: "MessageCircleQuestion",
    faqs: [
      { id: "gen-1", question: "What is Red and White Cleaning Services LTD?", answer: "Red and White Cleaning Services LTD is a commercial and construction cleaning company based in the KW Region of Ontario. We serve general contractors, commercial property managers, and businesses across Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London, Brantford, and surrounding areas." },
      { id: "gen-2", question: "What areas do you service?", answer: "We service the KW Region (Kitchener, Waterloo, Cambridge), Guelph, Hamilton, London, Brantford, and the surrounding communities across Southern Ontario. Not sure if we cover your location? Call us at 519-574-1552 and we'll let you know." },
      { id: "gen-3", question: "Are you insured?", answer: "Yes. Red and White Cleaning Services LTD is fully insured. We can provide documentation upon request for contractors or property managers who require proof of insurance before booking." },
      { id: "gen-4", question: "How do I get a quote?", answer: "You can request a quote through our online form on the Contact page, send an email to Redandwhiteclean@gmail.com, or call/text us at 519-574-1552. We typically respond within the same business day." },
    ],
  },
  {
    id: "post-construction",
    name: "POST-CONSTRUCTION CLEANING",
    slug: "post-construction",
    icon: "HardHat",
    faqs: [
      { id: "pc-1", question: "What is post-construction cleaning?", answer: "Post-construction cleaning is the process of cleaning a building after construction or renovation work is complete. It involves removing construction debris, dust, residue, and protective coverings so the space is ready for occupancy or handoff." },
      { id: "pc-2", question: "Do you do rough cleans and final cleans?", answer: "Yes. We handle both phases of post-construction cleaning — rough clean (during active construction, removing debris and major mess) and final clean (after all trades are done, preparing the space for move-in or client handoff)." },
      { id: "pc-3", question: "Can you work on a contractor's timeline?", answer: "Yes, that's something we're built for. We understand construction timelines are tight and subject to change. We work with project managers and general contractors to schedule cleaning around your build schedule, including evenings and weekends when needed." },
      { id: "pc-4", question: "What does post-construction cleaning include?", answer: "Our post-construction cleaning typically includes: dust and debris removal from all surfaces, window and glass cleaning, floor cleaning and polishing, bathroom and kitchen scrub-out, HVAC vent cleaning, and a final walk-through inspection." },
      { id: "pc-5", question: "How long does a post-construction clean take?", answer: "It depends on the size of the space and the scope of work. A typical residential final clean can take anywhere from half a day to a full day. Commercial builds and large renovations may take multiple days. We'll give you a realistic timeline when you request a quote." },
    ],
  },
  {
    id: "commercial",
    name: "COMMERCIAL CLEANING",
    slug: "commercial",
    icon: "Building2",
    faqs: [
      { id: "com-1", question: "What types of commercial spaces do you clean?", answer: "We clean offices, warehouses, retail stores, commercial units, airbnb units and other business facilities. If you're a property manager or business owner in the KW Region, Guelph, Hamilton, London, or Brantford area and you need a reliable cleaning team, reach out and we'll assess your space." },
      { id: "com-2", question: "Do you offer recurring cleaning contracts?", answer: "Yes. We offer weekly, bi-weekly, and monthly commercial cleaning contracts. Recurring clients get priority scheduling and a consistent team who knows their space." },
      { id: "com-3", question: "Can you clean after-hours or on weekends?", answer: "Yes. We understand that many businesses can't have a cleaning crew working during business hours. We can arrange evening, early morning, or weekend cleaning to avoid disrupting your operations." },
      { id: "com-4", question: "What's the difference between commercial cleaning and a deep clean?", answer: "Commercial cleaning refers to regular, ongoing maintenance cleaning — keeping a space clean week to week. A deep clean is a more thorough, one-time clean that goes beyond routine maintenance. We offer both." },
    ],
  },
];

export default async function FAQPage() {
  let categories = HARDCODED_FALLBACK;

  try {
    const dbCategories = await prisma.faqCategory.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        faqs: {
          where: { published: true },
          orderBy: { sortOrder: "asc" },
          select: { id: true, question: true, answer: true },
        },
      },
    });
    if (dbCategories.length > 0) {
      categories = dbCategories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon ?? "",
        faqs: cat.faqs,
      }));
    }
  } catch {}

  const schemaQuestions = categories.flatMap((cat) => cat.faqs).map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: schemaQuestions,
  };

  return (
    <main className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* FAQ Header */}
      <section className="relative overflow-hidden bg-brand-dark pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/images/faq-header.webp"
            alt="Pristine, clean modern office workspace"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-brand-dark/75 to-brand-dark" aria-hidden="true" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-brand-red),transparent_50%)] opacity-25" aria-hidden="true" />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-brand-white sm:text-5xl md:text-6xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-75 leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="mt-6 text-lg leading-8 text-brand-gray/80 sm:text-xl max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
              Here are the questions we hear most often. If you don&apos;t see your question
              answered here, call or email us and we&apos;ll get you an answer.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordions */}
      <FAQSection categories={categories} />

      {/* FAQ CTA */}
      <section className="py-20 bg-brand-red text-brand-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl max-w-2xl mx-auto mb-10">
            Still have questions?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 bg-brand-white text-brand-red hover:bg-brand-gray px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl w-full sm:w-auto hover:-translate-y-0.5"
            >
              Contact Us Directly
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <span className="text-brand-white/80 font-medium px-4">or</span>
            <a
              href="tel:519-574-1552"
              className="group inline-flex items-center justify-center gap-2 bg-transparent border-2 border-brand-white/30 hover:border-brand-white hover:bg-white/5 text-brand-white px-8 py-4 rounded-lg font-semibold text-lg transition-all w-full sm:w-auto hover:-translate-y-0.5"
            >
              <Phone className="h-5 w-5 transition-transform group-hover:scale-110" />
              Call 519-574-1552
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
