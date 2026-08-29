import { Plus } from "lucide-react";
import styles from "../deep-cleaning/deep-cleaning.module.css";

export const FAQS = [
  {
    question: "What is post construction cleaning?",
    answer:
      "Post construction cleaning (also called after construction cleaning or after builders cleaning) is the process of cleaning a building once construction or renovation work is complete — removing debris, dust, residue and protective coverings so the space is ready for occupancy or handoff. It typically has two phases: a rough clean during construction and a final clean after all trades have finished. If you have been searching for post construction cleaning near me or post construction cleaning services near me, this is the service you need.",
  },
  {
    question: "Do you do rough cleans and final cleans?",
    answer:
      "Yes. Our construction cleaners handle both phases — the rough clean during active construction (debris and major mess) and the final clean after the trades are done, preparing the space for PDI, move-in or client handoff.",
  },
  {
    question: "What do your construction clean up services include?",
    answer:
      "Typically: dust and debris removal from all surfaces, window and glass cleaning including construction film and adhesive removal, floor cleaning and polishing, bathroom and kitchen scrub-out, HVAC vent cleaning, and a final walk-through inspection. We customize the scope to your project.",
  },
  {
    question: "Can you work on a contractor’s timeline?",
    answer:
      "That’s what we’re built for. Construction timelines are tight and subject to change, so we schedule around your build with project managers and general contractors — including evenings and weekends when needed.",
  },
  {
    question: "What types of commercial spaces do you clean?",
    answer:
      "Offices, commercial buildings, warehouses, retail stores, medical and professional units, condo common areas, Airbnb and short-term rental units, and mechanical or generator rooms. Our commercial cleaning services cover office and common area cleaning, kitchen and lunchroom cleaning, washrooms, floors and glass.",
  },
  {
    question: "Do you offer recurring office cleaning contracts?",
    answer:
      "Yes. We offer weekly, bi-weekly and monthly office cleaning and commercial building janitorial services. Recurring clients get priority scheduling and a consistent crew who knows their space.",
  },
  {
    question: "How much does office cleaning cost?",
    answer:
      "It depends on square footage, frequency and scope. We keep office cleaning affordable by quoting exactly what your space needs — no bundled extras. Send us the size of the office and how often you want it cleaned and we’ll give you a clear price, usually the same business day.",
  },
  {
    question: "Can you clean after hours or on weekends?",
    answer:
      "Yes. Many business owners prefer corporate office cleaning outside business hours so there’s no disruption to staff or customers. Tell us the window that works and we’ll build the schedule around it.",
  },
  {
    question: "Are you insured?",
    answer:
      "Yes. Red & White Cleaning Services LTD is a fully insured commercial cleaning company, and we can provide documentation on request for contractors or property managers who require proof of insurance before booking.",
  },
  {
    question: "Which areas do you serve?",
    answer:
      "We provide commercial cleaning services in KW (Kitchener, Waterloo, Cambridge), plus office cleaning and post construction cleaning in Guelph, Hamilton, London, Brantford and surrounding communities across Southern Ontario. When you search commercial cleaning companies near me or construction cleaners near me from any of these cities, we are the local crew. Not sure if we cover your site? Call 519-574-1552 and we’ll let you know.",
  },
  {
    question: "Do you provide commercial cleaning in London, Ontario?",
    answer:
      "Yes. Searching for after builders cleaning London Ontario builders trust, or commercial cleaners London Ontario businesses recommend? Our crews handle office cleaning, construction cleanup and after builders cleaning across London and can quote your project the same business day.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "Fill out the form at the top of this page or call/text 519-574-1552. Tell us the type of space, approximate square footage and the timeline, and we’ll typically respond the same business day.",
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
