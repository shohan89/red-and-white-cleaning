"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BeforeAfterSlider } from "@/components/shared/BeforeAfterSlider";
import { Sparkles, HardHat, Building2, Calendar, MapPin, Eye } from "lucide-react";

interface GalleryItem {
  id: string;
  category: "post-construction" | "commercial" | "deep-clean" | "before-after";
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

const CATEGORIES = [
  { id: "all", label: "All Cleans", icon: Sparkles },
  { id: "post-construction", label: "Post-Construction", icon: HardHat },
  { id: "commercial", label: "Commercial Office", icon: Building2 },
  { id: "before-after", label: "Before & After", icon: Eye },
  { id: "deep-clean", label: "Deep Cleans", icon: Calendar },
] as const;

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "pc-1",
    category: "post-construction",
    title: "Luxury Condo Complex Occupancy Clean",
    desc: "Detailed multi-phase cleanup of a newly built 120-unit luxury condominium. Drywall dust, construction residues, and paint films were fully removed before final handover.",
    location: "Kitchener, ON",
    image: "/images/portfolio/post-construction-1.png",
    alt: "Post-construction cleaning completed by Red and White Cleaning Services in Kitchener Ontario"
  },
  {
    id: "ba-1",
    category: "before-after",
    title: "Downtown Commercial Suite Renovation Turnaround",
    desc: "Drag the slider handles to see the dramatic transition from rough post-construction drywall plaster dust to a pristine, move-in-ready corporate workspace.",
    location: "Hamilton, ON",
    beforeImage: "/images/portfolio/before-1.png",
    afterImage: "/images/portfolio/after-1.png",
    beforeAlt: "Renovation site with drywall dust before cleanup by Red and White Cleaning in Hamilton Ontario",
    afterAlt: "Sparkling clean commercial office after post-construction cleaning by Red and White Cleaning in Hamilton Ontario"
  },
  {
    id: "comm-1",
    category: "commercial",
    title: "Tech Hub Main Entrance & Lobby Care",
    desc: "Ongoing maintenance contract for a modern corporate office, highlighting polished concrete floors, reflective glass panels, and dust-free communal zones.",
    location: "Waterloo, ON",
    image: "/images/portfolio/commercial-1.png",
    alt: "Commercial office cleaning performed by Red and White Cleaning Services in Waterloo Ontario"
  },
  {
    id: "deep-1",
    category: "deep-clean",
    title: "Bistro 1876 Restaurant Deep Kitchen Scrub",
    desc: "Deep sanitation clean-out of kitchen stations, grease traps, high-intensity stainless steel prep lines, and anti-slip tiled flooring for inspection compliance.",
    location: "Guelph, ON",
    image: "/images/portfolio/deep-clean-1.png",
    alt: "Industrial deep cleaning of a commercial kitchen by Red and White Cleaning Services in Guelph Ontario"
  }
];

export function PortfolioGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12 sm:mb-16">
          {CATEGORIES.map((cat) => {
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

        {/* Gallery Grid */}
        <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
          {filteredItems.map((item) => {
            const isBeforeAfter = item.category === "before-after";

            if (isBeforeAfter && item.beforeImage && item.afterImage) {
              return (
                <div 
                  key={item.id} 
                  className="lg:col-span-2 flex flex-col gap-4 bg-card p-4 sm:p-6 rounded-3xl border border-border shadow-sm group hover:border-brand-red/20 transition-all duration-300"
                >
                  <div className="relative w-full overflow-hidden rounded-2xl">
                    <BeforeAfterSlider
                      beforeImage={item.beforeImage}
                      afterImage={item.afterImage}
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
                  {/* Image container */}
                  <div className="relative w-full h-[250px] sm:h-[320px] overflow-hidden rounded-2xl bg-muted mb-6">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.alt || ""}
                        fill
                        sizes="(max-w-768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    
                    {/* Geotag Overlay badge */}
                    <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1 bg-brand-dark/85 backdrop-blur-sm text-brand-white text-xs font-bold uppercase px-3 py-1.5 rounded-lg shadow-sm border border-brand-white/10">
                      <MapPin className="h-3 w-3 text-brand-red" />
                      {item.location}
                    </div>
                  </div>

                  <div className="px-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-brand-red/10 text-brand-red text-xs font-semibold uppercase tracking-wider border border-brand-red/20 mb-3">
                      {item.category.replace("-", " ")}
                    </span>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-brand-red transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
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
