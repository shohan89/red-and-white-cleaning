import {
  Truck,
  CalendarCheck,
  Sparkles,
  Building2,
  Home,
  Bath,
} from "lucide-react";
import styles from "./deep-cleaning.module.css";

const SERVICES = [
  {
    icon: Truck,
    title: "Move In / Move Out Cleaning",
    desc: "Apartment move out cleaning, end of tenancy cleaning, tenant move out cleaning and move in deep cleaning \u2014 residential or commercial. Handing a unit back to a landlord, welcoming new tenants, or just bought a home? Our move out cleaning company leaves it pristine and inspection-ready.",
  },
  {
    icon: Bath,
    title: "Kitchen & Bathroom Deep Clean",
    desc: "A bathroom deep clean and kitchen detailing that goes past the surface: grout, tile, tub and glass, inside the oven and fridge, cabinet fronts and under the sink \u2014 the jobs regular house cleaning skips.",
  },
  {
    icon: CalendarCheck,
    title: "Seasonal / Annual Deep Clean",
    desc: "Seasonal cleaning and annual deep cleaning to reset the whole home \u2014 or a one off deep clean when the house simply needs a full top-to-bottom refresh.",
  },
  {
    icon: Sparkles,
    title: "After Event Cleaning / Post-Reno Clean-Up",
    desc: "Fast clean up after parties, corporate events or minor renovations. Our after event cleaners restore order quickly so you can get back to normal.",
  },
  {
    icon: Building2,
    title: "Pre-Sale / Pre-Inspection Clean",
    desc: "Elevate your property\u2019s appeal ahead of listing photos, inspections or buyer walkthroughs with a professional deep clean from experts who know what inspectors look for.",
  },
  {
    icon: Home,
    title: "Airbnb Deep Clean",
    desc: "Airbnb deep clean and meticulous turnover service for short-term rentals \u2014 deep sanitization between guests to protect your ratings.",
  },
];

export function Services() {
  return (
    <section className={styles.services} aria-label="Deep cleaning services">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>What&rsquo;s Included</p>
          <h2 className={styles.sectionTitle}>Deep Cleaning Services for Every Situation</h2>
          <p className={styles.sectionSubtitle} style={{ margin: "0 auto" }}>
            From a one-off deep clean to professional move out cleaning
            services, every job is a full, top-to-bottom clean built around
            the spots regular cleaning leaves behind.
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
