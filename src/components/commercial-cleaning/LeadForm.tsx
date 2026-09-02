"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import styles from "../deep-cleaning/deep-cleaning.module.css";

const SERVICE_OPTIONS = [
  "Post Construction Cleaning (Rough / Final)",
  "After Builders / Construction Clean Up",
  "PDI / Pre-Occupancy Clean",
  "Office Cleaning (One-Time or Recurring)",
  "Commercial Building Janitorial Services",
  "Commercial Deep Cleaning",
  "Airbnb / Short-Term Rental Cleaning",
  "Window, Common Area or Mechanical Room Cleaning",
  "Other Commercial Cleaning",
];

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  location?: string;
  service?: string;
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
    event: "commercial_cleaning_lead",
    lead_source: "commercial-construction-landing",
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
    const location = String(data.get("location") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();

    if (name.length < 2) next.name = "Please enter your full name";
    if (phone.length < 7) next.phone = "Please enter a valid phone number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email";
    if (location.length < 2) next.location = "Please enter your city or town";
    if (!service) next.service = "Please select a service";

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
    try {
      const res = await fetch("/api/commercial-cleaning-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          location: data.get("location"),
          service: data.get("service"),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      trackLead(String(data.get("service") ?? ""));
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
            Thanks — a member of our team will call or email you shortly with your quote.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.glassCard}>
      <h2 className={styles.glassTitle}>Get Your Free Site Quote</h2>
      <p className={styles.glassSubtitle}>
        Tell us about your site or office — we reply the same business day.
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
          <label htmlFor="location" className={styles.glassLabel}>
            Your Location <span className={styles.glassRequired}>*</span>
          </label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="Kitchener, ON"
            autoComplete="address-level2"
            className={`${styles.glassInput} ${errors.location ? styles.glassInputError : ""}`}
          />
          {errors.location && <p className={styles.glassErrorText}>{errors.location}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="service" className={styles.glassLabel}>
            Service Needed <span className={styles.glassRequired}>*</span>
          </label>
          <select
            id="service"
            name="service"
            defaultValue=""
            className={`${styles.glassSelect} ${errors.service ? styles.glassInputError : ""}`}
          >
            <option value="" disabled>
              Select a service...
            </option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.service && <p className={styles.glassErrorText}>{errors.service}</p>}
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
