import React from 'react';

const DEFAULT_BODY = `Red and White Cleaning Services was built on a simple idea: do the job properly, treat clients with respect, and show up when you say you will.

Our team founded the company after seeing firsthand how many cleaning contractors cut corners — leaving construction sites with hidden dust, smeared windows, and missed areas that caused problems down the line.

Today, we specialize in post-construction and commercial cleaning across the KW Region, Guelph, Hamilton, London, Brantford, and the communities around them. Our clients include general contractors, developers, commercial property managers, and business owners who need reliable, professional service.`

interface StoryContent {
  title?: string
  body?: string
}

export function OurStory({ content = {} }: { content?: StoryContent }) {
  const title = content.title ?? "Our Story"
  const paragraphs = (content.body ?? DEFAULT_BODY).split("\n").filter(Boolean)

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
            {title}
          </h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </div>
    </section>
  );
}
