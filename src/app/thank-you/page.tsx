import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Thank You | Red and White Cleaning Services',
  description: 'Thank you for reaching out to Red and White Cleaning Services LTD. We will be in touch shortly.',
  robots: {
    index: false,
    follow: false,
  } // Prevent indexing so only form submitters see this page
};

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-dark relative overflow-hidden px-4">
      {/* Glowing Accent Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none opacity-50"></div>
      <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-5 bg-center"></div>

      <div className="relative z-10 max-w-md w-full bg-card/5 backdrop-blur-sm border border-brand-red/20 rounded-3xl p-8 sm:p-12 text-center shadow-2xl animate-in zoom-in-95 duration-500">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 bg-brand-red/20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.3)]">
            <CheckCircle2 className="h-10 w-10 text-brand-red" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight text-brand-white sm:text-4xl mb-4">
          Thank You!
        </h1>
        <p className="text-lg text-brand-gray/90 mb-8 leading-relaxed">
          We have received your message. We'll be in touch within 1 business day.
        </p>

        <Link 
          href="/" 
          className="inline-flex items-center justify-center gap-2 text-brand-white/80 hover:text-brand-white font-medium transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Return to Home
        </Link>
      </div>
    </main>
  );
}
