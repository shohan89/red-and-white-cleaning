import Image from "next/image";
import {
  Sparkles,
  ShieldCheck,
  Users,
  Leaf,
  Clock,
  BadgeCheck,
  Star,
} from "lucide-react";
import { SITE } from "@/config/site";
import styles from "./deep-cleaning.module.css";

const REASONS = [
  {
    icon: Sparkles,
    title: "A True Deep Clean",
    desc: "Baseboards, inside appliances, behind furniture, vents \u2014 we clean what surface cleanings leave behind.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed & Insured",
    desc: "Fully licensed and insured in Ontario, so your home and your peace of mind are protected.",
  },
  {
    icon: Users,
    title: "Consistent Cleaning Crew",
    desc: "The same vetted, trained deep cleaning professionals come back each visit — no strangers, no surprises.",
  },
  {
    icon: Leaf,
    title: "Safe, Eco-Conscious Products",
    desc: "Family- and pet-friendly supplies. Fragrance-free options available on request.",
  },
  {
    icon: Clock,
    title: "On Time, Every Time",
    desc: "We show up in the window we promised \u2014 and we tell you if anything changes.",
  },
  {
    icon: BadgeCheck,
    title: "Satisfaction Guarantee",
    desc: "Not happy with a spot? Tell us and we\u2019ll come back to make it right.",
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
                alt="Sparkling glass shower and tile after a bathroom deep clean by Red & White Cleaning"
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
              <span className={styles.whyBadgeLabel}>Deep cleaning professionals</span>
            </div>
          </div>

          <div className={styles.whyContent}>
            <p className={styles.eyebrow}>Why Homeowners Choose Us</p>
            <h2 className={styles.sectionTitle}>
              Southern Ontario&rsquo;s Deep Cleaning Experts
            </h2>
            <p className={styles.whyIntro}>
              We built {SITE.shortName}{" "}
              &mdash; a local deep cleaning company &mdash; around the things other cleaners rush:
              the details, the trust, and showing up when we say we will.
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
