import React from 'react';
import { MapPin } from 'lucide-react';

const cities = [
  "Kitchener",
  "Waterloo",
  "Cambridge",
  "Guelph",
  "Hamilton",
  "London",
  "Brantford"
];

export function ServiceArea() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center justify-center p-3 mb-6 bg-brand-red/10 rounded-full">
            <MapPin className="h-8 w-8 text-brand-red" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
            Our Service Area
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            We're proud to serve communities across Southern Ontario — including Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London, Brantford, and the surrounding region. We travel to where the work is.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {cities.map((city) => (
              <span 
                key={city}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium border border-border"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
