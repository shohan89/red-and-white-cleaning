import Image from "next/image";
import styles from "../deep-cleaning/deep-cleaning.module.css";

const ITEMS = [
  {
    src: "/images/portfolio/residential-kitchen-ba.webp",
    title: "Kitchen Reset",
    desc: "Counters, appliances, cabinets and sink brought back to spotless.",
  },
  {
    src: "/images/portfolio/residential-bathroom-ba.webp",
    title: "Bathroom Detail",
    desc: "Tile, tub, vanity and grout scrubbed and sanitized top to bottom.",
  },
  {
    src: "/images/portfolio/residential-sink-ba.webp",
    title: "Move-In Ready Detail",
    desc: "Under-sink and cabinet interiors — the spots move-in and move-out inspections check.",
  },
];

export function BeforeAfter() {
  return (
    <section className={styles.beforeAfter} aria-label="Before and after results">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Real Results</p>
          <h2 className={styles.sectionTitle}>See the Difference in Real Homes We&rsquo;ve Cleaned</h2>
          <p className={styles.sectionSubtitle} style={{ margin: "0 auto" }}>
            Real before-and-after photos from residential cleaning jobs in Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London and Brantford.
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
