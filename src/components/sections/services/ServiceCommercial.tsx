import React from 'react';
import { Building2, CheckCircle2, Briefcase } from 'lucide-react';

const includedItems = [
  "Office and common area cleaning",
  "Restroom sanitizing and restocking",
  "Kitchen and lunchroom cleaning",
  "Floor care — vacuuming, mopping, buffing",
  "Window cleaning (interior)",
  "Trash removal",
  "Dusting — desks, shelving, lighting, vents",
  "Full Airbnb cleaning"
];

export function ServiceCommercial() {
  return (
    <section className="py-20 lg:py-32 bg-muted/30 border-y border-border relative overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:items-center">
          
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red font-medium mb-4">
              <Building2 className="h-4 w-4" />
              Service 2
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-6">
              Commercial Cleaning
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                We clean commercial properties — offices, warehouses, retail spaces, Airbnb units and more. Whether you need a one-time deep clean or a regular schedule, we can handle it.
              </p>
              <p>
                Our commercial cleaning clients range from small offices to large commercial facilities. We work during off-hours when needed so your business operations aren't interrupted.
              </p>
            </div>
            
            <div className="mt-8 group relative overflow-hidden bg-card p-6 rounded-2xl border border-border shadow-sm hover:border-brand-red/30 transition-all duration-300 hover:shadow-md">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-red/[0.01] to-transparent pointer-events-none" />
              <div className="relative z-10 flex gap-4 items-start">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red group-hover:bg-brand-red/20 transition-all duration-300">
                  <Briefcase className="h-5 w-5 text-brand-red group-hover:scale-115 transition-transform" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-brand-red transition-colors duration-200">
                    Who It's For
                  </h3>
                  <p className="text-muted-foreground">
                    Property managers, business owners, and facility managers across KW Region, Guelph, Hamilton, London, Brantford, and surrounding communities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="group relative overflow-hidden bg-card p-8 rounded-2xl border border-border shadow-sm h-full hover:border-brand-red/40 hover:shadow-md transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-red/[0.01] to-transparent pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="h-8 w-1.5 rounded bg-brand-red" />
                  What's Included
                </h3>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {includedItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground group/item hover:text-foreground transition-colors duration-200">
                      <CheckCircle2 className="h-5 w-5 text-brand-red flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-200" />
                      <span className="transition-colors duration-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

