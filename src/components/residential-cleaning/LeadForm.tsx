"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import styles from "../deep-cleaning/deep-cleaning.module.css";

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  locationService?: string;
}

type Status = "idle" | "submitting" | "success" | "error";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Fire a GTM custom event on confirmed lead submission (no PII in the payload). */
function trackLead(service: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: "residential_cleaning_lead",
    lead_source: "residential-cleaning-landing",
    service_requested: service,
  });
}

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (data: FormData): FormErrors => {
    const next: FormErrors = {};
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const locationService = String(data.get("locationService") ?? "").trim();

    if (name.length < 2) next.name = "Please enter your full name";
    if (phone.length < 7) next.phone = "Please enter a valid phone number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email";
    if (locationService.length < 3) next.locationService = "Please tell us your location and the service you need";

    return next;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot — bots fill every field, real users never see this one.
    if (String(data.get("website") ?? "").length > 0) {
      setStatus("success");
      return;
    }

    const validationErrors = validate(data);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    const locationService = String(data.get("locationService") ?? "");
    try {
      const res = await fetch("/api/residential-cleaning-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          location: locationService,
          service: locationService,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      trackLead(locationService);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={styles.glassCard}>
        <div className={styles.glassStatus}>
          <CheckCircle2 className={styles.glassStatusIcon} aria-hidden="true" />
          <h3 className={styles.glassStatusTitle}>Request Received!</h3>
          <p className={styles.glassStatusDesc}>
            Thanks — a member of our team will call or email you shortly with your free quote.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.glassCard}>
      <h2 className={styles.glassTitle}>Get Your Free Quote</h2>
      <p className={styles.glassSubtitle}>
        Tell us about your home cleaning needs — we&rsquo;ll follow up fast, usually the same day.
      </p>

      <form onSubmit={onSubmit} noValidate>
        {/* Honeypot field — hidden from real users */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.glassLabel}>
            Full Name <span className={styles.glassRequired}>*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Jane Smith"
            autoComplete="name"
            className={`${styles.glassInput} ${errors.name ? styles.glassInputError : ""}`}
          />
          {errors.name && <p className={styles.glassErrorText}>{errors.name}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.glassLabel}>
            Phone Number <span className={styles.glassRequired}>*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(519) 555-0123"
            autoComplete="tel"
            className={`${styles.glassInput} ${errors.phone ? styles.glassInputError : ""}`}
          />
          {errors.phone && <p className={styles.glassErrorText}>{errors.phone}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.glassLabel}>
            Email Address <span className={styles.glassRequired}>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            autoComplete="email"
            className={`${styles.glassInput} ${errors.email ? styles.glassInputError : ""}`}
          />
          {errors.email && <p className={styles.glassErrorText}>{errors.email}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="locationService" className={styles.glassLabel}>
            Your Location &amp; Service Needed <span className={styles.glassRequired}>*</span>
          </label>
          <input
            id="locationService"
            name="locationService"
            type="text"
            placeholder="e.g. Kitchener, ON — Recurring House Cleaning"
            className={`${styles.glassInput} ${errors.locationService ? styles.glassInputError : ""}`}
          />
          {errors.locationService && <p className={styles.glassErrorText}>{errors.locationService}</p>}
        </div>

        {status === "error" && (
          <p className={styles.glassErrorText} role="alert">
            Something went wrong sending your request. Please call us directly instead.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`}
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={17} className={styles.spin} aria-hidden="true" />
              Sending...
            </>
          ) : (
            "Get My Free Quote"
          )}
        </button>

        <p className={styles.glassFooterNote}>
          <ShieldCheck size={13} style={{ display: "inline", verticalAlign: "-2px", marginRight: 4 }} aria-hidden="true" />
          Licensed &amp; insured · No spam, ever
        </p>
      </form>
    </div>
  );
}
