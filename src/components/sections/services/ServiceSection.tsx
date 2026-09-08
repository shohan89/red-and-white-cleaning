import React from 'react';
import Image from 'next/image';
import {
  HardHat, Eye, Key, Building2, Briefcase, Sparkles, CalendarClock, CalendarCheck2,
  Home, Truck, CalendarCheck, Building, Tag, CheckCircle2,
  Wrench, Star, Shield, Clock, Users,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  'hard-hat': HardHat,
  eye: Eye,
  key: Key,
  'building-2': Building2,
  briefcase: Briefcase,
  sparkles: Sparkles,
  'calendar-clock': CalendarClock,
  'calendar-check-2': CalendarCheck2,
  home: Home,
  truck: Truck,
  'calendar-check': CalendarCheck,
  building: Building,
  tag: Tag,
  wrench: Wrench,
  star: Star,
  shield: Shield,
  clock: Clock,
  users: Users,
};

function resolveIcon(name?: string | null): LucideIcon {
  return (name && ICON_MAP[name]) || Sparkles;
}

interface ServicePhaseData {
  id: string;
  title: string;
  description: string;
  icon?: string | null;
  frequency?: string | null;
  bestFor?: string | null;
}

interface ServiceImageData {
  id: string;
  imageUrl: string;
  altText?: string | null;
  phaseLabel?: string | null;
  objectPosition?: string | null;
}

interface ServiceIncludedItemData {
  id: string;
  text: string;
}

export interface ServiceSectionData {
  id: string;
  slug: string;
  label?: string | null;
  title: string;
  description: string;
  targetAudienceText?: string | null;
  icon?: string | null;
  phases: ServicePhaseData[];
  includedItems: ServiceIncludedItemData[];
  images: ServiceImageData[];
}

function paragraphs(text: string): string[] {
  return text.split(/\n{2,}/).filter(Boolean);
}

// ─── Shared pieces ──────────────────────────────────────────────────────────

function Badge({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red font-medium mb-4">
      <Icon className="h-4 w-4" />
      {label}
    </div>
  );
}

