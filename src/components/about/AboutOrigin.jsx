import SectionHeader from '../ui/SectionHeader.jsx';
import RevealOnScroll from '../ui/RevealOnScroll.jsx';

const PARAGRAPHS = [
  "Most D2C brands fail at the same place: they have a product worth buying and a growth system that can't sell it. They hire agencies that show up with decks. They get strategies they can't execute. They get reports full of metrics that don't move revenue.",
  "We've sat in those rooms. We've read those decks. We've watched great founders spend ₹50K a month on a retainer and get nothing they could call a result.",
  "So we built something different.",
  "Loompaa is the e-commerce factory floor. We don't advise from a distance. We plug into your operation — into your ad accounts, your store, your funnels, your data — and we build the systems that actually move revenue.",
  "The name comes from the Oompa Loompaas — the workers who ran Wonka's factory. They were the ones who made the magic real. They understood the raw material — cocoa — at its roots. That expertise is what Wonka couldn't function without.",
  "That's what we bring. Not a strategy. Not a framework. Deep, native expertise in e-commerce execution — and the accountability to be measured on results, not deliverables.",
];

export default function AboutOrigin() {
  return (
    <section className="bg-elevated/40 border-y border-subtle">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-8 md:gap-16">
          <div className="col-span-12 md:col-span-5">
            <RevealOnScroll>
              <SectionHeader
                eyebrow="THE ORIGIN"
                headline="Why Loompaa exists."
                emphasis="exists."
              />
            </RevealOnScroll>
          </div>
          <div className="col-span-12 md:col-span-7 space-y-6">
            {PARAGRAPHS.map((p, i) => (
              <RevealOnScroll key={i} delay={i * 0.05}>
                <p className="text-ink-sec text-base md:text-lg leading-relaxed">{p}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
