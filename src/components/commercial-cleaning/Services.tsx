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
    desc: "After construction cleaning and construction clean up services for general contractors and builders: rough clean during the build, final clean once the trades are out. Dust and debris removal, construction film and adhesive removal, floor polishing, bathroom and kitchen scrub-out — the after builders cleaning that makes a site handover-ready.",
  },
  {
    icon: ClipboardCheck,
    title: "PDI & Occupancy Cleaning",
    desc: "Phase 2 and Phase 3 cleans for developers: suites detailed for the pre-delivery inspection, then prepped again before handover to new residents — coordinated with your project schedule, suite by suite.",
  },
  {
    icon: Briefcase,
    title: "Office Cleaning",
    desc: "Corporate office cleaning and commercial office cleaning services — one-time or recurring. Desks, washrooms, floors, glass, plus kitchen and lunchroom cleaning. Affordable office cleaning from an office cleaning company whose office cleaning contractors work around your business hours.",
  },
  {
    icon: Building2,
    title: "Commercial Building & Janitorial Services",
    desc: "Commercial building cleaning services and commercial building janitorial services on weekly, bi-weekly or monthly contracts — office and common area cleaning, lobbies, corridors, stairwells and washrooms. A cleaning company for business owners and commercial property managers.",
  },
  {
    icon: Sparkles,
    title: "Commercial Deep Cleaning & Airbnb Cleaning",
    desc: "Commercial deep cleaning services for retail units, warehouses, medical and professional spaces, plus Airbnb cleaning and short-term rental turnovers — top-to-bottom resets when a space needs more than routine maintenance.",
  },
  {
    icon: AppWindow,
    title: "Window, Common Area & Mechanical Room Cleaning",
    desc: "Interior and exterior glazing with construction film and sticker removal, condo common areas, laundry rooms, and mechanical or generator rooms — cleaned around live equipment with wet-floor safety protocols in place.",
  },
];

export function Services() {
  return (
    <section className={styles.services} aria-label="Commercial and construction cleaning services">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>What We Do</p>
          <h2 className={styles.sectionTitle}>Commercial Cleaning &amp; Construction Cleaning Services</h2>
          <p className={styles.sectionSubtitle} style={{ margin: "0 auto" }}>
            Business cleaning services for every stage &mdash; from the first
            rough clean on a construction site to scheduled office cleaning
            long after handover.
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
