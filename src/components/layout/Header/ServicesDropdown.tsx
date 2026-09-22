"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { SERVICE_LINKS } from "@/config/nav";

export function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openNow() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function closeSoon() {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  return (
    <div
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-brand-red transition-colors"
      >
        Services
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-1/2 top-full -translate-x-1/2 pt-3 w-64"
        >
          <div className="rounded-lg border border-gray-200 bg-white shadow-lg p-2">
            {SERVICE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-brand-red/5 hover:text-brand-red transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="my-1 border-t border-gray-100" />
            <Link
              href="/services"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-semibold text-brand-red hover:bg-brand-red/5 transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
