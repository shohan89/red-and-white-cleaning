import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { NAV_LINKS } from "@/config/nav";
import { SERVICE_CITIES } from "@/config/cities";
import { SITE } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white/70">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — Brand + NAP */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-heading font-bold text-white">
                <span className="text-brand-red">Red</span> &amp; White
              </span>
              <p className="text-xs text-white/50 mt-0.5">Cleaning Services LTD</p>
            </Link>
            <p className="text-sm leading-relaxed mb-5">
              Licensed and insured commercial and post-construction cleaning across Southern Ontario.
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={SITE.phoneHref} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="h-4 w-4 shrink-0 text-brand-red" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="h-4 w-4 shrink-0 text-brand-red" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-brand-red mt-0.5" />
                <span>{SITE.address.city}, {SITE.address.province}, {SITE.address.country}</span>
              </li>
            </ul>
          </div>

          {/* Column 2 — Navigation */}
          <div>
            <h3 className="text-sm font-heading font-semibold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Service Areas */}
          <div>
            <h3 className="text-sm font-heading font-semibold uppercase tracking-wider text-white mb-4">
              Service Areas
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SERVICE_CITIES.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/service-area/${city.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {city.name}, {city.province}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Services */}
          <div>
            <h3 className="text-sm font-heading font-semibold uppercase tracking-wider text-white mb-4">
              Our Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/services#post-construction" className="hover:text-white transition-colors">Post-Construction Cleaning</Link></li>
              <li><Link href="/services#commercial" className="hover:text-white transition-colors">Commercial Cleaning</Link></li>
              <li><Link href="/services#deep-cleaning" className="hover:text-white transition-colors">Deep Cleaning</Link></li>
              <li><Link href="/services#ongoing-contracts" className="hover:text-white transition-colors">Ongoing Contracts</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Get a Free Quote</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <p>Licensed &amp; Insured · Southern Ontario</p>
        </div>
      </div>
    </footer>
  );
}
