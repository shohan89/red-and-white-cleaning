import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from 'next/link';

export interface ServiceFaqData {
  id: string;
  question: string;
  answer: string;
}

export function ServiceFaqSection({ faqs, serviceName }: { faqs: ServiceFaqData[]; serviceName: string }) {
  if (faqs.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-muted/30 border-y border-border" aria-label={`${serviceName} FAQs`}>
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-muted-foreground">
            Common questions about {serviceName.toLowerCase()}. Still have one?{" "}
            <Link href="/contact" className="text-brand-red font-medium hover:underline">
              Ask us
            </Link>
            .
          </p>
        </div>

        <Accordion multiple className="space-y-4">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="rounded-2xl border border-border bg-card px-6 shadow-sm group hover:border-brand-red/30 transition-colors"
            >
              <AccordionTrigger className="py-5 text-left font-heading text-base font-semibold text-foreground hover:text-brand-red hover:no-underline transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
