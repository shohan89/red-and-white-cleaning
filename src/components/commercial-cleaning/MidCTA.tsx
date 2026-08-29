import { Phone } from "lucide-react";
import { SITE } from "@/config/site";
import styles from "../deep-cleaning/deep-cleaning.module.css";

export function MidCTA() {
  return (
    <section className={styles.midCta} aria-label="Book a site clean">
      <div className={styles.container}>
        <div className={styles.midCtaInner}>
          <div>
            <h2 className={styles.midCtaTitle}>Need Commercial Cleaners Near You?</h2>
            <p className={styles.midCtaText}>
              Fast quotes for post construction cleanup, office cleaning or
              janitorial contracts across Kitchener&ndash;Waterloo and Southern
              Ontario.
            </p>
          </div>
          <div className={styles.midCtaActions}>
            <a href={SITE.phoneHref} className={`${styles.btn} ${styles.btnPrimary}`}>
              <Phone size={16} aria-hidden="true" />
              {SITE.phone}
            </a>
            <a href="#lead-form" className={`${styles.btn} ${styles.btnOutline}`}>
              Get Free Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
