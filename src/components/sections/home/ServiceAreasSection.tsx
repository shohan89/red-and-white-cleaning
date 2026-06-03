import Link from "next/link";
import { MapPin } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SERVICE_CITIES } from "@/config/cities";

export function ServiceAreasSection() {
  return (
    <SectionWrapper className="bg-white">
      {/* Header */}
      <div className="mb-12 text-center">
        <p className="mb-3 text-xs font-heading font-semibold uppercase tracking-[0.12em] text-brand-red">
          Service Areas
        </p>
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl">
          Serving Southern Ontario
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          We're based in the KW Region and cover a wide area across Southern Ontario — including Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London, Brantford, and surrounding communities. If you're not sure if we cover your location, just reach out.
        </p>
      </div>

      {/* City grid */}
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 mb-10">
        {SERVICE_CITIES.map((city) => (
          <li key={city.slug}>
            <Link
              href={`/service-area/${city.slug}`}
              className="group flex items-center gap-2.5 rounded-lg border border-gray-200 bg-brand-gray px-4 py-3.5 hover:border-brand-red/40 hover:bg-brand-red/5 transition-all duration-200"
            >
              <MapPin className="h-4 w-4 shrink-0 text-brand-red" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-brand-dark group-hover:text-brand-red transition-colors">
                  {city.name}
                </p>
                <p className="text-xs text-gray-400">{city.province}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Supporting copy for GEO */}
      <p className="mx-auto max-w-2xl text-center text-sm font-medium">
        <Link href="/contact" className="text-brand-red hover:underline">
          [ Check if we service your area — contact us ]
        </Link>
      </p>
    </SectionWrapper>
  );
}
