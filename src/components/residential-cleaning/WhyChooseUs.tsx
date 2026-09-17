import Image from "next/image";
import {
  Home,
  ShieldCheck,
  Users,
  CalendarClock,
  Sparkles,
  BadgeCheck,
  Star,
} from "lucide-react";
import { SITE } from "@/config/site";
import styles from "../deep-cleaning/deep-cleaning.module.css";

const REASONS = [
  {
    icon: Home,
    title: "Every Room Covered",
    desc: "Kitchen, bathrooms, bedrooms, floors and dusting — a full top-to-bottom clean every visit.",
  },
  {
    icon: ShieldCheck,
    title: "Fully Insured",
    desc: "Proof of insurance available on request before booking.",
  },
  {
    icon: Users,
    title: "Same Trusted Cleaners",
    desc: "The same vetted team returns every visit, so you always know who's in your home.",
  },
  {
    icon: CalendarClock,
    title: "Works Around Your Life",
    desc: "Weekly, bi-weekly, monthly, or one-time — scheduled around you, not the other way around.",
  },
  {
    icon: Sparkles,
    title: "Flexible for Any Occasion",
    desc: "Move-in/move-out, pre-sale, post-renovation resets, or ongoing maintenance — one team for it all.",
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
                src="/images/portfolio/why-choose-us-bathroom.webp"
                alt="Red & White Cleaning residential cleaner detailing a bathroom in a Kitchener-area home"
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
              <span className={styles.whyBadgeLabel}>Trusted by homeowners &amp; renters</span>
            </div>
          </div>

          <div className={styles.whyContent}>
            <p className={styles.eyebrow}>Why Choose Us</p>
            <h2 className={styles.sectionTitle}>
              Southern Ontario&rsquo;s Trusted Residential Cleaning Team
            </h2>
            <p className={styles.whyIntro}>
              We bring the same professional standard we apply to
              construction sites and commercial buildings to residential
              homes across the region, serving homeowners, new buyers, home
              sellers, landlords and renters since {SITE.founded}.
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
