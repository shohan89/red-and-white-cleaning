import Image from "next/image";
import {
  HardHat,
  ShieldCheck,
  Users,
  CalendarClock,
  Layers,
  BadgeCheck,
  Star,
} from "lucide-react";
import { SITE } from "@/config/site";
import styles from "../deep-cleaning/deep-cleaning.module.css";

const REASONS = [
  {
    icon: HardHat,
    title: "Built for Construction Sites",
    desc: "PPE, site safety rules, and crews used to working around live trades.",
  },
  {
    icon: ShieldCheck,
    title: "Fully Insured",
    desc: "Proof of insurance available on request before booking.",
  },
  {
    icon: Users,
    title: "Consistent Crews",
    desc: "The same trained team returns every visit.",
  },
  {
    icon: CalendarClock,
    title: "Works to Your Timeline",
    desc: "We book around your build — evenings and weekends included.",
  },
  {
    icon: Layers,
    title: "Scales With the Project",
    desc: "One unit or a multi-phase tower with dozens of suites.",
  },
  {
    icon: BadgeCheck,
    title: "Satisfaction Guarantee",
    desc: "Missed something? Tell us within 24 hours and we fix it free.",
  },
];

export function WhyChooseUs() {
  return (
    <section className={styles.why} aria-label="Why choose Red and White Cleaning">
      <div className={styles.container}>
        <div className={styles.whyLayout}>
          <div className={styles.whyMedia}>
            <div className={styles.whyImageWrap}>
              <Image
                src="/images/portfolio/tricar-guelph-win-2.webp"
                alt="Red & White Cleaning window crew in safety gear working an exterior balcony at a Guelph high-rise"
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                loading="lazy"
              />
            </div>
            <div className={styles.whyBadge}>
              <span className={styles.whyBadgeValue}>Since {SITE.founded}</span>
              <span className={styles.whyBadgeStars} aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
              <span className={styles.whyBadgeLabel}>Trusted by builders &amp; businesses</span>
            </div>
          </div>

          <div className={styles.whyContent}>
            <p className={styles.eyebrow}>Why Choose Us</p>
            <h2 className={styles.sectionTitle}>
              Southern Ontario&rsquo;s Commercial &amp; Post Construction Cleaning Experts
            </h2>
            <p className={styles.whyIntro}>
              A KW-based commercial cleaning company serving contractors,
              developers, property managers and office managers since{" "}
              {SITE.founded}.
            </p>

            <div className={styles.whyGrid}>
              {REASONS.map(({ icon: Icon, title, desc }) => (
                <div key={title} className={styles.whyCard}>
                  <div className={styles.whyIcon}>
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className={styles.whyTitle}>{title}</h3>
                    <p className={styles.whyDesc}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
