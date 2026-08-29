import { Plus } from "lucide-react";
import styles from "./deep-cleaning.module.css";

export const FAQS = [
  {
    question: "What's the difference between a regular clean and a deep clean?",
    answer:
      "A regular clean covers surface-level tidying \u2014 floors, counters, and bathrooms. Professional deep cleaning services go further: baseboards, cabinet fronts and interiors, appliance detailing, grout, and the buildup regular cleaning doesn't reach.",
  },
  {
    question: "How much does a one-off deep clean cost?",
    answer:
      "Our one off deep clean price depends on the size of the home, its condition, and which areas you'd like covered. Fill out the quote form or call us and we'll give you an honest, no-obligation price \u2014 usually the same business day.",
  },
  {
    question: "Do you offer move in / move out and end of tenancy cleaning?",
    answer:
      "Yes. Move out cleaning is one of our most-requested services: apartment move out cleaning, tenant move out cleaning, residential move out cleaning and end of tenancy cleaning for landlords and property managers. We also offer a move in cleaning service so your new place is spotless before the boxes arrive. Searching for move out cleaners near me? We're one call away.",
  },
  {
    question: "Which areas do you serve?",
    answer:
      "We provide deep cleaning in Kitchener, Waterloo, Cambridge, Guelph, Hamilton, London and Brantford, plus surrounding communities across Southern Ontario. If you're searching for deep cleaning near me in any of these cities, we can help.",
  },
  {
    question: "How soon can you come? Do you take same-day bookings?",
    answer:
      "Often, yes. We keep room in the schedule for fast clean up requests and same-day or next-day bookings when availability allows. Call us and we'll tell you the earliest slot right away.",
  },
  {
    question: "How long does a deep cleaning take?",
    answer:
      "Most homes take between 3 and 6 hours depending on size and condition. We'll give you a time estimate along with your free quote.",
  },
  {
    question: "Will I get the same cleaning crew each time?",
    answer:
      "Wherever possible, yes. We assign a consistent cleaning crew to recurring clients so the same trained deep cleaning professionals learn your home and your preferences.",
  },
  {
    question: "Do you clean Airbnbs and after events?",
    answer:
      "Absolutely. We offer Airbnb deep cleans and turnover service for short-term rentals, and after event cleaning for parties, corporate functions and post-renovation clean-ups.",
  },
  {
    question: "Do I need to be home during the cleaning?",
    answer:
      "No. Many clients provide access instructions and go about their day. Our team is licensed, insured, and vetted for in-home work.",
  },
  {
    question: "Do you bring your own supplies and equipment?",
    answer:
      "Yes, our crews bring all cleaning supplies and equipment. Eco-conscious, family- and pet-safe products are available on request at no extra cost.",
  },
  {
    question: "What if I'm not satisfied with the clean?",
    answer:
      "We stand behind our work. If something was missed, let us know within 24 hours and we'll come back to make it right at no extra charge.",
  },
];

export function FAQ() {
  return (
    <section className={styles.faq} aria-label="Frequently asked questions">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Common Questions</p>
          <h2 className={styles.sectionTitle}>Deep Cleaning Questions, Answered</h2>
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
