import React from 'react';
import Image from 'next/image';

interface ServicesHeroContent {
  heading?: string
  subheading?: string
}

export function ServicesHeader({ content = {} }: { content?: ServicesHeroContent }) {
  const heading = content.heading ?? "Professional Cleaning Services for Contractors & Commercial Clients"
  const subheading = content.subheading ?? "We handle everything from rough-clean on active construction sites to ongoing janitorial services for commercial spaces. Here's what we do:"

  return (
    <section className="relative overflow-hidden bg-brand-dark pt-32 pb-20 lg:pt-48 lg:pb-32">
      {/* Background image & overlays */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/images/services-header.webp"
          alt="Post-construction commercial building interior undergoing final clean"
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
          {/* Tag/Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/25 border border-brand-red/40 text-brand-white font-medium text-xs sm:text-sm mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            Red and White Cleaning Services
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-brand-white sm:text-5xl md:text-6xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-75 leading-tight">
            {heading}
          </h1>
          <p className="mt-6 text-lg leading-8 text-brand-gray/80 sm:text-xl max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            {subheading}
          </p>
        </div>
      </div>
    </section>
  );
}

