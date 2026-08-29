import { Phone } from "lucide-react";
import { SITE } from "@/config/site";
import styles from "./deep-cleaning.module.css";

export function MobileCTABar() {
  return (
    <div className={styles.mobileCtaBar} aria-label="Quick contact">
      <a href={SITE.phoneHref} className={styles.mobileCtaCall} aria-label={`Call us at ${SITE.phone}`}>
        <Phone size={16} />
        Call Now
      </a>
      <a href="#lead-form" className={styles.mobileCtaQuote}>
        Get My Free Quote
      </a>
    </div>
  );
}
