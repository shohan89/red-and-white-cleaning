import React from 'react';
import { CalendarClock, CalendarCheck2 } from 'lucide-react';

const contractPlans = [
  {
    title: "Weekly Plan",
    frequency: "1–5 times per week",
    desc: "Maximum hygiene, sanitization, and presentation for high-traffic active environments.",
    bestFor: "Corporate offices, retail storefronts, medical clinics, and gyms."
  },
  {
    title: "Bi-Weekly Plan",
    frequency: "Every two weeks",
    desc: "The ideal balance of consistent janitorial maintenance and excellent monthly value.",
    bestFor: "Mid-sized professional offices, design showrooms, and local shops."
  },
  {
    title: "Monthly Plan",
    frequency: "Once per month",
    desc: "Comprehensive visual refresh and high-level deep cleaning for lower-traffic spaces.",
    bestFor: "Warehouses, storage facilities, archives, and quiet depots."
  }
];

export function ServiceMaintenance() {
  return (
    <section className="py-20 lg:py-32 bg-brand-dark text-brand-white relative overflow-hidden">
      {/* Dark mode glow meshes */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-brand-red/15 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none opacity-30" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Top Split Layout */}
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          <div className="md:w-1/3 flex justify-center">
            <div className="group relative bg-brand-red/10 p-10 rounded-full border border-brand-red/20 transition-all duration-500 hover:scale-105 hover:bg-brand-red/20 hover:border-brand-red/35">
              <div className="absolute inset-0 bg-brand-red/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <CalendarClock className="h-24 w-24 text-brand-red relative z-10" />
            </div>
          </div>
          
          <div className="md:w-2/3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/20 border border-brand-red/30 text-brand-red font-medium mb-4">
              <CalendarCheck2 className="h-4 w-4" />
              Service 4
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">
              Ongoing Commercial Cleaning Contracts
            </h2>
            <p className="text-lg text-brand-gray/80 leading-relaxed mb-6">
              We offer recurring cleaning contracts for commercial clients who need reliable, scheduled service. Weekly, bi-weekly, or monthly — we build a schedule around your space and your needs.
            </p>
            <p className="text-lg font-semibold text-brand-white flex items-center justify-center md:justify-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
              Ongoing clients get priority scheduling and a consistent cleaning crew who know your space.
            </p>
          </div>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3 mt-16 max-w-5xl mx-auto">
          {contractPlans.map((plan, idx) => (
            <div 
              key={idx} 
              className="group relative overflow-hidden bg-brand-white/[0.03] p-8 rounded-2xl border border-brand-white/10 hover:border-brand-red/50 hover:bg-brand-white/[0.06] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="inline-block text-xs font-semibold uppercase tracking-[0.1em] text-brand-red bg-brand-red/15 px-3 py-1 rounded-full mb-4 border border-brand-red/20 group-hover:bg-brand-red/25 transition-all duration-300">
                  {plan.frequency}
                </div>
                <h3 className="text-xl font-bold text-brand-white mb-3 group-hover:text-brand-red transition-colors duration-200">
                  {plan.title}
                </h3>
                <p className="text-sm text-brand-gray/70 leading-relaxed mb-6">
                  {plan.desc}
                </p>
              </div>
              
              <div className="relative z-10 border-t border-brand-white/10 pt-4 mt-auto">
                <span className="text-xs text-brand-gray/40 block mb-1">BEST FOR</span>
                <span className="text-sm font-medium text-brand-white/95">{plan.bestFor}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

