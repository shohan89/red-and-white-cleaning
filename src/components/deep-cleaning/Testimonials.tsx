import { Star } from "lucide-react";
import styles from "./deep-cleaning.module.css";

const TESTIMONIALS = [
  {
    quote:
      "Easily the best deep cleaning service near us. The kitchen and bathrooms looked brand new after they finished \u2014 worth every dollar for the detail they put in.",
    name: "Sarah M.",
    location: "Kitchener, ON",
  },
  {
    quote:
      "Booked apartment move out cleaning and the crew showed up on time and did an incredible job. Made getting our deposit back easy.",
    name: "James T.",
    location: "Waterloo, ON",
  },
  {
    quote:
      "Hired them for a one-off deep clean before hosting family. Baseboards, cabinets, everything \u2014 spots I didn't even think to ask about were cleaned.",
    name: "Priya K.",
    location: "London, ON",
  },
  {
    quote:
      "We use them for Airbnb deep cleans between guests. Quick to quote, easy to book, and it's the same consistent crew every time.",
    name: "Mike D.",
    location: "Guelph, ON",
  },
];

export function Testimonials() {
  return (
    <section className={styles.testimonials} aria-label="Customer testimonials">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Customer Stories</p>
          <h2 className={styles.sectionTitle}>Trusted by Homeowners Across Southern Ontario</h2>
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
          Illustrative reviews shown for demonstration &mdash; verified customer reviews coming soon.
        </p>
      </div>
    </section>
  );
}
