import React from 'react';
import { Metadata } from 'next';
import { AboutHeader } from '@/components/sections/about/AboutHeader';
import { OurStory } from '@/components/sections/about/OurStory';
import { WhatMakesUsDifferent } from '@/components/sections/about/WhatMakesUsDifferent';
import { ServiceArea } from '@/components/sections/about/ServiceArea';
import { AboutCTA } from '@/components/sections/about/AboutCTA';

export const metadata: Metadata = {
  title: 'About Red and White Cleaning Services LTD | Commercial Cleaning KW Ontario',
  description: 'Learn about Red and White Cleaning Services — a Southern Ontario cleaning company specializing in construction and commercial cleaning.',
};

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <AboutHeader />
      <OurStory />
      <WhatMakesUsDifferent />
      <ServiceArea />
      <AboutCTA />
    </main>
  );
}
