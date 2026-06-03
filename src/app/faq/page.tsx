import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FAQSection } from '@/components/sections/faq/FAQSection';
import { ArrowRight, Phone } from 'lucide-react';
import { FAQ_CATEGORIES } from '@/data/faqs';

export const metadata: Metadata = {
  title: 'FAQs | Commercial & Construction Cleaning | Red and White Cleaning Services',
  description: 'Answers to common questions about post-construction and commercial cleaning services from Red and White Cleaning Services LTD — serving KW, Guelph, Hamilton, London, Brantford.',
};

export default function FAQPage() {
  // Generate FAQPage JSON-LD Schema
  const schemaQuestions = FAQ_CATEGORIES.flatMap(category => category.faqs).map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": schemaQuestions
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* FAQ Header */}
      <section className="relative overflow-hidden bg-brand-dark pt-32 pb-20 lg:pt-48 lg:pb-32">
        {/* Background image & overlays */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/images/faq-header.png"
            alt="Pristine, clean modern office workspace"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Deep overlay to merge with dark page background and keep white text highly readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-brand-dark/75 to-brand-dark" aria-hidden="true" />
          {/* Subtle red brand glow overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-brand-red),transparent_50%)] opacity-25" aria-hidden="true" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-brand-white sm:text-5xl md:text-6xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-75 leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="mt-6 text-lg leading-8 text-brand-gray/80 sm:text-xl max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
              Here are the questions we hear most often. If you don't see your question answered here, call or email us and we'll get you an answer.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordions */}
      <FAQSection />

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
