import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { ContactInfo } from '@/components/sections/contact/ContactInfo';
import { ContactForm } from '@/components/sections/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Red and White Cleaning Services | Free Quote | KW & Southern Ontario',
  description: 'Get in touch with Red and White Cleaning Services LTD for a free quote on post-construction or commercial cleaning in KW Region, Guelph, Hamilton, London, Brantford, and surrounding areas.',
};

export default function ContactPage() {
  // Generate LocalBusiness JSON-LD Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Red and White Cleaning Services LTD",
    "telephone": "519-574-1552",
    "email": "Redandwhiteclean@gmail.com",
    "url": "https://redandwhitecleaning.ca/contact",
    "description": "Post-construction and commercial cleaning services across KW Region, Guelph, Hamilton, London, Brantford, and surrounding areas.",
    "areaServed": [
      { "@type": "City", "name": "Kitchener" },
      { "@type": "City", "name": "Waterloo" },
      { "@type": "City", "name": "Cambridge" },
      { "@type": "City", "name": "Guelph" },
      { "@type": "City", "name": "Hamilton" },
      { "@type": "City", "name": "London" },
      { "@type": "City", "name": "Brantford" }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "ON",
      "addressCountry": "CA"
    }
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Contact Header */}
      <section className="relative overflow-hidden bg-brand-dark pt-32 pb-20 lg:pt-48 lg:pb-32">
        {/* Background image & overlays */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/images/contact-header.png"
            alt="Friendly and professional commercial cleaning company representative"
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
            <h1 className="text-4xl font-bold tracking-tight text-brand-white sm:text-5xl md:text-6xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-75 leading-tight">
              Get a Free Quote — We'll Get Back to You Fast
            </h1>
            <p className="mt-6 text-lg leading-8 text-brand-gray/80 sm:text-xl max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
              Fill out the form below, call us, or send an email. We respond to all inquiries within the same business day.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 lg:py-24 bg-background relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-7xl mx-auto">
            {/* Left Column: Contact Information */}
            <div className="h-full">
              <ContactInfo />
            </div>
            
            {/* Right Column: Contact Form */}
            <div className="h-full lg:sticky lg:top-24">
              <ContactForm />
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="max-w-7xl mx-auto mt-24">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
                Our Service Area
              </h2>
              <p className="text-muted-foreground mt-2">Proudly serving Southern Ontario.</p>
            </div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d185449.60838127494!2d-80.57591605969562!3d43.43126042971261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf48c03ee5105%3A0x9525f8e6df5f544b!2sKitchener%2C%20ON!5e0!3m2!1sen!2sca!4v1700000000000!5m2!1sen!2sca" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade" 
              className="rounded-2xl shadow-lg border border-border"
              title="Red and White Cleaning Services Service Area"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
