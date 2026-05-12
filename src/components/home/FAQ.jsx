import SectionHeader from '../ui/SectionHeader.jsx';
import Accordion from '../ui/Accordion.jsx';
import RevealOnScroll from '../ui/RevealOnScroll.jsx';

const ITEMS = [
  {
    q: 'How fast can you actually go live?',
    a: "First campaign live in 48 hours from contract. We don't do 6-week onboardings. The first week is spent inside your data, not in kickoff calls.",
  },
  {
    q: 'Do you charge a retainer?',
    a: "We have monthly plans, but no lock-ins. Cancel anytime with 30 days' notice. Our Full Factory plan includes a performance guarantee — miss the targets, we work the next 30 days free.",
  },
  {
    q: 'What size brands do you work with?',
    a: "D2C brands doing ₹5L–₹5Cr per month with a proven product. If you're pre-product, we're probably not the right fit yet.",
  },
  {
    q: 'Will you work on Amazon and Flipkart, not just D2C?',
    a: 'Yes. Marketplace management is a full service — Amazon, Flipkart, Meesho, Blinkit, Zepto. We manage listings, ads, and inventory the same way we manage performance marketing.',
  },
  {
    q: 'Who actually does the work?',
    a: 'Loompaas. Our in-house team. No outsourcing to freelancers, no offshore hand-offs. Every campaign, creative, and report is built by the people on your weekly call.',
  },
  {
    q: 'Where are you based?',
    a: 'Surat and Ahmedabad. We work with brands across India and select international markets (US, UAE, UK).',
  },
];

export default function FAQ() {
  return (
    <section className="theme-cream bg-base border-y border-subtle">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-8 md:gap-16">
          <div className="col-span-12 lg:col-span-5">
            <RevealOnScroll>
              <SectionHeader
                eyebrow="QUESTIONS"
                headline="Have any questions?"
                emphasis="questions?"
                emphasisColor="lemon"
                subhead="Here's what founders ask before they sign."
              />
            </RevealOnScroll>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <RevealOnScroll delay={0.1}>
              <Accordion items={ITEMS} />
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
