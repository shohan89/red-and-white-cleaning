import React from 'react';
import Image from 'next/image';

interface AboutHeroContent {
  heading?: string
  subheading?: string
}

export function AboutHeader({ content = {} }: { content?: AboutHeroContent }) {
  const heading = content.heading ?? "We're a Commercial and Construction Cleaning Company That Gets It Done"
  const subheading = content.subheading ?? "Red and White Cleaning Services LTD is a locally operated cleaning company based in the KW Region, serving contractors, property managers, and businesses across Southern Ontario."

  return (
    <section className="relative overflow-hidden bg-brand-dark pt-32 pb-20 lg:pt-48 lg:pb-32">
      {/* Background image & overlays */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/images/about-header.png"
          alt="Professional commercial cleaning team"
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
          <h1 className="text-4xl font-bold tracking-tight text-brand-white sm:text-5xl md:text-6xl animate-in fade-in slide-in-from-bottom-8 duration-700">
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
