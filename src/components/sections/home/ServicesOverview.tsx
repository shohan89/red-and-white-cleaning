import Link from "next/link";
import { HardHat, Building2, Sparkles, CalendarCheck, ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SERVICES } from "@/config/services";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "hard-hat":       HardHat,
  "building-2":     Building2,
  "sparkles":       Sparkles,
  "calendar-check": CalendarCheck,
};

export function ServicesOverview() {
  return (
    <SectionWrapper className="bg-white">
      {/* Header */}
      <div className="mb-12 text-center">
        <p className="mb-3 text-xs font-heading font-semibold uppercase tracking-[0.12em] text-brand-red">
          Our Services
        </p>
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl">
          Cleaning Solutions Built for Commercial Work
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          From post-construction site cleanup to ongoing facility maintenance, we deliver
          professional results for contractors and businesses across Southern Ontario.
        </p>
      </div>

      {/* Service cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service) => {
          const Icon = ICON_MAP[service.icon];
          const ctaLabel = "ctaLabel" in service ? service.ctaLabel : "Learn More";

          return (
            <Link
              key={service.id}
              href={service.href}
              className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:border-brand-red/40 hover:shadow-md transition-all duration-200"
            >
              {/* Red top accent */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-red/10 group-hover:bg-brand-red/20 transition-colors">
                <Icon className="h-6 w-6 text-brand-red" aria-hidden="true" />
              </div>

              <h3 className="mb-2 text-base font-heading font-bold text-brand-dark group-hover:text-brand-red transition-colors">
                {service.name}
              </h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">
                {service.shortDescription}
              </p>
              <p className="mb-4 text-xs font-medium text-gray-400">
                {service.audience}
              </p>
              <span className="flex items-center gap-1 text-sm font-semibold text-brand-red">
                {ctaLabel}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
