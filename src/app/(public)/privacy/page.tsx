export const dynamic = 'force-dynamic'

import React from 'react';
import { Metadata } from 'next';
import { getPageMetadata } from "@/lib/metadata";
import { SITE } from "@/config/site";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("privacy", {
    title: 'Privacy Policy - Red & White Cleaning Services',
    description: 'How Red & White Cleaning Services LTD collects, uses, and protects your information when you use our website or request a quote.',
    canonical: "/privacy",
  })
}

export default function PrivacyPolicyPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-10">Last updated: September 2026</p>

          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <p>
              {SITE.legalName} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates{" "}
              {SITE.url.replace(/^https?:\/\//, "")}. This policy explains what information we
              collect through this website, how we use it, and the choices you have.
            </p>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Information We Collect</h2>
              <p>
                When you fill out a quote request or contact form, we collect the information you
                provide directly — typically your name, phone number, email address, property
                location, and details about the service you&apos;re asking about. We do not ask
                for payment information through this website.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">How We Use Your Information</h2>
              <p>
                We use the information you submit to respond to your inquiry, prepare a quote,
                schedule and deliver cleaning services, and follow up about your request. We do
                not sell, rent, or trade your personal information to third parties for marketing
                purposes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Analytics &amp; Cookies</h2>
              <p>
                Like most business websites, we use Google Analytics and Google Tag Manager to
                understand how visitors use our site (pages viewed, general location, device
                type) so we can improve it. These tools use cookies and do not identify you
                personally. You can disable cookies in your browser settings at any time.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Service Providers</h2>
              <p>
                We use trusted third-party services to operate this site and respond to
                inquiries — for example, email delivery providers to send quote request
                notifications, and our database host to store lead and scheduling information
                securely. These providers only receive the information necessary to perform
                their function and are not permitted to use it for any other purpose.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Data Retention &amp; Security</h2>
              <p>
                We keep quote requests and customer information for as long as needed to provide
                our services and maintain business records, and take reasonable technical and
                organizational measures to protect it against unauthorized access, loss, or
                misuse.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Your Choices</h2>
              <p>
                You can ask us to access, correct, or delete the personal information we hold
                about you at any time by contacting us using the details below.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Contact Us</h2>
              <p>
                Questions about this policy or your information? Reach us at{" "}
                <a href={`mailto:${SITE.email}`} className="text-brand-red hover:underline">
                  {SITE.email}
                </a>{" "}
                or{" "}
                <a href={SITE.phoneHref} className="text-brand-red hover:underline">
                  {SITE.phone}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
