import { ShieldCheck, Leaf, BadgeCheck, Clock, ThumbsUp } from "lucide-react";
import styles from "./deep-cleaning.module.css";

const ITEMS = [
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: BadgeCheck, label: "Consistent Cleaning Crew" },
  { icon: Leaf, label: "Eco-Conscious Products" },
  { icon: ThumbsUp, label: "Satisfaction Guaranteed" },
  { icon: Clock, label: "Fast Clean-Up, Same-Day Quotes" },
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
