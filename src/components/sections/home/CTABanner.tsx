import Link from "next/link";
import { Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SITE } from "@/config/site";
import { cn } from "@/lib/utils";

export function CTABanner() {
  return (
    <section
      className="relative w-full overflow-hidden bg-brand-red"
      aria-label="Call to action"
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-size-[20px_20px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center md:py-24">
        <h2 className="mb-4 text-3xl font-heading font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
          Ready to Get Started?{" "}
          <span className="block">Request Your Free Quote Today.</span>
        </h2>
        <p className="mb-8 text-base text-white/80 sm:text-lg">
          We respond to all quote requests within 1 business day.
          No obligation. No pressure.
        </p>

        <Link
          href="/contact"
          className={cn(
            buttonVariants({ variant: "default" }),
            "bg-white text-brand-red hover:bg-white/95 font-bold px-10 py-6 text-base h-auto shadow-xl mb-5 border-0 inline-flex"
          )}
        >
          Get Your Free Quote
        </Link>

        <p className="text-sm text-white/70">
          Or call us directly:{" "}
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-white/90 underline underline-offset-2"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            {SITE.phone}
          </a>
        </p>
      </div>
    </section>
  );
}
