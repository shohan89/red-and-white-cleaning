import Link from "next/link";
import { Phone } from "lucide-react";
import { SITE } from "@/config/site";

export function MobileCTABar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex h-14 border-t border-white/10 bg-brand-dark shadow-lg">
      <a
        href={SITE.phoneHref}
        className="flex flex-1 items-center justify-center gap-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors border-r border-white/10"
        aria-label="Call us now"
      >
        <Phone className="h-4 w-4" />
        Call Now
      </a>
      <Link
        href="/contact"
        className="flex flex-1 items-center justify-center gap-2 text-sm font-semibold bg-brand-red text-white hover:bg-brand-red/90 transition-colors"
      >
        Get Free Quote
      </Link>
    </div>
  );
}
