import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { SITE } from "@/config/site";
import styles from "../deep-cleaning/deep-cleaning.module.css";

const SERVICE_AREAS = [
  "Commercial Cleaning Kitchener",
  "Commercial Cleaning Waterloo",
  "Commercial Cleaning Cambridge",
  "Commercial Cleaning Hamilton",
  "Commercial Cleaning Brantford",
  "Commercial Cleaners London Ontario",
  "Office Cleaning Kitchener",
  "Office Cleaning Waterloo",
  "Office Cleaning Cambridge ON",
  "Office Cleaners Guelph",
  "Office Cleaning Hamilton",
  "Office Cleaning Brantford",
  "Post Construction Cleaning Kitchener",
  "Post Construction Cleaning Cambridge ON",
  "Post Construction Cleaners Guelph",
  "Post Construction Cleaning Hamilton",
  "Construction Cleanup London Ontario",
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
          Commercial cleaning company serving Kitchener, Waterloo (KW), Cambridge, Guelph, Hamilton, London &amp; Brantford, Ontario &mdash; post construction cleaning, after builders cleaning, office cleaning, commercial building janitorial services, commercial property cleaning services, commercial deep cleaning and Airbnb cleaning.
        </p>

        <ul className={styles.footerAreaList} aria-label="Service areas">
          {SERVICE_AREAS.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul>

        <div className={styles.footerBottom}>
          © {new Date().getFullYear()} {SITE.legalName}. Licensed &amp; insured. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
