export const revalidate = 3600

import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { prisma } from "@/lib/prisma";
import { SITE } from "@/config/site";
import { ServiceSection, type ServiceSectionData } from '@/components/sections/services/ServiceSection';
import { ServiceDetailSections, type ServiceDetailSectionData } from '@/components/sections/services/ServiceDetailSections';
import { ServiceFaqSection, type ServiceFaqData } from '@/components/sections/services/ServiceFaqSection';
import { ServicesCTA } from '@/components/sections/services/ServicesCTA';

async function getService(slug: string) {
  try {
    return await prisma.service.findUnique({
      where: { slug },
      include: {
        phases: { orderBy: { sortOrder: "asc" } },
        includedItems: { orderBy: { sortOrder: "asc" } },
        images: { orderBy: { sortOrder: "asc" } },
        detailSections: { orderBy: { sortOrder: "asc" } },
      },
    })
  } catch (err) {
    console.error("[services/slug] DB error:", err)
    return null
  }
}

async function getOtherServices(excludeSlug: string) {
  try {
    return await prisma.service.findMany({
      where: { slug: { not: excludeSlug } },
      orderBy: { sortOrder: "asc" },
      select: { slug: true, name: true, label: true, icon: true },
    })
  } catch (err) {
    console.error("[services/slug] DB error (related):", err)
    return []
  }
}

async function getServiceFaqs(serviceId: string) {
  try {
    return await prisma.faq.findMany({
      where: { serviceId, published: true },
      orderBy: { sortOrder: "asc" },
      select: { id: true, question: true, answer: true },
    })
  } catch (err) {
    console.error("[services/slug] DB error (faqs):", err)
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) return { title: "Service Not Found" }

  const title = (service.seoTitle as string) || (service.title as string)
  const description = (service.seoDesc as string) || (service.description as string)
  const ogImage = (service.ogImage as string) || (service.images as Array<{ imageUrl: string }>)[0]?.imageUrl
  const url = `${SITE.url}/services/${slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getService(slug)
  if (!service) notFound()

  const otherServices = await getOtherServices(slug)
  const faqs = await getServiceFaqs(service.id as string)
  const url = `${SITE.url}/services/${slug}`

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: service.title,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: SITE.name,
      telephone: SITE.phone,
      url: SITE.url,
    },
    url,
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
      { "@type": "ListItem", position: 3, name: service.name, item: url },
    ],
  }

  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  } : null

  return (
    <main className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <nav aria-label="Breadcrumb" className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 py-3 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <Link href="/services" className="hover:text-foreground transition-colors">Services</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="text-foreground font-medium">{service.name as string}</span>
        </div>
      </nav>

      <ServiceSection service={service as unknown as ServiceSectionData} index={0} />

      <ServiceDetailSections sections={service.detailSections as unknown as ServiceDetailSectionData[]} />

      {otherServices.length > 0 && (
        <section className="py-16 bg-muted/30 border-y border-border" aria-label="Other services">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-8 text-center">
              Other Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherServices.map((s) => (
                <Link
                  key={s.slug as string}
                  href={`/services/${s.slug}`}
                  className="group bg-card border border-border rounded-xl p-5 hover:border-brand-red/40 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-foreground group-hover:text-brand-red transition-colors">
                    {s.name as string}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-sm text-brand-red mt-2 font-medium">
                    Learn more
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ServiceFaqSection faqs={faqs as unknown as ServiceFaqData[]} serviceName={service.name as string} />

      <ServicesCTA />
    </main>
  );
}
