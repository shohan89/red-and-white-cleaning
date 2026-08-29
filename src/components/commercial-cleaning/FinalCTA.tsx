import Image from "next/image";
import { Phone } from "lucide-react";
import { SITE } from "@/config/site";
import styles from "../deep-cleaning/deep-cleaning.module.css";

export function FinalCTA() {
  return (
    <section className={styles.finalCta} aria-label="Book your site or facility clean">
      <div className={styles.finalCtaBgWrap} aria-hidden="true">
        <Image
          src="/images/portfolio/final-cta-commercial-office.webp"
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
            Ready to Hire Commercial Cleaners Near You?
          </h2>
          <p className={styles.finalCtaSubtitle}>
            Get a free, no-obligation quote for post construction cleaning, office cleaning or commercial building janitorial services &mdash; most requests get a reply the same business day.
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
