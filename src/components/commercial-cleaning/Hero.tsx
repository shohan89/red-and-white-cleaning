import Image from "next/image";
import { CheckCircle2, Phone, Star } from "lucide-react";
import { SITE } from "@/config/site";
import { LeadForm } from "./LeadForm";
import styles from "../deep-cleaning/deep-cleaning.module.css";

const TRUST_ITEMS = ["Fully Insured", "Works to Your Schedule", "Consistent Crews"];

export function Hero() {
  return (
    <section className={styles.hero} aria-label="Commercial and construction cleaning services hero">
      <div className={styles.heroBgWrap}>
        <Image
          src="/images/portfolio/commercial-hero-crew.webp"
          alt="Red & White Cleaning post construction cleaning crew cleaning floor-to-ceiling windows in a new high-rise suite in Guelph"
          fill
          priority
          sizes="100vw"
        />
        <div className={`${styles.heroOverlay} ${styles.heroOverlayStrong}`} aria-hidden="true" />
        <div className={styles.heroGlow} aria-hidden="true" />
      </div>

      <div className={`${styles.container} ${styles.heroInner}`}>
        <div className={styles.heroGrid}>
          <div className={`${styles.heroTextCol} ${styles.heroTextContrast}`}>
            <div className={styles.heroBadge}>
              <span className={styles.heroStars} aria-hidden="true">
                <Star size={13} fill="currentColor" strokeWidth={0} />
                <Star size={13} fill="currentColor" strokeWidth={0} />
                <Star size={13} fill="currentColor" strokeWidth={0} />
                <Star size={13} fill="currentColor" strokeWidth={0} />
                <Star size={13} fill="currentColor" strokeWidth={0} />
              </span>
              Commercial Cleaning Company &mdash; Southern Ontario
            </div>

            <h1 className={styles.heroTitle}>
              Commercial &amp; Post Construction Cleaning Near You
            </h1>

            <p className={styles.heroSubtitle}>
              Post construction cleaning, office cleaning and commercial
              janitorial services across Kitchener, Waterloo, Cambridge, Guelph,
              Hamilton, London and Brantford.
            </p>

            <div className={styles.heroCtas}>
              <a href="#lead-form" className={`${styles.btn} ${styles.btnPrimary}`}>
                Get My Free Quote
              </a>
              <a href={SITE.phoneHref} className={`${styles.btn} ${styles.btnGhost}`}>
                <Phone size={16} />
                Call {SITE.phone}
              </a>
            </div>

            <ul className={styles.heroTrust} aria-label="Key trust signals">
              {TRUST_ITEMS.map((item) => (
                <li key={item} className={styles.heroTrustItem}>
                  <CheckCircle2 size={15} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.heroFormCol}>
            <div id="lead-form" className={styles.heroFormAnchor}>
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
