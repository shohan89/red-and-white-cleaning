import Link from "next/link";
import { Shield, Users, CalendarClock, MessageSquareCheck, ClipboardList, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: Shield,
    title: "Licensed & Fully Insured",
    description:
      "We carry comprehensive general liability insurance. You and your clients are fully protected on every job — documentation available on request.",
  },
  {
    icon: Users,
    title: "Trained Professional Teams",
    description:
      "Every team member is trained to commercial cleaning standards. Consistent results, every visit, regardless of site size or complexity.",
  },
  {
    icon: CalendarClock,
    title: "Contractor-Friendly Scheduling",
    description:
      "We work around your construction timeline. Early mornings, weekends, or tight handover windows — we adapt to your schedule, not the other way around.",
  },
  {
    icon: MessageSquareCheck,
    title: "Fast, Reliable Communication",
    description:
      "Quote requests receive a response within 1 business day. No chasing, no waiting, no surprises — we keep you informed at every stage.",
  },
  {
    icon: ClipboardList,
    title: "Documented Cleaning Standards",
    description:
      "Every job is completed against a detailed checklist. You receive documentation confirming all tasks were completed — useful for handover packages.",
  },
  {
    icon: MapPin,
    title: "7 Cities Across Southern Ontario",
    description:
      "We serve Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London, and Brantford — one reliable team for all your regional projects.",
  },
];

export function WhyChooseUs() {
  return (
    <SectionWrapper className="bg-brand-gray">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">

        {/* Left column — visual panel */}
        <div className="relative hidden lg:block">
          <div className="aspect-4/5 rounded-2xl bg-linear-to-br from-brand-dark to-[#2d0000] overflow-hidden flex items-end p-8">
            <div
              className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-size-[20px_20px]"
              aria-hidden="true"
            />
            <blockquote className="relative z-10 border-l-4 border-brand-red pl-4">
              <p className="text-lg font-heading font-semibold text-white leading-snug">
                &quot;We understand the demands of commercial and construction projects — tight
                deadlines, strict site requirements, and zero tolerance for missed details.&quot;
              </p>
              <footer className="mt-3 text-sm text-white/60">
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
            Why Contractors and Property Managers Choose Red &amp; White
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
