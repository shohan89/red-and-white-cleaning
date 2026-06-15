import React from "react";
import { Metadata } from "next";
import { getPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import Image from "next/image";
import { PortfolioGallery } from "@/components/sections/portfolio/PortfolioGallery";
import { ArrowRight, Mail } from "lucide-react";
import { prisma } from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("portfolio", {
    title: "Our Work | Commercial & Construction Cleaning Portfolio | Red and White Cleaning Services",
    description: "See photos of completed post-construction and commercial cleaning projects by Red and White Cleaning Services LTD across KW Region and Southern Ontario.",
    canonical: "/portfolio",
  })
}

export default async function PortfolioPage() {
  let items: {
    id: string;
    category: string;
    title: string;
    desc: string;
    location: string;
    image?: string;
    alt?: string;
    beforeImage?: string;
    afterImage?: string;
    beforeAlt?: string;
    afterAlt?: string;
  }[] = [];

  try {
    const dbItems = await prisma.portfolioItem.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      include: { category: { select: { slug: true, name: true } } },
    });
    if (dbItems.length > 0) {
      items = dbItems.map((item) => ({
        id: item.id,
        category: item.category.slug,
        title: item.title,
        desc: item.description ?? "",
        location: item.location ?? "",
        image: item.imageUrl ?? undefined,
        alt: item.imageAlt ?? undefined,
        beforeImage: item.beforeImage ?? undefined,
        afterImage: item.afterImage ?? undefined,
        beforeAlt: item.beforeAlt ?? undefined,
        afterAlt: item.afterAlt ?? undefined,
      }));
    }
  } catch {}

  return (
    <main className="flex min-h-screen flex-col">
      {/* Portfolio Header */}
      <section className="relative overflow-hidden bg-brand-dark pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/images/portfolio-header.png"
            alt="Professional commercial cleaning equipment"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-brand-dark/75 to-brand-dark" aria-hidden="true" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-brand-red),transparent_50%)] opacity-25" aria-hidden="true" />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/25 border border-brand-red/40 text-brand-white font-medium text-xs sm:text-sm mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              Project Gallery
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-brand-white sm:text-5xl md:text-6xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-75 leading-tight">
              Our Work Speaks for Itself
            </h1>
            <p className="mt-6 text-lg leading-8 text-brand-gray/80 sm:text-xl max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
              Here&apos;s a look at some of the commercial and construction cleaning projects
              we&apos;ve completed across KW, Guelph, Hamilton, and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section — passes items only if DB has data, else gallery uses hardcoded fallback */}
      <PortfolioGallery items={items.length > 0 ? items : undefined} />

      {/* Page CTA */}
      <section className="py-20 lg:py-32 bg-brand-red text-brand-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl max-w-3xl mx-auto mb-6">
            Like what you see?
          </h2>
          <p className="text-xl text-brand-white/95 max-w-2xl mx-auto mb-10">
            Let&apos;s talk about your project and how we can deliver these same results for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 bg-brand-white text-brand-red hover:bg-brand-gray px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl w-full sm:w-auto hover:-translate-y-0.5"
            >
              Get a Free Quote
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <span className="text-brand-white/80 font-medium px-4">or</span>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 bg-transparent border-2 border-brand-white/30 hover:border-brand-white hover:bg-white/5 text-brand-white px-8 py-4 rounded-lg font-semibold text-lg transition-all w-full sm:w-auto hover:-translate-y-0.5"
            >
              <Mail className="h-5 w-5 transition-transform group-hover:scale-110" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
