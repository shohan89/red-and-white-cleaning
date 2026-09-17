import { Plus } from "lucide-react";
import styles from "../deep-cleaning/deep-cleaning.module.css";

export const FAQS = [
  {
    question: "What's included in a standard residential clean?",
    answer:
      "Kitchen deep clean (counters, appliances, cabinets, sink), bathroom scrub-out (toilet, tub/shower, tiles, vanity), floors swept, mopped and vacuumed, dusting (baseboards, blinds, ceiling fans, light fixtures), interior windows, bedrooms tidied and wiped down, and garbage/recycling removed.",
  },
  {
    question: "Do you offer move-in / move-out cleaning?",
    answer:
      "Yes. Just bought a home, preparing to list, or handing back a rental — we leave the space spotless top to bottom so you start fresh or impress the next person who walks through the door.",
  },
  {
    question: "Can you clean before we list our home for sale?",
    answer:
      "Yes — a pre-sale / pre-listing clean. First impressions matter, and a thorough professional clean can make a real difference in how buyers perceive the space and how quickly it sells.",
  },
  {
    question: "Do you offer recurring home cleaning?",
    answer:
      "Yes — weekly, bi-weekly or monthly residential cleaning schedules tailored around your routine, plus one-time deep or reset cleans whenever you need one.",
  },
  {
    question: "Are you insured to clean inside my home?",
    answer:
      "Yes, fully insured. Proof of insurance is available on request.",
  },
  {
    question: "Which areas do you serve?",
    answer:
      "Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London, Brantford and surrounding Southern Ontario. Not sure? Call 519-574-1552.",
  },
];

export function FAQ() {
  return (
    <section className={styles.faq} aria-label="Frequently asked questions">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Common Questions</p>
          <h2 className={styles.sectionTitle}>Residential Cleaning FAQs</h2>
        </div>

        <div className={styles.faqList}>
          {FAQS.map(({ question, answer }) => (
            <details key={question} className={styles.faqItem}>
              <summary>
                <span>{question}</span>
                <Plus size={18} className={styles.faqIcon} aria-hidden="true" />
              </summary>
              <p className={styles.faqAnswer}>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
