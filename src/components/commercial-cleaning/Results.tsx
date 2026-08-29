import Image from "next/image";
import styles from "../deep-cleaning/deep-cleaning.module.css";

const ITEMS = [
  {
    src: "/images/portfolio/tricar-guelph-pdi-3.webp",
    title: "Post Construction Cleaning — Tricar, 1882 Gordon St, Guelph",
    desc: "Multi-phase program for a residential tower: rough clean, PDI clean and occupancy prep, suite by suite.",
    alt: "Suite cleaned and ready for pre-delivery inspection at Tricar 1882 Gordon Street, Guelph",
  },
  {
    src: "/images/portfolio/tricar-sportsworld.webp",
    title: "Construction Cleaning — Tricar, 25 Sportsworld Tower 2, Kitchener",
    desc: "Phase 1, 2 and 3 cleans coordinated with the project schedule — debris removal, PDI cleaning and final occupancy prep on time.",
    alt: "Tricar 25 Sportsworld Tower 2 in Kitchener, Ontario — post construction cleaning project",
  },
  {
    src: "/images/portfolio/zehr-sylk.webp",
    title: "After Builders Cleaning — Zehr Group, Sylk Towers, Kitchener",
    desc: "Full post construction cleaning program across all three phases, multiple floors and unit types.",
    alt: "Zehr Group Sylk Towers in Kitchener, Ontario — post construction cleaning program",
  },
  {
    src: "/images/portfolio/ctpm-office-space.webp",
    title: "Commercial Office Cleaning — CTPM, 609 Kumpf Dr, Kitchener",
    desc: "Ongoing office cleaning contract: LVP floors, glass and workspaces kept presentable on a schedule.",
    alt: "Clean open-plan commercial office with LVP floors at CTPM, 609 Kumpf Drive, Kitchener",
  },
  {
    src: "/images/portfolio/generator-4.webp",
    title: "Commercial Building Cleaning — 71 Wyndham St, Guelph",
    desc: "Mechanical room deep clean around live generators, chillers and fire-suppression systems.",
    alt: "Clean mechanical room with generators and fire suppression at 71 Wyndham, Guelph",
  },
  {
    src: "/images/portfolio/tricar-guelph-win-1.webp",
    title: "Construction Window Cleaning — Tricar, Guelph",
    desc: "Crew removing construction film and adhesive from floor-to-ceiling balcony glazing ahead of inspections.",
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
            Post construction cleaning, office cleaning and commercial building
            cleaning projects our crews have completed across Kitchener,
            Waterloo, Cambridge, Guelph, Hamilton, London and Brantford.
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
