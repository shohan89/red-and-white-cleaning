import React from 'react';
import Image from 'next/image';
import { HardHat, CheckCircle2, Eye, Key } from 'lucide-react';

const phaseImages = [
  {
    phase: "Phase 1",
    label: "Phase 1 — Post-Construction Clean",
    src: "/images/portfolio/tricar-guelph-phase1-debris.jpeg",
    alt: "Construction debris in bathtub — typical Phase 1 post-construction cleanup at Tricar Guelph",
  },
  {
    phase: "Phase 2",
    label: "Phase 2 — PDI Clean",
    src: "/images/portfolio/tricar-guelph-pdi-3.jpg",
    alt: "Spotless suite with floor-to-ceiling windows ready for pre-delivery inspection at Tricar Guelph",
  },
  {
    phase: "Phase 3",
    label: "Phase 3 — Occupancy Clean",
    src: "/images/portfolio/tricar-guelph-phase3-staged.jpeg",
    alt: "Move-in ready living space after Phase 3 occupancy clean at Tricar Guelph",
  },
];

const phases = [
  {
    title: "Phase 1 — Post-Construction Cleaning",
    desc: "This is the heavy work. Concrete dust in every corner, drywall residue on every surface, construction adhesives stuck to windows and floors. Regular cleaning crews often aren't equipped for it. We are. We've cleaned new builds, commercial renovations, and tenant improvements across the region, and we know what contractors need — including tight handoff timelines.",
    icon: HardHat
  },
  {
    title: "Phase 2 — PDI Cleaning (Pre-Delivery Inspection)",
    desc: "Before a unit or space is handed over to the owner or tenant, it needs to be spotless for the walkthrough. PDI cleaning is a detailed, top-to-bottom clean specifically timed for that inspection — making sure every surface, fixture, and finish looks exactly the way it should on handover day.",
    icon: Eye
  },
  {
    title: "Phase 3 — Occupancy Cleaning",
    desc: "Once the keys are handed over and the new occupant is ready to move in, occupancy cleaning ensures the space is genuinely move-in ready — not just visually clean, but sanitized and safe. This is the final polish before people start living or working in the space.",
    icon: Key
  }
];

const includedItems = [
  "Removal of construction debris and waste",
  "Dust cleaning on all surfaces — ceilings, walls, fixtures, trim",
  "Window and glass cleaning (construction film and adhesive removal)",
  "Floor cleaning and polishing — concrete, tile, hardwood, LVP",
  "Kitchen and bathroom scrub-out",
"Final walk-through clean before handoff"
];

export function ServicePostConstruction() {
  return (
    <section id="post-construction" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red font-medium mb-4">
            <HardHat className="h-4 w-4" />
            Service 1
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Post-Construction Cleaning
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
            Post-construction cleaning isn't a single step — it's a three-phase process, and each one matters. We handle all three phases, and we coordinate with your project schedule so each clean happens at exactly the right time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Phases */}
          <div className="space-y-8">
            {phases.map((phase, idx) => {
              const Icon = phase.icon;
              return (
                <div 
                  key={idx} 
                  className="group relative overflow-hidden bg-card p-8 rounded-2xl border border-border shadow-sm hover:border-brand-red/40 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Subtle hover background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-red/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="relative z-10 flex gap-5 items-start">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-red/10 group-hover:bg-brand-red/20 transition-all duration-300">
                      <Icon className="h-6 w-6 text-brand-red group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-brand-red transition-colors duration-200 mb-3">
                        {phase.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {phase.desc}
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
                What's Included
              </h3>
              <ul className="space-y-4">
                {includedItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-muted-foreground group/item hover:text-foreground transition-colors">
                    <CheckCircle2 className="h-6 w-6 text-brand-red flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                    <span className="transition-colors duration-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="group relative overflow-hidden bg-brand-red/[0.03] p-8 rounded-2xl border border-brand-red/10 shadow-sm transition-all duration-300 hover:border-brand-red/30 hover:bg-brand-red/[0.06] hover:shadow-md">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-red/[0.02] to-transparent pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                  Who It's For
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  General contractors, developers, renovation companies, and project managers in KW Region, Guelph, Hamilton, London, Brantford, and surrounding areas.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Phase example photos */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
            <span className="h-8 w-1.5 rounded bg-brand-red" />
            Phase Clean Examples
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {phaseImages.map((img) => (
              <div key={img.phase} className="group rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg hover:border-brand-red/40 transition-all duration-300">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  <p className="absolute bottom-0 left-0 right-0 text-sm font-semibold text-white text-center py-3 px-4">
                    {img.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

