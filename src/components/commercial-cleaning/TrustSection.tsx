import { ShieldCheck, HardHat, CalendarClock, Users, ThumbsUp } from "lucide-react";
import styles from "../deep-cleaning/deep-cleaning.module.css";

const ITEMS = [
  { icon: ShieldCheck, label: "Fully Insured" },
  { icon: HardHat, label: "Site-Safety Ready Crews" },
  { icon: CalendarClock, label: "Works to Your Build Schedule" },
  { icon: Users, label: "Consistent Cleaning Crews" },
  { icon: ThumbsUp, label: "Satisfaction Guaranteed" },
];

export function TrustSection() {
  return (
    <section className={styles.trust} aria-label="Why contractors and property managers trust us">
      <div className={styles.container}>
        <div className={styles.trustGrid}>
          {ITEMS.map(({ icon: Icon, label }) => (
            <div key={label} className={styles.trustItem}>
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
