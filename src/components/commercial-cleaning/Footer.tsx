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
  "Office Cleaners Guelph",
  "Office Cleaning Kitchener",
  "Post Construction Cleaning Kitchener",
  "Post Construction Cleaners Guelph",
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
          Commercial cleaning company serving Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London &amp; Brantford &mdash; post construction cleaning, office cleaning, janitorial services and Airbnb cleaning.
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
