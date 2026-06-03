import React from 'react';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';

export function ServicesCTA() {
  return (
    <section className="py-20 lg:py-32 bg-brand-red text-brand-white relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl max-w-3xl mx-auto mb-6">
          Not sure which service you need?
        </h2>
        <p className="text-xl text-brand-white/95 max-w-2xl mx-auto mb-10">
          Tell us about your space and we'll recommend the right option.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/contact" 
            className="group inline-flex items-center justify-center gap-2 bg-brand-white text-brand-red hover:bg-brand-gray px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl w-full sm:w-auto hover:-translate-y-0.5"
          >
            Request a Free Quote
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <span className="text-brand-white/80 font-medium px-4">or</span>
          <a 
            href="tel:519-574-1552" 
            className="group inline-flex items-center justify-center gap-2 bg-transparent border-2 border-brand-white/30 hover:border-brand-white hover:bg-white/5 text-brand-white px-8 py-4 rounded-lg font-semibold text-lg transition-all w-full sm:w-auto hover:-translate-y-0.5"
          >
            <Phone className="h-5 w-5 transition-transform group-hover:scale-110" />
            Call: 519-574-1552
          </a>
        </div>
      </div>
    </section>
  );
}

