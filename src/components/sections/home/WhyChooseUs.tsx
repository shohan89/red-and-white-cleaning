import Link from "next/link";
import Image from "next/image";
import { Users, HardHat, CalendarClock } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: Users,
    title: "We Show Up and We Do the Work",
    description:
      "No subcontractors, no surprises. When you hire Red and White, you get our team on-site — people who take pride in what they do and get the job done right the first time.",
  },
  {
    icon: HardHat,
    title: "We Know Construction Sites",
    description:
      "Post-construction cleanup is different from regular cleaning. Concrete dust, drywall residue, adhesive on windows — we know what to look for and how to handle it.",
  },
  {
    icon: CalendarClock,
    title: "We Work Around Your Schedule",
    description:
      "Contractors and property managers have tight timelines. We adapt to yours, including early mornings, evenings, and weekends when needed.",
  },
];

export function WhyChooseUs() {
  return (
    <SectionWrapper className="bg-brand-gray">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">

        {/* Left column — visual panel */}
        <div className="relative hidden lg:block">
          <div className="relative aspect-4/5 rounded-2xl bg-brand-dark overflow-hidden flex items-end p-8 shadow-xl">
            <Image
              src="/images/why-choose-us.png"
              alt="Professional commercial cleaner polishing a glass wall"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center select-none pointer-events-none"
            />
            {/* Blending overlay to make text readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" aria-hidden="true" />
            <blockquote className="relative z-10 border-l-4 border-brand-red pl-4">
              <p className="text-lg font-heading font-semibold text-white leading-snug">
                &quot;We understand the demands of commercial and construction projects — tight
                deadlines, strict site requirements, and zero tolerance for missed details.&quot;
              </p>
              <footer className="mt-3 text-sm text-white/70 font-medium">
                — Red &amp; White Cleaning Services LTD
              </footer>
            </blockquote>
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-5 -right-5 flex h-24 w-24 items-center justify-center rounded-full bg-brand-red text-center shadow-xl">
            <div>
              <p className="text-2xl font-heading font-extrabold text-white leading-none">10+</p>
              <p className="text-[10px] font-semibold text-white/80 uppercase tracking-wide leading-tight mt-0.5">
                Years<br />Trusted
              </p>
            </div>
          </div>
        </div>

        {/* Right column — feature list */}
        <div>
          <p className="mb-3 text-xs font-heading font-semibold uppercase tracking-[0.12em] text-brand-red">
            Why Choose Us
          </p>
          <h2 className="mb-10 text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl">
            Why Clients Keep Calling Us Back
          </h2>

          <ul className="space-y-7">
            {FEATURES.map((feature) => {
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
              Get Your Free Quote
            </Link>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
