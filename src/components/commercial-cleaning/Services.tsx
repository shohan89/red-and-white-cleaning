import {
  HardHat,
  ClipboardCheck,
  Building2,
  Briefcase,
  Sparkles,
  AppWindow,
} from "lucide-react";
import styles from "../deep-cleaning/deep-cleaning.module.css";

const SERVICES = [
  {
    icon: HardHat,
    title: "Post Construction Cleaning",
    desc: "Rough and final cleans for contractors and builders — debris, dust, construction film removal and floor polishing. Handover-ready.",
  },
  {
    icon: ClipboardCheck,
    title: "PDI & Occupancy Cleaning",
    desc: "Suites detailed for the pre-delivery inspection, then prepped again before residents move in.",
  },
  {
    icon: Briefcase,
    title: "Office Cleaning",
    desc: "Corporate office cleaning, one-time or recurring — desks, washrooms, floors, glass, kitchen and lunchroom. Affordable and after-hours.",
  },
  {
    icon: Building2,
    title: "Commercial Building & Janitorial Services",
    desc: "Weekly, bi-weekly or monthly janitorial contracts — office and common area cleaning, lobbies, corridors and washrooms.",
  },
  {
    icon: Sparkles,
    title: "Commercial Deep Cleaning & Airbnb Cleaning",
    desc: "Top-to-bottom resets for retail, warehouse and professional spaces, plus Airbnb turnovers.",
  },
  {
    icon: AppWindow,
    title: "Window, Common Area & Mechanical Room Cleaning",
    desc: "Glazing with construction film removal, condo common areas, and mechanical rooms cleaned around live equipment.",
  },
];

export function Services() {
  return (
    <section className={styles.services} aria-label="Commercial and construction cleaning services">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>What We Do</p>
          <h2 className={styles.sectionTitle}>Commercial &amp; Construction Cleaning Services</h2>
          <p className={styles.sectionSubtitle} style={{ margin: "0 auto" }}>
            From the first rough clean to scheduled office cleaning after handover.
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
