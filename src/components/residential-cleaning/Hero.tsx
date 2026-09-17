import Image from "next/image";
import { CheckCircle2, Phone, Star } from "lucide-react";
import { SITE } from "@/config/site";
import { LeadForm } from "./LeadForm";
import styles from "../deep-cleaning/deep-cleaning.module.css";

const TRUST_ITEMS = ["Fully Insured", "Same Trusted Cleaners", "Flexible Scheduling"];

export function Hero() {
  return (
    <section className={styles.hero} aria-label="Residential cleaning services hero">
      <div className={styles.heroBgWrap}>
        <Image
          src="/images/portfolio/why-choose-us-bathroom.webp"
          alt="Freshly cleaned bathroom with glass shower in a Kitchener-area home, cleaned by Red & White Cleaning"
          fill
          priority
          sizes="100vw"
          style={{ objectPosition: "center 30%" }}
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
              Residential Cleaning Company &mdash; Southern Ontario
            </div>

            <h1 className={styles.heroTitle}>
              Residential House Cleaning Near You
            </h1>

            <p className={styles.heroSubtitle}>
              Move-in/move-out, pre-sale, deep cleans and recurring home
              cleaning across Kitchener, Waterloo, Cambridge, Guelph,
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
