"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

const HOME_FAQS = [
  {
    id: "faq-1",
    question: "Do you do post-construction cleaning?",
    answer:
      "Yes. Post-construction cleaning is one of our core services. We handle final-clean and rough-clean phases for residential builds, commercial renovations, and new construction projects across the KW Region and surrounding areas.",
  },
  {
    id: "faq-2",
    question: "What areas do you serve?",
    answer:
      "We serve the KW Region (Kitchener, Waterloo, Cambridge), Guelph, Hamilton, London, Brantford, and surrounding communities in Southern Ontario.",
  },
  {
    id: "faq-3",
    question: "How do I get a quote?",
    answer:
      "Just fill out our contact form or call us directly at 519-574-1552. We'll get back to you quickly with a price based on your space and what you need done.",
  },
  {
    id: "faq-4",
    question: "Do you offer commercial cleaning contracts?",
    answer:
      "Yes. We work with businesses, property managers, and commercial facilities on recurring weekly, bi-weekly, or monthly cleaning schedules. Contact us to discuss what works for you.",
  },
];

export function FAQPreview() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <SectionWrapper className="bg-brand-gray">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Header */}
      <div className="mb-10 text-center">
        <p className="mb-3 text-xs font-heading font-semibold uppercase tracking-[0.12em] text-brand-red">
          Frequently Asked Questions
        </p>
        <h2 className="mb-2 text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl">
          Common Questions
        </h2>
        <p className="text-gray-500 text-sm">
          Can&apos;t find your answer?{" "}
          <Link href="/contact" className="text-brand-red hover:underline font-medium">
            Contact us directly.
          </Link>
        </p>
      </div>

      {/* Accordion */}
      <div className="mx-auto max-w-3xl">
        <Accordion multiple defaultValue={["faq-1"]} className="space-y-3">
          {HOME_FAQS.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="rounded-xl border border-gray-200 bg-white px-6 shadow-sm"
            >
              <AccordionTrigger className="py-5 text-left font-heading font-semibold text-brand-dark hover:text-brand-red hover:no-underline text-[15px]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-red hover:underline"
          >
            View All FAQs
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
