import Link from "next/link";
import { Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { NAV_LINKS } from "@/config/nav";
import { SITE } from "@/config/site";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-brand-dark/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-xl font-heading font-extrabold text-white leading-tight">
            <span className="text-brand-red">Red</span>
            <span className="text-white"> &amp; </span>
            <span className="text-white">White</span>
          </span>
          <span className="hidden sm:block text-xs text-white/60 font-sans leading-tight">
            Cleaning Services
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA + Mobile trigger */}
        <div className="flex items-center gap-3">
          <a
            href={SITE.phoneHref}
            className="hidden lg:flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>{SITE.phone}</span>
          </a>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "hidden md:inline-flex bg-brand-red hover:bg-brand-red/90 text-white font-semibold border-0"
            )}
          >
            Get a Free Quote
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
