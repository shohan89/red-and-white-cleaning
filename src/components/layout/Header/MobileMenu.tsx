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
          "md:hidden inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/50"
        )}
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>

      <SheetContent side="right" className="w-72 bg-white border-gray-200 p-0">
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>

        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200 flex items-center gap-3">
            <Image
              src="/images/logo.webp"
              alt="Red and White Cleaning Logo"
              width={32}
              height={32}
              className="rounded-full object-cover border border-gray-200"
            />
            <span className="text-base font-heading font-extrabold text-brand-red leading-none whitespace-nowrap">
              Red &amp; White Cleaning Services Ltd
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex-1 px-6 py-6 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center px-3 py-3 rounded-md text-gray-700 hover:text-brand-red hover:bg-brand-red/5 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Footer CTAs */}
          <div className="px-6 py-6 border-t border-gray-200 flex flex-col gap-3">
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
              className="flex items-center justify-center gap-2 w-full rounded-md border border-gray-300 py-2.5 text-sm text-gray-600 hover:text-brand-red hover:border-brand-red/40 transition-colors"
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
