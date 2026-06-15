import React from "react";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";

interface ContactSettings {
  heading?: string
  subheading?: string
  phone?: string
  email?: string
}

export function ContactInfo({ settings = {} }: { settings?: ContactSettings }) {
  const heading = settings.heading ?? "Get in Touch"
  const subheading = settings.subheading ?? "Whether you need a post-construction quote, want to discuss a commercial cleaning contract, or have a general inquiry, our team is ready to help."
  const phone = settings.phone ?? "519-574-1552"
  const email = settings.email ?? "redandwhiteclean@gmail.com"

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
          {heading}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {subheading}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {/* Phone Card */}
        <a
          href={`tel:${phone}`}
          className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-brand-red/40 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-red/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="relative z-10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/10 group-hover:bg-brand-red/20 transition-all duration-300">
              <Phone className="h-6 w-6 text-brand-red group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">Phone</h3>
            <p className="text-muted-foreground font-medium group-hover:text-brand-red transition-colors">
              {phone}
            </p>
          </div>
        </a>

        {/* Email Card */}
        <a
          href={`mailto:${email}`}
          className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-brand-red/40 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-red/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="relative z-10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/10 group-hover:bg-brand-red/20 transition-all duration-300">
              <Mail className="h-6 w-6 text-brand-red group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">Email</h3>
            <p className="text-muted-foreground font-medium group-hover:text-brand-red transition-colors text-sm sm:text-base break-words">
              {email}
            </p>
          </div>
        </a>
      </div>

      {/* Preferred Contact Card */}
      <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-brand-red/30 transition-all duration-300">
        <div className="flex gap-4 items-center">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-red/10">
            <MessageSquare className="h-6 w-6 text-brand-red" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">Preferred Contact</h3>
            <p className="text-muted-foreground">Email, Phone, or Text</p>
          </div>
        </div>
      </div>

      {/* Service Areas Card */}
      <div className="group relative overflow-hidden rounded-2xl border border-border bg-brand-red/[0.03] p-6 sm:p-8 shadow-sm hover:border-brand-red/30 transition-all duration-300 flex-1">
        <div className="flex gap-4 items-start">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-red/10">
            <MapPin className="h-6 w-6 text-brand-red" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-3">Service Area</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              KW Region, Guelph, Hamilton, London, Brantford, and surrounding areas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
