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
    desc: "Crews arrive in PPE, follow your site safety rules, and know how to work around active trades and live equipment.",
  },
  {
    icon: ShieldCheck,
    title: "Fully Insured",
    desc: "Proof of insurance available on request for contractors and property managers who need documentation before booking.",
  },
  {
    icon: Users,
    title: "Consistent Crews",
    desc: "The same trained team returns to your site or facility — no strangers, no re-training, no surprises.",
  },
  {
    icon: CalendarClock,
    title: "Works to Your Timeline",
    desc: "Tight or shifting schedule? We book around your build — including evenings and weekends when the job calls for it.",
  },
  {
    icon: Layers,
    title: "Scales With the Project",
    desc: "From a single commercial unit to a multi-phase tower with Phase 1, 2 and 3 cleans across dozens of suites.",
  },
  {
    icon: BadgeCheck,
    title: "Satisfaction Guarantee",
    desc: "Something missed at walk-through? Tell us within 24 hours and we’ll come back and make it right.",
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
            <p className={styles.eyebrow}>Why Contractors &amp; Property Managers Choose Us</p>
            <h2 className={styles.sectionTitle}>
              Southern Ontario&rsquo;s Commercial Cleaning Contractors &amp; Post Construction Cleaning Experts
            </h2>
            <p className={styles.whyIntro}>
              {SITE.shortName}{" "}
              is a commercial cleaning company based in the KW Region. Since{" "}
              {SITE.founded}{" "}
              our builders cleaning services and business cleaning services have
              served general contractors, developers, property managers and
              office managers who need the job done right &mdash; and done on time.
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
