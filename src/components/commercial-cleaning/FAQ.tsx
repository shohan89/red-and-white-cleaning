import { Plus } from "lucide-react";
import styles from "../deep-cleaning/deep-cleaning.module.css";

export const FAQS = [
  {
    question: "What is post construction cleaning?",
    answer:
      "Cleaning a building after construction or renovation — debris, dust, residue and protective film removed so the space is ready for occupancy. It usually has a rough clean during the build and a final clean after the trades finish.",
  },
  {
    question: "Do you do rough cleans and final cleans?",
    answer:
      "Yes — both. Rough clean during active construction, final clean before PDI, move-in or handoff.",
  },
  {
    question: "Can you work on a contractor’s timeline?",
    answer:
      "Yes. We schedule around your build with your project manager, including evenings and weekends.",
  },
  {
    question: "What commercial spaces do you clean?",
    answer:
      "Offices, commercial buildings, warehouses, retail, medical units, condo common areas, Airbnb units and mechanical rooms — including kitchen and lunchroom cleaning.",
  },
  {
    question: "Do you offer recurring office cleaning contracts?",
    answer:
      "Yes — weekly, bi-weekly or monthly. Recurring clients get priority scheduling and a consistent crew.",
  },
  {
    question: "How much does office cleaning cost?",
    answer:
      "It depends on square footage, frequency and scope. Send us the size and schedule and you get a clear, affordable price the same business day.",
  },
  {
    question: "Are you insured?",
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
          <h2 className={styles.sectionTitle}>Commercial &amp; Post Construction Cleaning FAQs</h2>
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
