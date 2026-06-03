import { CheckCircle2 } from "lucide-react";

const TRUST_ITEMS = [
  "Serving KW Region & Beyond",
  "Construction & Commercial Specialists",
  "Fast Turnaround",
  "Free Quotes",
];

export function TrustBar() {
  return (
    <section className="w-full bg-brand-gray border-y border-gray-200 py-5" aria-label="Social proof">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-12">
          {TRUST_ITEMS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-sm font-semibold font-heading text-brand-dark"
            >
              <CheckCircle2 className="h-5 w-5 text-brand-red shrink-0" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
