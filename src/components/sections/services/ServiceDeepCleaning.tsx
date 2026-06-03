import React from 'react';
import { Sparkles, Truck, CalendarCheck, Building, Home } from 'lucide-react';

const scenarios = [
  {
    title: "Move In / Move Out",
    desc: "Before or after a commercial tenant moves in or out of a space, making it pristine and ready for handover.",
    icon: Truck
  },
  {
    title: "Seasonal / Annual Clean",
    desc: "Thorough deep cleaning to rejuvenate office spaces and maintain high health and safety standards throughout the year.",
    icon: CalendarCheck
  },
  {
    title: "Post-Event / Post-Reno",
    desc: "Fast, comprehensive cleanup after corporate events or minor office renovations to restore order instantly.",
    icon: Sparkles
  },
  {
    title: "Pre-Sale / Pre-Inspection",
    desc: "Elevate your property's visual appeal and cleanliness ahead of critical inspections or prospective buyer walkthroughs.",
    icon: Building
  },
  {
    title: "Airbnb Deep Cleanings",
    desc: "Deep visual sanitization and meticulous turnaround services specifically tailored for top-rated Airbnb properties.",
    icon: Home
  }
];

export function ServiceDeepCleaning() {
  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Visual abstract details */}
      <div className="absolute left-10 bottom-10 w-[300px] h-[300px] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Service 3
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-6">
            Deep Cleaning
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Sometimes a space needs more than routine maintenance. A deep clean is a thorough, top-to-bottom scrub of a space that hasn't had proper attention in a while — or that needs to be returned to like-new condition.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {scenarios.map((scenario, idx) => {
            const Icon = scenario.icon;
            return (
              <div 
                key={idx} 
                className="group relative overflow-hidden bg-card p-8 rounded-2xl border border-border shadow-sm hover:border-brand-red/40 hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Subtle gradient background overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-red/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/10 group-hover:bg-brand-red/20 transition-all duration-300">
                    <Icon className="h-6 w-6 text-brand-red group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-foreground group-hover:text-brand-red transition-colors duration-200">
                    {scenario.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {scenario.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

