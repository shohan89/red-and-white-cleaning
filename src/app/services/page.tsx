import React from 'react';
import { Metadata } from 'next';
import { ServicesHeader } from '@/components/sections/services/ServicesHeader';
import { ServicePostConstruction } from '@/components/sections/services/ServicePostConstruction';
import { ServiceCommercial } from '@/components/sections/services/ServiceCommercial';
import { ServiceDeepCleaning } from '@/components/sections/services/ServiceDeepCleaning';
import { ServiceMaintenance } from '@/components/sections/services/ServiceMaintenance';
import { ServicesCTA } from '@/components/sections/services/ServicesCTA';

export const metadata: Metadata = {
  title: 'Commercial & Construction Cleaning Services | KW, Guelph, Hamilton, Ontario |',
  description: 'Red and White Cleaning Services offers post-construction cleaning, commercial cleaning, deep cleaning, and ongoing maintenance across KW Region and Southern Ontario.',
};

export default function ServicesPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <ServicesHeader />
      <ServicePostConstruction />
      <ServiceCommercial />
      <ServiceDeepCleaning />
      <ServiceMaintenance />
      <ServicesCTA />
    </main>
  );
}
