import React from 'react';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';

export function AboutCTA() {
  return (
    <section className="py-20 lg:py-32 bg-brand-red text-brand-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl max-w-3xl mx-auto mb-8">
          Want to work with a cleaning team you can actually count on?
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center gap-2 bg-brand-white text-brand-red hover:bg-brand-gray px-8 py-4 rounded-lg font-semibold text-lg transition-colors w-full sm:w-auto"
          >
            Get in Touch
            <ArrowRight className="h-5 w-5" />
          </Link>
          <span className="text-brand-white/80 font-medium px-4">or</span>
          <a 
            href="tel:519-574-1552" 
            className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-brand-white/30 hover:border-brand-white text-brand-white px-8 py-4 rounded-lg font-semibold text-lg transition-all w-full sm:w-auto"
          >
            <Phone className="h-5 w-5" />
            Call Karen: 519-574-1552
          </a>
        </div>
      </div>
    </section>
  );
}
