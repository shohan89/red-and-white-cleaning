"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_CATEGORIES } from "@/data/faqs";

export function FAQSection() {
  return (
    <section className="py-20 lg:py-32 bg-background relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="max-w-4xl mx-auto space-y-16">
          {FAQ_CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id} className="scroll-mt-32" id={category.id}>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    {category.title}
                  </h2>
                </div>

                {/* Accordion */}
                <Accordion multiple className="space-y-4">
                  {category.faqs.map((faq) => (
                    <AccordionItem
                      key={faq.id}
                      value={faq.id}
                      className="rounded-2xl border border-border bg-card px-6 shadow-sm group hover:border-brand-red/30 transition-colors"
                    >
                      <AccordionTrigger className="py-6 text-left font-heading text-lg font-semibold text-foreground hover:text-brand-red hover:no-underline transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
