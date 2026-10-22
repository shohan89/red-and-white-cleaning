import Link from "next/link";
import Image from "next/image";
import { Users, HardHat, CalendarClock, type LucideIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  users: Users,
  "hard-hat": HardHat,
  "calendar-clock": CalendarClock,
};

function resolveIcon(name?: string): LucideIcon {
  return (name && ICON_MAP[name]) || Users;
}

const DEFAULT_FEATURES = [
  {
    icon: "users",
    title: "We Show Up and We Do the Work",
    description:
      "No subcontractors, no surprises. When you hire Red and White, you get our team on-site — people who take pride in what they do and get the job done right the first time.",
  },
  {
    icon: "hard-hat",
    title: "We Know Construction Sites",
    description:
      "Post-construction cleanup is different from regular cleaning. Concrete dust, drywall residue, adhesive on windows — we know what to look for and how to handle it.",
  },
  {
    icon: "calendar-clock",
    title: "We Work Around Your Schedule",
    description:
      "Contractors and property managers have tight timelines. We adapt to yours, including early mornings, evenings, and weekends when needed.",
  },
];

export interface WhyChooseUsContent {
  eyebrow?: string
  title?: string
  image?: string
  imageAlt?: string
  quoteText?: string
  quoteAttribution?: string
  badgeNumber?: string
  badgeLabel?: string
  buttonText?: string
  feature1Icon?: string
  feature1Title?: string
  feature1Desc?: string
  feature2Icon?: string
  feature2Title?: string
  feature2Desc?: string
  feature3Icon?: string
  feature3Title?: string
  feature3Desc?: string
}

export function WhyChooseUs({ content = {} }: { content?: WhyChooseUsContent }) {
  const eyebrow = content.eyebrow ?? "Why Choose Us";
  const title = content.title ?? "Why Clients Keep Calling Us Back";
  const image = content.image ?? "/images/why-choose-us.webp";
  const imageAlt = content.imageAlt ?? "Professional commercial cleaner polishing a glass wall";
  const quoteText =
    content.quoteText ??
    "We understand the demands of commercial and construction projects — tight deadlines, strict site requirements, and zero tolerance for missed details.";
  const quoteAttribution = content.quoteAttribution ?? "Red & White Cleaning Services LTD";
  const badgeNumber = content.badgeNumber ?? "10+";
  const badgeLabel = content.badgeLabel ?? "Years Trusted";
  const buttonText = content.buttonText ?? "Get Your Free Quote";

  const features = [
    {
      icon: resolveIcon(content.feature1Icon ?? DEFAULT_FEATURES[0].icon),
      title: content.feature1Title ?? DEFAULT_FEATURES[0].title,
      description: content.feature1Desc ?? DEFAULT_FEATURES[0].description,
    },
    {
      icon: resolveIcon(content.feature2Icon ?? DEFAULT_FEATURES[1].icon),
      title: content.feature2Title ?? DEFAULT_FEATURES[1].title,
      description: content.feature2Desc ?? DEFAULT_FEATURES[1].description,
    },
    {
      icon: resolveIcon(content.feature3Icon ?? DEFAULT_FEATURES[2].icon),
      title: content.feature3Title ?? DEFAULT_FEATURES[2].title,
      description: content.feature3Desc ?? DEFAULT_FEATURES[2].description,
    },
  ];

  return (
    <SectionWrapper className="bg-brand-gray">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">

        {/* Left column — visual panel */}
        <div className="relative hidden lg:block">
          <div className="relative aspect-4/5 rounded-2xl bg-brand-dark overflow-hidden flex items-end p-8 shadow-xl">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center select-none pointer-events-none"
            />
            {/* Blending overlay to make text readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" aria-hidden="true" />
            <blockquote className="relative z-10 border-l-4 border-brand-red pl-4">
              <p className="text-lg font-heading font-semibold text-white leading-snug">
                &quot;{quoteText}&quot;
              </p>
              <footer className="mt-3 text-sm text-white/70 font-medium">
                — {quoteAttribution}
              </footer>
            </blockquote>
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-5 -right-5 flex h-24 w-24 items-center justify-center rounded-full bg-brand-red text-center shadow-xl">
            <div>
              <p className="text-2xl font-heading font-extrabold text-white leading-none">{badgeNumber}</p>
              <p className="text-[10px] font-semibold text-white/80 uppercase tracking-wide leading-tight mt-0.5">
                {badgeLabel}
              </p>
            </div>
          </div>
        </div>

        {/* Right column — feature list */}
        <div>
          <p className="mb-3 text-xs font-heading font-semibold uppercase tracking-[0.12em] text-brand-red">
            {eyebrow}
          </p>
          <h2 className="mb-10 text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl">
            {title}
          </h2>

          <ul className="space-y-7">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <li key={feature.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-red/10 mt-0.5">
                    <Icon className="h-5 w-5 text-brand-red" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-brand-dark mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-10">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "default" }),
                "bg-brand-red hover:bg-brand-red/90 text-white font-semibold px-8 h-11 border-0"
              )}
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
