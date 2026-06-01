import { Shield, Award, MapPin, Clock, FileCheck } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: Shield,
    label: "Fully Licensed & Insured",
    sub: "Province of Ontario",
  },
  {
    icon: Award,
    label: "10+ Years Experience",
    sub: "Commercial Cleaning",
  },
  {
    icon: MapPin,
    label: "7 Cities Served",
    sub: "Southern Ontario",
  },
  {
    icon: Clock,
    label: "Same-Day Response",
    sub: "Quote Within 24 Hours",
  },
  {
    icon: FileCheck,
    label: "Documented Standards",
    sub: "Completion Certificates",
  },
];

export function TrustBar() {
  return (
    <section className="w-full bg-brand-gray border-b border-gray-200" aria-label="Trust signals">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <ul className="grid grid-cols-2 gap-y-6 gap-x-4 sm:grid-cols-3 lg:grid-cols-5">
          {TRUST_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <li
                key={item.label}
                className={`flex items-center gap-3 ${
                  i === 4 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-red/10">
                  <Icon className="h-5 w-5 text-brand-red" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold font-heading text-brand-dark leading-tight">
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
