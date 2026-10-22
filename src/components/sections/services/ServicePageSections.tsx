import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react';
import type { ServicePageSectionRow } from '@/lib/service-page-sections';
import { resolveSection } from '@/lib/service-page-sections';

export interface ServicePageItemData {
  id: string;
  sectionKey: string;
  title: string;
  body?: string | null;
  url?: string | null;
}

export interface RelatedPostData {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
}

interface Props {
  sections: ServicePageSectionRow[];
  items: ServicePageItemData[];
  relatedPosts: RelatedPostData[];
}

function SectionShell({
  heading,
  intro,
  alt,
  children,
}: {
  heading: string;
  intro?: string;
  alt: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-label={heading}
      className={`py-16 lg:py-24 ${alt ? 'bg-muted/30 border-y border-border' : 'bg-background'}`}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{heading}</h2>
        {intro && <p className="mt-4 text-lg text-muted-foreground max-w-3xl whitespace-pre-line">{intro}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export function ServicePageSections({ sections, items, relatedPosts }: Props) {
  const byKey = (key: string) => items.filter((i) => i.sectionKey === key);
  let rendered = 0;
  const nextAlt = () => rendered++ % 2 === 1;

  const how = resolveSection(sections, 'how-we-work');
  const industries = resolveSection(sections, 'industries');
  const why = resolveSection(sections, 'why-choose');
  const areas = resolveSection(sections, 'service-areas');
  const related = resolveSection(sections, 'related');

  const howItems = byKey('how-we-work');
  const industryItems = byKey('industries');
  const whyItems = byKey('why-choose');
  const areaItems = byKey('service-areas');
  const linkItems = byKey('related');

  return (
    <>
      {how.enabled && howItems.length > 0 && (
        <SectionShell heading={how.heading} intro={how.intro} alt={nextAlt()}>
          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {howItems.map((item, i) => (
              <li key={item.id} className="flex gap-4 bg-card p-6 rounded-2xl border border-border shadow-sm">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-red text-white font-bold">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                  {item.body && <p className="mt-2 text-muted-foreground leading-relaxed">{item.body}</p>}
                </div>
              </li>
            ))}
          </ol>
        </SectionShell>
      )}

      {industries.enabled && industryItems.length > 0 && (
        <SectionShell heading={industries.heading} intro={industries.intro} alt={nextAlt()}>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {industryItems.map((item) => (
              <li key={item.id} className="flex items-center gap-3 bg-card px-5 py-4 rounded-xl border border-border">
                <CheckCircle2 className="h-5 w-5 text-brand-red flex-shrink-0" aria-hidden="true" />
                <span className="font-medium text-foreground">{item.title}</span>
              </li>
            ))}
          </ul>
        </SectionShell>
      )}

      {why.enabled && whyItems.length > 0 && (
        <SectionShell heading={why.heading} intro={why.intro} alt={nextAlt()}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {whyItems.map((item) => (
              <div key={item.id} className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                {item.body && <p className="mt-2 text-muted-foreground leading-relaxed">{item.body}</p>}
              </div>
            ))}
          </div>
        </SectionShell>
      )}

      {areas.enabled && areaItems.length > 0 && (
        <SectionShell heading={areas.heading} intro={areas.intro} alt={nextAlt()}>
          <ul className="flex flex-wrap gap-3">
            {areaItems.map((item) => (
              <li key={item.id}>
                {item.url ? (
                  <Link
                    href={item.url}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-foreground hover:border-brand-red/40 hover:text-brand-red transition-colors"
                  >
                    <MapPin className="h-4 w-4 text-brand-red" aria-hidden="true" />
                    {item.title}
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-foreground">
                    <MapPin className="h-4 w-4 text-brand-red" aria-hidden="true" />
                    {item.title}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </SectionShell>
      )}

      {related.enabled && (relatedPosts.length > 0 || linkItems.length > 0) && (
        <SectionShell heading={related.heading} intro={related.intro} alt={nextAlt()}>
          {relatedPosts.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-card p-6 rounded-2xl border border-border hover:border-brand-red/40 hover:shadow-md transition-all"
                >
                  <h3 className="text-lg font-bold text-foreground group-hover:text-brand-red transition-colors">{post.title}</h3>
                  {post.excerpt && <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>}
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-red">
                    Read article
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          )}
          {linkItems.length > 0 && (
            <ul className={`space-y-2 ${relatedPosts.length > 0 ? 'mt-8' : ''}`}>
              {linkItems.map((item) => (
                <li key={item.id}>
                  {item.url ? (
                    <Link href={item.url} className="inline-flex items-center gap-2 font-medium text-brand-red hover:underline">
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      {item.title}
                    </Link>
                  ) : (
                    <span className="text-foreground">{item.title}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </SectionShell>
      )}
    </>
  );
}
