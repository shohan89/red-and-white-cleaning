"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BeforeAfterSlider } from "@/components/shared/BeforeAfterSlider";
import {
  Sparkles,
  HardHat,
  Building2,
  Calendar,
  MapPin,
  Eye,
  Home,
  Zap,
  type LucideIcon,
} from "lucide-react";

interface GalleryItem {
  id: string;
  category: string;
  title: string;
  desc: string;
  location: string;
  image?: string;
  alt?: string;
  beforeImage?: string;
  afterImage?: string;
  beforeAlt?: string;
  afterAlt?: string;
}

interface PortfolioGalleryProps {
  items?: GalleryItem[];
}

const SLUG_TO_ICON: Record<string, LucideIcon> = {
  "post-construction": HardHat,
  commercial: Building2,
  residential: Home,
  "before-after": Eye,
  "deep-clean": Calendar,
  specialty: Zap,
};

const SLUG_TO_LABEL: Record<string, string> = {
  "post-construction": "Post-Construction",
  commercial: "Commercial",
  residential: "Residential",
  "before-after": "Before & After",
  "deep-clean": "Deep Cleans",
  specialty: "Specialty Cleans",
};

const HARDCODED_ITEMS: GalleryItem[] = [
  { id: "tricar-1", category: "post-construction", title: "Tricar — 1882 Gordon Street", desc: "Multi-phase post-construction clean for Tricar's residential development. Full dust extraction, window film removal, floor polishing, and suite-by-suite occupancy prep.", location: "Guelph, ON", image: "/images/portfolio/tricar-guelph-common.webp", alt: "Team cleaning the common area corridor at Tricar 1882 Gordon Street Guelph Ontario" },
  { id: "tricar-const-1", category: "post-construction", title: "Tricar — Phase 1 Construction Clean", desc: "Phase 1 post-construction clean underway — debris cleared, drywall dust extracted, and surfaces prepped before PDI.", location: "Guelph, ON", image: "/images/portfolio/tricar-guelph-const-1.webp", alt: "Phase 1 post-construction clean in progress at Tricar 1882 Gordon Street Guelph" },
  { id: "tricar-const-2", category: "post-construction", title: "Tricar — Construction Debris Removal", desc: "Bathroom scrub-out during Phase 1 clean — construction debris, concrete dust, and surface residue fully removed before handoff.", location: "Guelph, ON", image: "/images/portfolio/tricar-guelph-const-2.webp", alt: "Bathroom construction debris removal during Phase 1 clean at Tricar Guelph" },
  { id: "tricar-pdi-2", category: "post-construction", title: "Tricar — PDI Clean in Progress", desc: "Phase 2 PDI clean — LVP floors swept and detailed, suite fully prepped for owner walkthrough.", location: "Guelph, ON", image: "/images/portfolio/tricar-guelph-pdi-2.webp", alt: "PDI clean in progress at Tricar 1882 Gordon Street Guelph Ontario" },
  { id: "tricar-pdi-3", category: "post-construction", title: "Tricar — Pre-Delivery Inspection Ready", desc: "Suite prepped and cleaned for the pre-delivery inspection — every surface spotless before the new owner's walkthrough.", location: "Guelph, ON", image: "/images/portfolio/tricar-guelph-pdi-3.webp", alt: "Suite ready for pre-delivery inspection at Tricar 1882 Gordon Street Guelph" },
  { id: "tricar-pdi-4", category: "post-construction", title: "Tricar — Exterior Window Clean", desc: "Exterior window cleaning from the balcony level — construction film and adhesive removed for a crystal-clear finish.", location: "Guelph, ON", image: "/images/portfolio/tricar-guelph-pdi-4.webp", alt: "Worker cleaning exterior windows at Tricar 1882 Gordon Street Guelph" },
  { id: "tricar-1b", category: "post-construction", title: "Tricar — Occupancy Clean (Bathroom)", desc: "Phase 3 occupancy clean — bathroom and suite interiors prepped and sanitized before handover to new residents.", location: "Guelph, ON", image: "/images/portfolio/tricar-guelph-occupancy.webp", alt: "Pristine bathroom after occupancy clean at Tricar 1882 Gordon Street Guelph Ontario" },
  { id: "tricar-occ-1", category: "post-construction", title: "Tricar — Suite Ready for Move-In", desc: "Phase 3 occupancy clean complete — suite entry and living area spotless and move-in ready.", location: "Guelph, ON", image: "/images/portfolio/tricar-guelph-occ-1.webp", alt: "Clean suite entry ready for move-in at Tricar 1882 Gordon Street Guelph" },
  { id: "tricar-occ-2", category: "post-construction", title: "Tricar — Laundry Area After Occupancy Clean", desc: "Laundry room detailed and sanitized as part of the Phase 3 occupancy clean — appliances wiped down, floors polished.", location: "Guelph, ON", image: "/images/portfolio/tricar-guelph-occ-2.webp", alt: "Clean laundry room with stacked washer dryer after occupancy clean at Tricar Guelph" },
  { id: "tricar-occ-3", category: "post-construction", title: "Tricar — Bedroom Ready for Handover", desc: "Master bedroom with floor-to-ceiling windows cleaned and polished — spotless and staged for the new resident.", location: "Guelph, ON", image: "/images/portfolio/tricar-guelph-occ-3.webp", alt: "Clean bedroom with large window view after occupancy clean at Tricar Guelph" },
  { id: "tricar-2", category: "post-construction", title: "Tricar — 25 Sportsworld Tower 2", desc: "Phase 1, 2, and 3 cleans coordinated with the Tricar project schedule. Construction debris removal, PDI cleaning, and final occupancy prep completed on time.", location: "Kitchener, ON", image: "/images/portfolio/tricar-sportsworld.webp", alt: "Tricar 25 Sportsworld Tower 2 Kitchener Ontario post-construction cleaning" },
  { id: "sylk-1", category: "post-construction", title: "Zehr Group — Sylk Towers", desc: "Full post-construction cleaning program for the Sylk Towers development by Zehr Group. Coordinated all three phases across multiple floors and unit types.", location: "3241 King Street East, Kitchener, ON", image: "/images/portfolio/zehr-sylk.webp", alt: "Zehr Group Sylk Towers Kitchener Ontario post-construction cleaning" },
  { id: "tricar-area-1", category: "commercial", title: "Tricar — Lobby Corridor After Clean", desc: "Finished common area lobby corridor — marble-finish tile floors polished, walls wiped, and lighting surrounds detailed.", location: "Guelph, ON", image: "/images/portfolio/tricar-guelph-area-1.webp", alt: "Clean modern lobby corridor at Tricar 1882 Gordon Street Guelph Ontario" },
  { id: "tricar-area-2", category: "commercial", title: "Tricar — Common Area Clean in Progress", desc: "Crew working through the common area corridor — floor scrubbing, wall wipe-down, and wet-floor safety protocol in place.", location: "Guelph, ON", image: "/images/portfolio/tricar-guelph-area-2.webp", alt: "Worker cleaning common area corridor at Tricar 1882 Gordon Street Guelph Ontario" },
  { id: "tricar-area-3", category: "commercial", title: "Tricar — Corridor Completed", desc: "Long common area hallway after a thorough clean — every surface wiped, floors polished edge-to-edge.", location: "Guelph, ON", image: "/images/portfolio/tricar-guelph-area-3.webp", alt: "Long clean corridor at Tricar 1882 Gordon Street Guelph Ontario" },
  { id: "tricar-win-1", category: "commercial", title: "Tricar — Window Clean Team (Interior)", desc: "Full window cleaning crew tackling high-rise balcony glazing from inside — three cleaners working simultaneously on floor-to-ceiling windows.", location: "Guelph, ON", image: "/images/portfolio/tricar-guelph-win-1.webp", alt: "Three cleaners cleaning large balcony windows from inside at Tricar Guelph high-rise" },
  { id: "tricar-win-2", category: "commercial", title: "Tricar — Exterior Window Crew", desc: "Window cleaning team working the exterior balcony level with squeegees — construction film removed for a spotless finish.", location: "Guelph, ON", image: "/images/portfolio/tricar-guelph-win-2.webp", alt: "Window cleaning crew on exterior balcony at Tricar 1882 Gordon Street Guelph" },
  { id: "tricar-win-3", category: "commercial", title: "Tricar — Balcony & Sliding Door Clean", desc: "Pressure washing and detail cleaning of balcony tiles and sliding door track — thorough post-construction clean of all exterior surfaces.", location: "Guelph, ON", image: "/images/portfolio/tricar-guelph-win-3.webp", alt: "Worker pressure washing balcony at Tricar 1882 Gordon Street Guelph" },
  { id: "tricar-win-4", category: "commercial", title: "Tricar — Full Window Cleaning Team", desc: "Four-person crew cleaning floor-to-ceiling windows in a high-rise suite — construction adhesive removed, glass polished to crystal clarity.", location: "Guelph, ON", image: "/images/portfolio/tricar-guelph-win-4.webp", alt: "Four cleaners working floor-to-ceiling windows at Tricar Guelph" },
  { id: "colonia-1", category: "commercial", title: "Colonia Treuhand — Commercial Unit", desc: "Ongoing commercial cleaning contract for CTPM's commercial unit. Regular scheduled maintenance keeping the space presentable and professionally clean.", location: "609 Kumpf Drive, Unit 106, Kitchener, ON", image: "/images/portfolio/ctpm-commercial.webp", alt: "Commercial cleaning at 609 Kumpf Drive Unit 106 Kitchener Ontario" },
  { id: "ctpm-2", category: "commercial", title: "CTPM — Office Space After Clean", desc: "LVP floors cleaned and polished, industrial-window glass wiped down — clean and professional workspace ready for use.", location: "609 Kumpf Drive, Kitchener, ON", image: "/images/portfolio/ctpm-2.webp", alt: "Clean commercial office space with LVP floors at CTPM Kitchener" },
  { id: "ctpm-3", category: "commercial", title: "CTPM — Post-Construction Office Clean", desc: "Commercial unit after construction — debris removed, surfaces cleaned, and floors restored to working condition.", location: "609 Kumpf Drive, Kitchener, ON", image: "/images/portfolio/ctpm-3.webp", alt: "Post-construction clean of commercial office space at CTPM 609 Kumpf Drive Kitchener" },
  { id: "ctpm-4", category: "commercial", title: "CTPM — Epoxy Floor Commercial Space", desc: "Commercial unit with epoxy-coated floors cleaned and buffed — a two-zone layout detailed end to end.", location: "609 Kumpf Drive, Kitchener, ON", image: "/images/portfolio/ctpm-4.webp", alt: "Clean commercial space with epoxy floor at CTPM Kitchener Ontario" },
  { id: "ctpm-5", category: "commercial", title: "CTPM — Kitchenette & Break Room", desc: "Commercial kitchenette area cleaned top to bottom — cabinets wiped, sink sanitized, and speckled floors polished.", location: "609 Kumpf Drive, Kitchener, ON", image: "/images/portfolio/ctpm-5.webp", alt: "Clean commercial kitchenette with dark cabinets at CTPM 609 Kumpf Drive Kitchener" },
  { id: "res-bathroom", category: "residential", title: "Residential Deep Clean — Bathroom", desc: "Complete before-and-after bathroom transformation. Tile scrub-out, tub restoration, toilet sanitization, and full surface wipe-down.", location: "Southern Ontario", image: "/images/portfolio/residential-bathroom-ba.webp", alt: "Before and after bathroom deep clean by Red and White Cleaning Services" },
  { id: "res-kitchen", category: "residential", title: "Residential Deep Clean — Kitchen", desc: "Full kitchen deep clean — cabinets degreased and wiped down, appliances scrubbed, counters restored, and floors cleaned to a spotless finish.", location: "Southern Ontario", image: "/images/portfolio/residential-kitchen-ba.webp", alt: "Before and after kitchen deep clean by Red and White Cleaning Services" },
  { id: "res-sink", category: "residential", title: "Residential Deep Clean — Under-Sink", desc: "Even the spaces no one sees — under-sink cabinet completely cleaned out and sanitized as part of a full residential deep clean.", location: "Southern Ontario", image: "/images/portfolio/residential-sink-ba.webp", alt: "Before and after under-sink cabinet clean by Red and White Cleaning Services" },
  { id: "gen-1", category: "specialty", title: "71 Wyndham — Generator Room Clean", desc: "Mechanical room deep clean — generator units detailed, floors swept and mopped, and all surfaces wiped around active equipment.", location: "71 Wyndham Street, Guelph, ON", image: "/images/portfolio/generator-1.webp", alt: "Worker cleaning generator equipment in mechanical room at 71 Wyndham Guelph" },
  { id: "gen-2", category: "specialty", title: "71 Wyndham — Mechanical Room Piping", desc: "Industrial piping system cleaned — white PVC pipes, red pump motors, and surrounding concrete floor all detailed.", location: "71 Wyndham Street, Guelph, ON", image: "/images/portfolio/generator-2.webp", alt: "Clean white industrial piping and red pump in mechanical room at 71 Wyndham Guelph" },
  { id: "gen-3", category: "specialty", title: "71 Wyndham — Industrial Chiller Units", desc: "Two large industrial chillers cleaned and detailed — surrounding floors swept and mopped, all surfaces dust-free.", location: "71 Wyndham Street, Guelph, ON", image: "/images/portfolio/generator-3.webp", alt: "Two industrial chiller units in clean mechanical room at 71 Wyndham Guelph" },
  { id: "gen-4", category: "specialty", title: "71 Wyndham — Full Mechanical Room", desc: "Entire mechanical room cleaned from floor to ceiling — generators, fire suppression systems, piping, and epoxy floors all restored to pristine condition.", location: "71 Wyndham Street, Guelph, ON", image: "/images/portfolio/generator-4.webp", alt: "Full clean mechanical room with generators and fire suppression at 71 Wyndham Guelph" },
];

