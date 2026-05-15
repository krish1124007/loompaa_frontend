import SectionHeader from '../ui/SectionHeader.jsx';
import RevealOnScroll from '../ui/RevealOnScroll.jsx';

const ITEMS = [
  {
    anti: 'Not Consultants',
    pro: 'We Are Operators',
    body: "We don't tell you what to do. We do it. Consultants send strategy docs. Loompaas ship campaigns, build funnels, and report on revenue — every week.",
  },
  {
    anti: 'Not Retainer-Hungry',
    pro: 'We Are Accountable',
    body: 'No 3-month lock-ins. No excuses. Our Full Factory plan includes a performance guarantee — miss the targets, we work the next 30 days free.',
  },
  {
    anti: 'Not General',
    pro: 'We Are Specialists',
    body: "We work only in e-commerce. D2C brands, marketplace sellers, founder-led businesses. We've built deep expertise in one lane.",
  },
];

export default function AboutDifferent() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
      <div className="grid grid-cols-12 gap-8 md:gap-16 mb-20">
        <div className="col-span-12 lg:col-span-8">
          <RevealOnScroll>
            <h2 className="font-sans font-black text-[42px] md:text-[72px] leading-[1.05] tracking-[-0.04em] text-[#0A0A0A]">
              We said the industry needed to change. <span className="text-[#0A0A0A]/30">So we changed it.</span>
            </h2>
          </RevealOnScroll>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {ITEMS.map((item, i) => (
          <RevealOnScroll key={item.pro} delay={i * 0.1}>
            <article className="group h-full rounded-[32px] border border-black/5 bg-white p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col gap-8">
              <div className="space-y-4">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink-tri line-through decoration-tangerine/50 decoration-2">
                  {item.anti}
                </p>
                <h3 className="text-3xl md:text-4xl font-black text-ink leading-tight">
                  {item.pro}
                </h3>
              </div>
              <p className="text-ink-sec text-lg leading-relaxed font-medium">
                {item.body}
              </p>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
