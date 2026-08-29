import Image from "next/image";
import styles from "./deep-cleaning.module.css";

const ITEMS = [
  {
    src: "/images/portfolio/residential-kitchen-ba.webp",
    title: "Kitchen Deep Clean",
    desc: "Cabinets, counters, appliances, and floors — completely reset.",
  },
  {
    src: "/images/portfolio/residential-bathroom-ba.webp",
    title: "Bathroom Deep Clean",
    desc: "Grout, tub, and fixtures scrubbed and sanitized top to bottom.",
  },
  {
    src: "/images/portfolio/residential-sink-ba.webp",
    title: "Move-Out Cleaning Detail",
    desc: "Under-sink and cabinet interiors — the spots tenant move out cleaning inspections check.",
  },
];

export function BeforeAfter() {
  return (
    <section className={styles.beforeAfter} aria-label="Before and after results">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Real Results</p>
          <h2 className={styles.sectionTitle}>See the Difference Professional Deep Cleaning Makes</h2>
          <p className={styles.sectionSubtitle} style={{ margin: "0 auto" }}>
            Real before-and-after photos from deep cleaning jobs in Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London and Brantford.
          </p>
        </div>

        <div className={styles.baGrid}>
          {ITEMS.map(({ src, title, desc }) => (
            <div key={src} className={styles.baCard}>
              <div className={styles.baImageWrap}>
                <Image
                  src={src}
                  alt={`Before and after ${title.toLowerCase()} by Red & White Cleaning Services`}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  loading="lazy"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className={styles.baCaption}>
                <h3 className={styles.baCaptionTitle}>{title}</h3>
                <p className={styles.baCaptionDesc}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