export function PortfolioGallery({ items }: PortfolioGalleryProps) {
  const displayItems = items && items.length > 0 ? items : HARDCODED_ITEMS;

  const seenSlugs = new Set<string>();
  const categorySlugs: string[] = [];
  for (const item of displayItems) {
    if (!seenSlugs.has(item.category)) {
      seenSlugs.add(item.category);
      categorySlugs.push(item.category);
    }
  }

  const TABS = [
    { id: "all", label: "All Cleans", icon: Sparkles },
    ...categorySlugs.map((slug) => ({
      id: slug,
      label:
        SLUG_TO_LABEL[slug] ??
        slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      icon: SLUG_TO_ICON[slug] ?? Sparkles,
    })),
  ];

  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredItems = displayItems.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12 sm:mb-16">
          {TABS.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 border ${
                  isActive
                    ? "bg-brand-red border-brand-red text-brand-white shadow-md"
                    : "bg-card border-border text-muted-foreground hover:text-brand-red hover:border-brand-red/30 hover:bg-brand-red/[0.02]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
          {filteredItems.map((item) => {
            const isBeforeAfter = !!(item.beforeImage && item.afterImage);

            if (isBeforeAfter) {
              return (
                <div
                  key={item.id}
                  className="lg:col-span-2 flex flex-col gap-4 bg-card p-4 sm:p-6 rounded-3xl border border-border shadow-sm group hover:border-brand-red/20 transition-all duration-300"
                >
                  <div className="relative w-full overflow-hidden rounded-2xl">
                    <BeforeAfterSlider
                      beforeImage={item.beforeImage!}
                      afterImage={item.afterImage!}
                      beforeAlt={item.beforeAlt}
                      afterAlt={item.afterAlt}
                    />
                  </div>
                  <div className="pt-2 px-2">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-red/10 text-brand-red text-xs font-semibold uppercase tracking-wider border border-brand-red/20">
                        Before & After Clean
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-medium">
                        <MapPin className="h-3.5 w-3.5 text-brand-red" />
                        {item.location}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-brand-red transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-4 sm:p-6 shadow-sm hover:border-brand-red/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-muted mb-6">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.alt || ""}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1 bg-brand-dark/85 backdrop-blur-sm text-brand-white text-xs font-bold uppercase px-3 py-1.5 rounded-lg shadow-sm border border-brand-white/10">
                      <MapPin className="h-3 w-3 text-brand-red" />
                      {item.location}
                    </div>
                  </div>
                  <div className="px-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-brand-red/10 text-brand-red text-xs font-semibold uppercase tracking-wider border border-brand-red/20 mb-3">
                      {SLUG_TO_LABEL[item.category] ?? item.category.replace(/-/g, " ")}
                    </span>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-brand-red transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