function IncludedItemsCard({ items, twoCol }: { items: ServiceIncludedItemData[]; twoCol?: boolean }) {
  return (
    <div className="group relative overflow-hidden bg-card p-8 rounded-2xl border border-border shadow-sm hover:border-brand-red/30 transition-all duration-300 hover:shadow-md">
      <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
        <span className="h-8 w-1.5 rounded bg-brand-red" />
        What&apos;s Included
      </h3>
      <ul className={twoCol ? 'grid sm:grid-cols-2 gap-4' : 'space-y-4'}>
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-3 text-muted-foreground group/item hover:text-foreground transition-colors duration-200">
            <CheckCircle2 className="h-5 w-5 text-brand-red flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-200" />
            <span className="transition-colors duration-200">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WhoItsForCard({ text }: { text: string }) {
  return (
    <div className="group relative overflow-hidden bg-brand-red/[0.03] p-8 rounded-2xl border border-brand-red/10 shadow-sm transition-all duration-300 hover:border-brand-red/30 hover:bg-brand-red/[0.06] hover:shadow-md">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-red/[0.02] to-transparent pointer-events-none" />
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
          Who It&apos;s For
        </h3>
        <p className="text-muted-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function WhoItsForInline({ text }: { text: string }) {
  return (
    <div className="mt-8 group relative overflow-hidden bg-card p-6 rounded-2xl border border-border shadow-sm hover:border-brand-red/30 transition-all duration-300 hover:shadow-md">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-red/[0.01] to-transparent pointer-events-none" />
      <div className="relative z-10 flex gap-4 items-start">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red group-hover:bg-brand-red/20 transition-all duration-300">
          <Briefcase className="h-5 w-5 text-brand-red group-hover:scale-115 transition-transform" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-brand-red transition-colors duration-200">
            Who It&apos;s For
          </h3>
          <p className="text-muted-foreground">{text}</p>
        </div>
      </div>
    </div>
  );
}

function ExamplesGrid({ images }: { images: ServiceImageData[] }) {
  return (
    <div className="mt-20">
      <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
        <span className="h-8 w-1.5 rounded bg-brand-red" />
        Phase Clean Examples
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img.id} className="group rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg hover:border-brand-red/40 transition-all duration-300">
            <div className="relative w-full aspect-4/3">
              <Image
                src={img.imageUrl}
                alt={img.altText ?? ''}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                style={img.objectPosition ? { objectPosition: img.objectPosition } : undefined}
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              {img.phaseLabel && (
                <p className="absolute bottom-0 left-0 right-0 text-sm font-semibold text-white text-center py-3 px-4 backdrop-blur-md bg-white/10 border-t border-white/20">
                  {img.phaseLabel}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Layout A: phases-split (Post-Construction, Residential) ──────────────

function PhasesSplitLayout({ service, alt }: { service: ServiceSectionData; alt: boolean }) {
  const BadgeIcon = resolveIcon(service.icon);
  const paras = paragraphs(service.description);
  return (
    <section id={service.slug} className={`py-20 lg:py-32 relative overflow-hidden ${alt ? 'bg-muted/30 border-y border-border' : 'bg-background'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16">
          <Badge icon={BadgeIcon} label={service.label ?? service.title} />
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {service.title}
          </h2>
          {paras.map((p, i) => (
            <p key={i} className="mt-4 text-lg text-muted-foreground max-w-3xl">
              {p}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            {service.phases.map((phase) => {
              const Icon = resolveIcon(phase.icon);
              return (
                <div
                  key={phase.id}
                  className="group relative overflow-hidden bg-card p-8 rounded-2xl border border-border shadow-sm hover:border-brand-red/40 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-red/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="relative z-10 flex gap-5 items-start">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-red/10 group-hover:bg-brand-red/20 transition-all duration-300">
                      <Icon className="h-6 w-6 text-brand-red group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-brand-red transition-colors duration-200 mb-3">
                        {phase.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{phase.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-12">
            {service.includedItems.length > 0 && <IncludedItemsCard items={service.includedItems} />}
            {service.targetAudienceText && <WhoItsForCard text={service.targetAudienceText} />}
          </div>
        </div>

        {service.images.length > 0 && <ExamplesGrid images={service.images} />}
      </div>
    </section>
  );
}

// ─── Layout B: text-split (Commercial) ─────────────────────────────────────

function TextSplitLayout({ service, alt }: { service: ServiceSectionData; alt: boolean }) {
  const BadgeIcon = resolveIcon(service.icon);
  const paras = paragraphs(service.description);
  return (
    <section id={service.slug} className={`py-20 lg:py-32 relative overflow-hidden ${alt ? 'bg-muted/30 border-y border-border' : 'bg-background'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:items-center">
          <div className="lg:w-1/2">
            <Badge icon={BadgeIcon} label={service.label ?? service.title} />
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-6">
              {service.title}
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              {paras.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {service.targetAudienceText && <WhoItsForInline text={service.targetAudienceText} />}
          </div>

          {service.includedItems.length > 0 && (
            <div className="lg:w-1/2">
              <div className="h-full">
                <IncludedItemsCard items={service.includedItems} twoCol />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Layout C: centered-grid (Deep Cleaning) ───────────────────────────────

function CenteredGridLayout({ service, alt }: { service: ServiceSectionData; alt: boolean }) {
  const BadgeIcon = resolveIcon(service.icon);
  const paras = paragraphs(service.description);
  return (
    <section id={service.slug} className={`py-20 lg:py-32 relative overflow-hidden ${alt ? 'bg-muted/30 border-y border-border' : 'bg-background'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge icon={BadgeIcon} label={service.label ?? service.title} />
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-6">
            {service.title}
          </h2>
          {paras.map((p, i) => (
            <p key={i} className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {p}
            </p>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {service.phases.map((phase) => {
            const Icon = resolveIcon(phase.icon);
            return (
              <div
                key={phase.id}
                className="group relative overflow-hidden bg-card p-8 rounded-2xl border border-border shadow-sm hover:border-brand-red/40 hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-red/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="relative z-10">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/10 group-hover:bg-brand-red/20 transition-all duration-300">
                    <Icon className="h-6 w-6 text-brand-red group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-foreground group-hover:text-brand-red transition-colors duration-200">
                    {phase.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{phase.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Layout D: icon-hero (Ongoing Maintenance) ─────────────────────────────

function IconHeroLayout({ service, alt }: { service: ServiceSectionData; alt: boolean }) {
  const HeroIcon = resolveIcon(service.icon);
  const paras = paragraphs(service.description);
  const [intro, tagline] = paras;
  return (
    <section id={service.slug} className={`py-20 lg:py-32 relative overflow-hidden ${alt ? 'bg-muted/30 border-y border-border' : 'bg-background'}`}>
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          <div className="md:w-1/3 flex justify-center">
            <div className="group relative bg-brand-red/10 p-10 rounded-full border border-brand-red/20 transition-all duration-500 hover:scale-105 hover:bg-brand-red/20 hover:border-brand-red/35">
              <div className="absolute inset-0 bg-brand-red/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <HeroIcon className="h-24 w-24 text-brand-red relative z-10" />
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/20 border border-brand-red/30 text-brand-red font-medium mb-4">
              <CalendarCheck2 className="h-4 w-4" />
              {service.label ?? service.title}
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-4">
              {service.title}
            </h2>
            {intro && <p className="text-lg text-muted-foreground leading-relaxed mb-6">{intro}</p>}
            {tagline && (
              <p className="text-lg font-semibold text-foreground flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                {tagline}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mt-16 max-w-5xl mx-auto">
          {service.phases.map((plan) => (
            <div
              key={plan.id}
              className="group relative overflow-hidden bg-card p-8 rounded-2xl border border-border shadow-sm hover:border-brand-red/40 hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-red/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="relative z-10">
                {plan.frequency && (
                  <div className="inline-block text-xs font-semibold uppercase tracking-[0.1em] text-brand-red bg-brand-red/10 px-3 py-1 rounded-full mb-4 border border-brand-red/20 group-hover:bg-brand-red/20 transition-all duration-300">
                    {plan.frequency}
                  </div>
                )}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-brand-red transition-colors duration-200">
                  {plan.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{plan.description}</p>
              </div>
              {plan.bestFor && (
                <div className="relative z-10 border-t border-border pt-4 mt-auto">
                  <span className="text-xs text-muted-foreground block mb-1">BEST FOR</span>
                  <span className="text-sm font-medium text-foreground">{plan.bestFor}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Layout selection ───────────────────────────────────────────────────────

const LAYOUT_BY_SLUG: Record<string, "phases-split" | "text-split" | "centered-grid" | "icon-hero"> = {
  'post-construction': 'phases-split',
  residential: 'phases-split',
  commercial: 'text-split',
  'deep-cleaning': 'centered-grid',
  'ongoing-contracts': 'icon-hero',
};

export function ServiceSection({ service, index }: { service: ServiceSectionData; index: number }) {
  const layout = LAYOUT_BY_SLUG[service.slug] ?? 'phases-split';
  const alt = index % 2 === 1;

  switch (layout) {
    case 'text-split':
      return <TextSplitLayout service={service} alt={alt} />;
    case 'centered-grid':
      return <CenteredGridLayout service={service} alt={alt} />;
    case 'icon-hero':
      return <IconHeroLayout service={service} alt={alt} />;
    default:
      return <PhasesSplitLayout service={service} alt={alt} />;
  }
}
