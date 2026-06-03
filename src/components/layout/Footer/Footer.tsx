import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { NAV_LINKS } from "@/config/nav";
import { SITE } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white/70">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Column 1 — Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/images/logo.jpg"
                alt="Red and White Cleaning Services Logo"
                width={48}
                height={48}
                className="rounded-full object-cover border border-white/20"
              />
              <div>
                <span className="text-lg font-heading font-bold text-white tracking-tight leading-none block">
                  <span className="text-brand-red">Red</span> and White
                </span>
                <p className="text-xs font-semibold text-white/80 mt-1.5 uppercase tracking-wider">Cleaning Services LTD</p>
              </div>
            </Link>
            <div className="space-y-1.5 text-sm leading-relaxed text-white/70">
              <p>Commercial &amp; Construction Cleaning</p>
              <p>Kitchener</p>
              <p>Waterloo Region, Ontario</p>
            </div>
          </div>

          {/* Column 2 — Navigation */}
          <div>
            <h3 className="text-sm font-heading font-semibold uppercase tracking-wider text-white mb-6">
              Navigation
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h3 className="text-sm font-heading font-semibold uppercase tracking-wider text-white mb-6">
              Contact
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="tel:519-574-1552" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-red/10 group-hover:bg-brand-red/20 transition-colors">
                    <Phone className="h-4 w-4 text-brand-red" />
                  </div>
                  <span>Phone/Text: 519-574-1552</span>
                </a>
              </li>
              <li>
                <a href="mailto:Redandwhiteclean@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-red/10 group-hover:bg-brand-red/20 transition-colors">
                    <Mail className="h-4 w-4 text-brand-red" />
                  </div>
                  <span className="break-all">Email: Redandwhiteclean@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 mt-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-red/10 shrink-0">
                  <MapPin className="h-4 w-4 text-brand-red" />
                </div>
                <span className="leading-relaxed">
                  Serving: KW Region, Guelph, Hamilton, London, Brantford &amp; Surrounding Areas
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>
            © 2025 Red and White Cleaning Services LTD. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p>
              Website by <a href="https://oaktree.marketing" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-red transition-colors font-medium">Oak</a>
            </p>
            <span className="text-white/20">|</span>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
