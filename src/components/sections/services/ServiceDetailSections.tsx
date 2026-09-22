import React from 'react';
import { resolveIcon } from './ServiceSection';

export interface ServiceDetailSectionData {
  id: string;
  title: string;
  body: string;
  icon?: string | null;
}

function paragraphs(text: string): string[] {
  return text.split(/\n{2,}/).filter(Boolean);
}

export function ServiceDetailSections({ sections }: { sections: ServiceDetailSectionData[] }) {
  if (sections.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-background" aria-label="Service details">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="space-y-12">
          {sections.map((section) => {
            const Icon = resolveIcon(section.icon);
            return (
              <div key={section.id} className="flex gap-5">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-red/10">
                  <Icon className="h-6 w-6 text-brand-red" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-2xl font-bold text-foreground mb-3">{section.title}</h2>
                  {paragraphs(section.body).map((p, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed mt-3 first:mt-0">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
