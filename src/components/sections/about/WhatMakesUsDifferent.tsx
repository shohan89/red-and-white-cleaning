import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const benefits = [
  "We specialize in construction cleaning — it's not a side service, it's what we're built for",
  "We're responsive. If you send a message, you'll hear back the same day",
  "We use professional-grade cleaning products and equipment",
  "We're fully insured and take site safety seriously",
  "We work with your schedule, not against it",
];

export function WhatMakesUsDifferent() {
  return (
    <section className="py-20 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-center mb-12">
            What You Can Expect When You Work With Us
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border/50 shadow-sm transition-all hover:shadow-md hover:border-border"
              >
                <div className="mt-1 bg-brand-red/10 p-2 rounded-full text-brand-red flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <p className="text-foreground leading-relaxed">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
