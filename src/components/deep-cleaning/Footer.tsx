import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { SITE } from "@/config/site";
import styles from "./deep-cleaning.module.css";

const SERVICE_AREAS = [
  "Kitchener",
  "Waterloo",
  "Cambridge",
  "Guelph",
  "Hamilton",
  "London",
  "Brantford",
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles.footerInner}`}>
        <div className={styles.footerBrand}>
          <div className={styles.footerLogoWrap}>
            <Image src="/images/logo.jpg" alt={SITE.shortName} fill sizes="34px" />
          </div>
          <span className={styles.footerName}>{SITE.legalName}</span>
        </div>

        <div className={styles.footerContact}>
          <a href={SITE.phoneHref}>
            <Phone size={14} aria-hidden="true" />
            {SITE.phone}
          </a>
          <a href={`mailto:${SITE.email}`}>
            <Mail size={14} aria-hidden="true" />
            {SITE.email}
          </a>
        </div>

        <p className={styles.footerAreas}>
          Professional deep cleaning services in Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London &amp; Brantford, Ontario &mdash; move in / move out cleaning, end of tenancy cleaning, Airbnb deep cleans, after-event cleaning and seasonal deep cleans.
        </p>

        <ul className={styles.footerAreaList} aria-label="Service areas">
          {SERVICE_AREAS.map((city) => (
            <li key={city}>Deep Cleaning {city}</li>
          ))}
        </ul>

        <div className={styles.footerBottom}>
          © {new Date().getFullYear()} {SITE.legalName}. Licensed &amp; insured. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
