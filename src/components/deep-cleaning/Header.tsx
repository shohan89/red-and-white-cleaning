import Image from "next/image";
import { Phone } from "lucide-react";
import { SITE } from "@/config/site";
import styles from "./deep-cleaning.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.headerInner}`}>
        <div className={styles.headerBrand}>
          <div className={styles.headerLogoWrap}>
            <Image src="/images/logo.webp" alt={`${SITE.shortName} Logo`} fill sizes="40px" />
          </div>
          <span className={styles.headerBrandName}>{SITE.legalName}</span>
        </div>

        <div className={styles.headerActions}>
          <a
            href={SITE.phoneHref}
            className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}
            aria-label={`Call us at ${SITE.phone}`}
          >
            <Phone size={15} />
            <span className={styles.headerCallText}>Call Now</span>
          </a>
          <a href="#lead-form" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSm}`}>
            Get My Free Quote
          </a>
        </div>
      </div>
    </header>
  );
}
