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
    question: "What areas do you service?",
    answer:
      "Red & White Cleaning Services LTD provides commercial and post-construction cleaning in Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London, and Brantford, Ontario. Contact us if your location is not listed — we may be able to accommodate your project.",
  },
  {
    id: "faq-2",
    question: "Are you licensed and insured?",
    answer:
      "Yes. Red & White Cleaning Services LTD is fully licensed and carries comprehensive general liability insurance for all commercial and post-construction cleaning work in Ontario. Insurance documentation is available upon request.",
  },
  {
    id: "faq-3",
    question: "What does post-construction cleaning include?",
    answer:
      "Our post-construction cleaning service includes removal of construction dust, debris, adhesive residue, paint overspray, and surface marks from all surfaces including floors, windows, fixtures, and cabinetry. The space is cleaned to occupancy-ready standard.",
  },
  {
    id: "faq-4",
    question: "How do I get a quote?",
    answer:
      "Submit your project details through our online quote form or call us directly. We respond to all quote requests within 1 business day with a customized price based on your location, property size, and service type.",
  },
];

export function FAQPreview() {
  return (
    <SectionWrapper className="bg-brand-gray">
      {/* Header */}
      <div className="mb-10 text-center">
        <p className="mb-3 text-xs font-heading font-semibold uppercase tracking-[0.12em] text-brand-red">
          Frequently Asked Questions
        </p>
        <h2 className="mb-2 text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl">
          Common Questions About Our Services
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
