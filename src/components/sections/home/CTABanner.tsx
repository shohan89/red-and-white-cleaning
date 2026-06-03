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
          Ready to Get a Clean Site?
        </h2>
        <p className="mb-8 text-base text-white/80 sm:text-lg">
          Whether it's a one-time post-construction clean or an ongoing commercial contract — we're ready when you are.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-white text-brand-red hover:bg-white/95 font-bold px-10 py-6 text-base h-auto shadow-xl border-0 w-full sm:w-auto"
            )}
          >
            Get a Free Quote
          </Link>
          <a
            href={SITE.phoneHref}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-red font-bold px-10 py-6 text-base h-auto shadow-xl w-full sm:w-auto"
            )}
          >
            <Phone className="h-5 w-5 mr-2" aria-hidden="true" />
            Call {SITE.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
