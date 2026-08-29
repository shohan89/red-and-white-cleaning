import Image from "next/image";
import { Phone } from "lucide-react";
import { SITE } from "@/config/site";
import styles from "./deep-cleaning.module.css";

export function FinalCTA() {
  return (
    <section className={styles.finalCta} aria-label="Book your deep clean">
      <div className={styles.finalCtaBgWrap} aria-hidden="true">
        <Image
          src="/images/portfolio/final-cta-open-plan.webp"
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
        />
      </div>
      <div className={styles.finalCtaOverlay} aria-hidden="true" />
      <div className={styles.finalCtaGlow} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.finalCtaInner}>
          <h2 className={styles.finalCtaTitle}>
            Ready to Book Professional Deep Cleaners Near You?
          </h2>
          <p className={styles.finalCtaSubtitle}>
            Get a free, no-obligation quote for deep cleaning, move out cleaning or an Airbnb deep clean &mdash; most requests get a reply the same business day.
          </p>
          <div className={styles.finalCtaButtons}>
            <a href="#lead-form" className={`${styles.btn} ${styles.btnPrimary}`}>
              Get My Free Quote
            </a>
            <a href={SITE.phoneHref} className={`${styles.btn} ${styles.btnGhost}`}>
              <Phone size={16} />
              Call {SITE.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
