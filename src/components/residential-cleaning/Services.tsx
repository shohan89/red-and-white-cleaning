import {
  Key,
  Tag,
  CalendarCheck2,
  Home,
  Sparkles,
  AppWindow,
} from "lucide-react";
import styles from "../deep-cleaning/deep-cleaning.module.css";

const SERVICES = [
  {
    icon: Key,
    title: "Move In / Move Out Cleaning",
    desc: "Just bought a home, preparing to list, or handing back a rental? We leave the space spotless top to bottom.",
  },
  {
    icon: Tag,
    title: "Pre-Sale / Pre-Listing Clean",
    desc: "A thorough professional clean before listing — helps buyers see the home at its best and can help it sell faster.",
  },
  {
    icon: CalendarCheck2,
    title: "Recurring Home Cleaning",
    desc: "Weekly, bi-weekly or monthly residential cleaning schedules tailored around your routine and your home.",
  },
  {
    icon: Home,
    title: "Deep / Reset Clean",
    desc: "After a renovation, a busy stretch, or just a seasonal reset — a thorough top-to-bottom clean to bring it back to its best.",
  },
  {
    icon: Sparkles,
    title: "Kitchen & Bathroom Deep Clean",
    desc: "Counters, appliances, cabinets, sink, tub/shower, tiles and vanity — scrubbed and sanitized.",
  },
  {
    icon: AppWindow,
    title: "Windows, Floors & Dusting Detail",
    desc: "Interior windows, floors swept and mopped, and dusting from baseboards to ceiling fans and light fixtures.",
  },
];

export function Services() {
  return (
    <section className={styles.services} aria-label="Residential cleaning services">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>What We Do</p>
          <h2 className={styles.sectionTitle}>Residential Cleaning Services</h2>
          <p className={styles.sectionSubtitle} style={{ margin: "0 auto" }}>
            From one-time deep cleans to ongoing home maintenance — we work around your life, not the other way around.
          </p>
        </div>

        <div className={styles.servicesGrid}>
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3 className={styles.serviceTitle}>{title}</h3>
              <p className={styles.serviceDesc}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
