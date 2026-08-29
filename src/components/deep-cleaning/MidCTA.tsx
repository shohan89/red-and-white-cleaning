import { Phone } from "lucide-react";
import { SITE } from "@/config/site";
import styles from "./deep-cleaning.module.css";

export function MidCTA() {
  return (
    <section className={styles.midCta} aria-label="Book a deep clean">
      <div className={styles.container}>
        <div className={styles.midCtaInner}>
          <div>
            <h2 className={styles.midCtaTitle}>Want This Level of Clean in Your Home?</h2>
            <p className={styles.midCtaText}>
              Searching &ldquo;deep cleaning near me&rdquo;? Book professional deep
              cleaners in Kitchener, Waterloo, Cambridge, Guelph, Hamilton,
              London or Brantford. Free quotes, usually the same business day.
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
