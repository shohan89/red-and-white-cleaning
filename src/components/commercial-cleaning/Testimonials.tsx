import { Star } from "lucide-react";
import styles from "../deep-cleaning/deep-cleaning.module.css";

const TESTIMONIALS = [
  {
    quote: "All three cleaning phases on our tower, and never once held up a handover.",
    name: "Site Superintendent",
    location: "Guelph, ON",
  },
  {
    quote: "Construction film gone from every window before inspection. Exactly what we needed.",
    name: "Project Manager",
    location: "London, ON",
  },
  {
    quote: "Same crew every week, same standard — and the lunchroom is spotless.",
    name: "Office Manager",
    location: "Kitchener, ON",
  },
  {
    quote: "Insured, affordable, and easy to schedule around our trades.",
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
          <h2 className={styles.sectionTitle}>Trusted by Builders &amp; Businesses</h2>
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
          Want the same standard on your site?{" "}
          <a href="#lead-form" className={styles.testimonialsNoteLink}>
            Get your free quote
          </a>{" "}
          &mdash; replies the same business day.
        </p>
      </div>
    </section>
  );
}
