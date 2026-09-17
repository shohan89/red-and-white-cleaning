import { Star } from "lucide-react";
import styles from "../deep-cleaning/deep-cleaning.module.css";

const TESTIMONIALS = [
  {
    quote: "They cleaned before we listed and our realtor said it made a real difference in the photos.",
    name: "Homeowner",
    location: "Kitchener, ON",
  },
  {
    quote: "Same two cleaners every time — my kids and pets are used to them now.",
    name: "Homeowner",
    location: "Waterloo, ON",
  },
  {
    quote: "Move-out clean got us our full deposit back, no questions asked.",
    name: "Renter",
    location: "Guelph, ON",
  },
  {
    quote: "Booked a one-time deep clean and switched to biweekly after seeing the results.",
    name: "Homeowner",
    location: "Cambridge, ON",
  },
];

export function Testimonials() {
  return (
    <section className={styles.testimonials} aria-label="Client testimonials">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Client Stories</p>
          <h2 className={styles.sectionTitle}>Trusted by Homeowners &amp; Renters</h2>
        </div>

        <div className={styles.testimonialsGrid}>
          {TESTIMONIALS.map(({ quote, name, location }) => (
            <div key={name + location} className={styles.testimonialCard}>
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
          Want the same standard in your home?{" "}
          <a href="#lead-form" className={styles.testimonialsNoteLink}>
            Get your free quote
          </a>{" "}
          &mdash; replies the same business day.
        </p>
      </div>
    </section>
  );
}
