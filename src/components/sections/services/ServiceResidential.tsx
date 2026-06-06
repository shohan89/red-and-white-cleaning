import React from 'react';
import { Home, CheckCircle2, CalendarCheck2, Key, Tag } from 'lucide-react';

const scenarios = [
  {
    title: "Move In / Move Out",
    desc: "Just bought a home, preparing to list, or handing back a rental? We leave the space spotless — top to bottom — so you start fresh or impress the next person who walks through the door.",
    icon: Key,
  },
  {
    title: "Pre-Sale / Pre-Listing Clean",
    desc: "First impressions matter. Before listing your home, a thorough professional clean can make a real difference in how buyers perceive the space and how quickly it sells.",
    icon: Tag,
  },
  {
    title: "Ongoing Home Maintenance",
    desc: "Keep your home consistently clean without the effort. We offer weekly, bi-weekly, and monthly residential cleaning schedules tailored around your routine and your home.",
    icon: CalendarCheck2,
  },
  {
    title: "Deep / Reset Clean",
    desc: "When your home needs more than a regular tidy — after a renovation, a busy stretch, or just a seasonal reset — we do a thorough top-to-bottom clean to bring it back to its best.",
    icon: Home,
  },
];

const includedItems = [
  "Kitchen deep clean — counters, appliances, cabinets, sink",
  "Bathroom scrub-out — toilet, tub/shower, tiles, vanity",
  "Floors swept, mopped, and vacuumed throughout",
  "Dusting — baseboards, blinds, ceiling fans, light fixtures",
  "Interior windows cleaned",
  "Bedrooms tidied and wiped down",
  "Garbage and recycling removed",
];

export function ServiceResidential() {
  return (
    <section id="residential" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red font-medium mb-4">
            <Home className="h-4 w-4" />
            Service 5
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Residential Cleaning
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
            We bring the same professional standard we apply to construction sites and commercial buildings to residential homes. Whether you need a one-time deep clean or a recurring schedule, we work around your life — not the other way around.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Scenarios */}
          <div className="space-y-6">
            {scenarios.map((scenario, idx) => {
              const Icon = scenario.icon;
              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden bg-card p-8 rounded-2xl border border-border shadow-sm hover:border-brand-red/40 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-brand-red/1 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="relative z-10 flex gap-5 items-start">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-red/10 group-hover:bg-brand-red/20 transition-all duration-300">
                      <Icon className="h-6 w-6 text-brand-red group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-brand-red transition-colors duration-200 mb-3">
                        {scenario.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {scenario.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Details */}
          <div className="space-y-12">
            <div className="group relative overflow-hidden bg-card p-8 rounded-2xl border border-border shadow-sm hover:border-brand-red/30 transition-all duration-300 hover:shadow-md">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="h-8 w-1.5 rounded bg-brand-red" />
                What&apos;s Included
              </h3>
              <ul className="space-y-4">
                {includedItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-muted-foreground group/item hover:text-foreground transition-colors">
                    <CheckCircle2 className="h-6 w-6 text-brand-red shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                    <span className="transition-colors duration-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="group relative overflow-hidden bg-brand-red/3 p-8 rounded-2xl border border-brand-red/10 shadow-sm transition-all duration-300 hover:border-brand-red/30 hover:bg-brand-red/6 hover:shadow-md">
              <div className="absolute inset-0 bg-linear-to-br from-brand-red/2 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                  Who It&apos;s For
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Homeowners, new buyers, home sellers, landlords, and renters across KW Region, Guelph, Hamilton, London, Brantford, and surrounding areas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
