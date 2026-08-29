import Image from "next/image";
import { CheckCircle2, Phone, Star } from "lucide-react";
import { SITE } from "@/config/site";
import { LeadForm } from "./LeadForm";
import styles from "./deep-cleaning.module.css";

const TRUST_ITEMS = [
  "Licensed & Insured",
  "Same-Day Free Quotes",
  "Consistent Cleaning Crew",
];

export function Hero() {
  return (
    <section className={styles.hero} aria-label="Deep cleaning services hero">
      <div className={styles.heroBgWrap}>
        <Image
          src="/images/portfolio/deep-clean-hero.webp"
          alt="Spotless, professionally deep-cleaned kitchen by Red & White Cleaning Services"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroGlow} aria-hidden="true" />
      </div>

      <div className={`${styles.container} ${styles.heroInner}`}>
        <div className={styles.heroGrid}>
          <div className={styles.heroTextCol}>
            <div className={styles.heroBadge}>
              <span className={styles.heroStars} aria-hidden="true">
                <Star size={13} fill="currentColor" strokeWidth={0} />
                <Star size={13} fill="currentColor" strokeWidth={0} />
                <Star size={13} fill="currentColor" strokeWidth={0} />
                <Star size={13} fill="currentColor" strokeWidth={0} />
                <Star size={13} fill="currentColor" strokeWidth={0} />
              </span>
              Deep Cleaning Experts in Kitchener, Waterloo &amp; Southern Ontario
            </div>

            <h1 className={styles.heroTitle}>
              Professional <em>Deep Cleaning</em>{" "}
              &amp; Move Out Cleaning Services Near You
            </h1>

            <p className={styles.heroSubtitle}>
              Searching for the best deep cleaning service near me? Our
              professional deep cleaners handle whole-home deep cleans, move
              in / move out cleaning, Airbnb deep cleans and after-event
              clean-ups across Kitchener, Waterloo, Cambridge, Guelph,
              Hamilton, London and Brantford. Licensed, insured, and quoted
              free in minutes.
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
