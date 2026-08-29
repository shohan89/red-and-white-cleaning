import Image from "next/image";
import styles from "../deep-cleaning/deep-cleaning.module.css";

const ITEMS = [
  {
    src: "/images/portfolio/tricar-guelph-pdi-3.webp",
    title: "Post Construction Cleaning — Tricar, Guelph",
    desc: "Rough clean, PDI clean and occupancy prep, suite by suite.",
    alt: "Suite cleaned and ready for pre-delivery inspection at Tricar 1882 Gordon Street, Guelph",
  },
  {
    src: "/images/portfolio/tricar-sportsworld.webp",
    title: "Construction Cleaning — Tricar Sportsworld, Kitchener",
    desc: "Phase 1–3 cleans delivered on the project schedule.",
    alt: "Tricar 25 Sportsworld Tower 2 in Kitchener, Ontario — post construction cleaning project",
  },
  {
    src: "/images/portfolio/zehr-sylk.webp",
    title: "After Builders Cleaning — Sylk Towers, Kitchener",
    desc: "Full post construction program across three phases and multiple floors.",
    alt: "Zehr Group Sylk Towers in Kitchener, Ontario — post construction cleaning program",
  },
  {
    src: "/images/portfolio/ctpm-office-space.webp",
    title: "Office Cleaning — CTPM, Kitchener",
    desc: "Ongoing office cleaning contract — floors, glass and workspaces.",
    alt: "Clean open-plan commercial office with LVP floors at CTPM, 609 Kumpf Drive, Kitchener",
  },
  {
    src: "/images/portfolio/generator-4.webp",
    title: "Commercial Building Cleaning — 71 Wyndham, Guelph",
    desc: "Mechanical room deep clean around live generators and chillers.",
    alt: "Clean mechanical room with generators and fire suppression at 71 Wyndham, Guelph",
  },
  {
    src: "/images/portfolio/tricar-guelph-win-1.webp",
    title: "Window Cleaning — Tricar, Guelph",
    desc: "Construction film and adhesive removed from balcony glazing.",
    alt: "Three cleaners cleaning large balcony windows from inside a Tricar high-rise suite in Guelph",
  },
];

export function Results() {
  return (
    <section className={styles.beforeAfter} aria-label="Recent commercial and construction cleaning projects">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Recent Projects</p>
          <h2 className={styles.sectionTitle}>Commercial &amp; Post Construction Cleaning Projects</h2>
          <p className={styles.sectionSubtitle} style={{ margin: "0 auto" }}>
            Recent work across Kitchener, Waterloo, Guelph and beyond.
          </p>
        </div>

        <div className={styles.baGrid}>
          {ITEMS.map(({ src, title, desc, alt }) => (
            <div key={src} className={styles.baCard}>
              <div className={styles.baImageWrap}>
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  loading="lazy"
                  style={{ objectFit: "cover" }}
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
