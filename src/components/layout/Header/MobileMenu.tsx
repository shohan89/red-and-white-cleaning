"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Phone } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { NAV_LINKS } from "@/config/nav";
import { SITE } from "@/config/site";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* SheetTrigger renders a <button> by default — style it directly */}
      <SheetTrigger
        className={cn(
          "md:hidden inline-flex h-8 w-8 items-center justify-center rounded-md text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        )}
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>

      <SheetContent side="right" className="w-72 bg-brand-dark border-white/10 p-0">
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>

        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/10 flex items-center gap-3">
            <Image
              src="/images/logo.jpg"
              alt="Red and White Cleaning Logo"
              width={32}
              height={32}
              className="rounded-full object-cover border border-white/20"
            />
            <span className="text-lg font-heading font-bold text-white leading-none">
              <span className="text-brand-red">Red</span> &amp; White
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex-1 px-6 py-6 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center px-3 py-3 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Footer CTAs */}
          <div className="px-6 py-6 border-t border-white/10 flex flex-col gap-3">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full justify-center bg-brand-red hover:bg-brand-red/90 text-white font-semibold border-0"
              )}
            >
              Get a Free Quote
            </Link>
            <a
              href={SITE.phoneHref}
              className="flex items-center justify-center gap-2 w-full rounded-md border border-white/20 py-2.5 text-sm text-white/80 hover:text-white hover:border-white/40 transition-colors"
            >
              <Phone className="h-4 w-4" />
              {SITE.phone}
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
