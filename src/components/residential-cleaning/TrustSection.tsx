import { ShieldCheck, Home, CalendarClock, Users, ThumbsUp } from "lucide-react";
import styles from "../deep-cleaning/deep-cleaning.module.css";

const ITEMS = [
  { icon: ShieldCheck, label: "Fully Insured" },
  { icon: Home, label: "Trusted in Your Home" },
  { icon: CalendarClock, label: "Flexible Scheduling" },
  { icon: Users, label: "Same Cleaners Every Visit" },
  { icon: ThumbsUp, label: "Satisfaction Guaranteed" },
];

export function TrustSection() {
  return (
    <section className={styles.trust} aria-label="Why homeowners trust us">
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
