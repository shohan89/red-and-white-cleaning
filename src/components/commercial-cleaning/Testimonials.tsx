import { Star } from "lucide-react";
import styles from "../deep-cleaning/deep-cleaning.module.css";

const TESTIMONIALS = [
  {
    quote:
      "The best after builders cleaning we have used. They handled all three phases on our tower and never once held up a handover.",
    name: "Site Superintendent",
    location: "Residential tower, Guelph, ON",
  },
  {
    quote:
      "Reliable commercial cleaners in London, Ontario are hard to find. Construction film gone from every window before inspection — exactly what we needed.",
    name: "Project Manager",
    location: "Condo development, London, ON",
  },
  {
    quote:
      "Our office cleaners show up every week without anyone noticing they were there — same crew, same standard, and the lunchroom is spotless.",
    name: "Office Manager",
    location: "Commercial unit, Kitchener, ON",
  },
  {
    quote:
      "Insured, affordable, and easy to schedule around our trades. The only post construction cleaning company we call on new builds now.",
    name: "General Contractor",
    location: "Hamilton, ON",
  },
];

export function Testimonials() {
  return (
    <section className={styles.testimonials} aria-label="Client testimonials">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Client Stories</p>
          <h2 className={styles.sectionTitle}>Trusted by Builders &amp; Businesses Across Southern Ontario</h2>
        </div>

        <div className={styles.testimonialsGrid}>
          {TESTIMONIALS.map(({ quote, name, location }) => (
            <div key={name} className={styles.testimonialCard}>
              <div className={styles.testimonialStars} aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className={styles.testimonialQuote}>&ldquo;{quote}&rdquo;</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar} aria-hidden="true">
                  {name.charAt(0)}
                </div>
                <div>
                  <p className={styles.testimonialName}>{name}</p>
                  <p className={styles.testimonialLocation}>{location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className={styles.testimonialsNote}>
          Need the same standard on your site or in your office?{" "}
          <a href="#lead-form" className={styles.testimonialsNoteLink}>
            Get your free quote
          </a>{" "}
          in under a minute &mdash; most requests get a reply the same business day.
        </p>
      </div>
    </section>
  );
}
