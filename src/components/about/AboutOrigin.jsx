import SectionHeader from '../ui/SectionHeader.jsx';
import RevealOnScroll from '../ui/RevealOnScroll.jsx';

const PARAGRAPHS = [
  "Most D2C brands fail at the same place: they have a product worth buying and a growth system that can't sell it. They hire agencies that show up with decks. They get strategies they can't execute. They get reports full of metrics that don't move revenue.",
  "We've sat in those rooms. We've read those decks. We've watched great founders spend ₹50K a month on a retainer and get nothing they could call a result.",
  "So we built something different.",
  "Loompaa is the e-commerce factory floor. We don't advise from a distance. We plug into your operation — into your ad accounts, your store, your funnels, your data — and we build the systems that actually move revenue.",
  "The name comes from the Oompa Loompaas — the workers who ran Wonka's factory. They were the ones who made the magic real. They understood the raw material at its roots. That expertise is what Wonka couldn't function without.",
  "That's what we bring. Not a strategy. Not a framework. Deep, native expertise in e-commerce execution — and the accountability to be measured on results, not deliverables.",
];

export default function AboutOrigin() {
  return (
    <section className="bg-[#0A0A0A] text-white py-24 md:py-40 rounded-[60px] md:rounded-[100px] overflow-hidden relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-12 gap-8 md:gap-20">
          <div className="col-span-12 lg:col-span-5">
            <RevealOnScroll>
              <h2 className="font-sans font-black text-[42px] md:text-[64px] leading-[1.1] tracking-[-0.04em] mb-8">
                Why Loompaa <br />
                <span className="text-white/40">exists.</span>
              </h2>
            </RevealOnScroll>
          </div>
          <div className="col-span-12 lg:col-span-7 space-y-8">
            {PARAGRAPHS.map((p, i) => (
              <RevealOnScroll key={i} delay={i * 0.05}>
                <p className={`text-lg md:text-2xl leading-relaxed ${i === 2 ? 'font-black text-tangerine' : 'text-white/70 font-medium'}`}>
                  {p}
                </p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
