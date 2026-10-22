import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SITE } from "@/config/site";
import { cn } from "@/lib/utils";

const DEFAULT_TRUST_SIGNALS = [
  "Fully Licensed & Insured",
  "Free Quotes — No Obligation",
  "Response Within 1 Business Day",
];

interface HeroContent {
  heading?: string
  subheading?: string
  cta1Text?: string
  cta2Text?: string
}

interface TrustContent {
  signal1?: string
  signal2?: string
  signal3?: string
}

export function HeroSection({
  heroContent = {},
  trustContent = {},
}: {
  heroContent?: HeroContent
  trustContent?: TrustContent
}) {
  const heading = heroContent.heading ?? "Commercial & Construction Cleaning Done Right — Across KW, Guelph, Hamilton, London and Brantford"
  const subheading = heroContent.subheading ?? "We clean construction sites, commercial spaces, and everything in between. Fast, thorough, and built for contractors and property managers who need it done properly."
  const cta1Text = heroContent.cta1Text ?? "Get a Free Quote"
  const cta2Text = heroContent.cta2Text ?? "See Our Work"
  const TRUST_SIGNALS = [
    trustContent.signal1 ?? DEFAULT_TRUST_SIGNALS[0],
    trustContent.signal2 ?? DEFAULT_TRUST_SIGNALS[1],
    trustContent.signal3 ?? DEFAULT_TRUST_SIGNALS[2],
  ]
  return (
    <section
      className="relative flex min-h-svh w-full items-center overflow-hidden bg-white"
      aria-label="Hero"
    >
      {/* Background image & overlays */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/images/hero-bg.webp"
          alt="Red and White Cleaning team at work in a professional building corridor"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Overlays to maintain readability over background image */}
        <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
        <div className="absolute inset-0 bg-linear-to-r from-black/35 via-black/15 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" aria-hidden="true" />
        {/* Subtle red brand glow overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--color-brand-red),transparent_50%)] opacity-30" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 lg:px-6">
        <div className="max-w-2xl xl:max-w-3xl">

          {/* Eyebrow */}
          <p
            className="mb-5 inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-[0.12em] text-brand-red animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500 [animation-delay:100ms]"
          >
            <span className="h-px w-6 bg-brand-red" aria-hidden="true" />
            Licensed &amp; Insured · Serving Southern Ontario
          </p>

          {/* H1 */}
          <h1
            className="mb-6 font-heading text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[4rem] animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500 [animation-delay:250ms]"
          >
            {heading}
          </h1>

          {/* Subheadline */}
          <p
            className="mb-9 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500 [animation-delay:400ms]"
          >
            {subheading}
          </p>

          {/* CTA buttons */}
          <div
            className="mb-8 flex flex-col gap-3 sm:flex-row sm:gap-4 animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500 [animation-delay:550ms]"
          >
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "default" }),
                "bg-brand-red hover:bg-brand-red/90 text-white font-semibold px-8 py-6 text-base h-auto shadow-lg border-0 justify-center"
              )}
            >
              {cta1Text}
            </Link>
            <Link
              href="/portfolio"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white hover:border-white/60 font-semibold px-8 py-6 text-base h-auto justify-center"
              )}
            >
              {cta2Text}
            </Link>
          </div>

          {/* Trust signals */}
          <ul
            className="flex flex-wrap gap-x-5 gap-y-2 animate-in fade-in fill-mode-both duration-500 [animation-delay:700ms]"
            aria-label="Key trust signals"
          >
            {TRUST_SIGNALS.map((signal) => (
              <li key={signal} className="flex items-center gap-1.5 text-sm text-white/65">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-red" aria-hidden="true" />
                {signal}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Scroll chevron */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-in fade-in fill-mode-both duration-500 [animation-delay:1200ms]"
        aria-hidden="true"
      >
        <div className="animate-bounce">
          <ChevronDown className="h-6 w-6 text-white/30" />
        </div>
      </div>
    </section>
  );
}
