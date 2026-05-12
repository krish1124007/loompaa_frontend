import SectionHeader from '../ui/SectionHeader.jsx';
import RevealOnScroll from '../ui/RevealOnScroll.jsx';

const ITEMS = [
  {
    anti: 'Not Consultants',
    pro: 'We Are Operators',
    body: "We don't tell you what to do. We do it. Consultants send strategy docs. Loompaas ship campaigns, build funnels, and report on revenue — every week, without being chased.",
  },
  {
    anti: 'Not Retainer-Hungry',
    pro: 'We Are Accountable',
    body: 'No 3-month lock-ins. No "we need more time to see results." Our Full Factory plan includes a performance guarantee — miss the targets, we work the next 30 days free.',
  },
  {
    anti: 'Not General',
    pro: 'We Are Specialists',
    body: "We work only in e-commerce. D2C brands, marketplace sellers, founder-led businesses. We've built the expertise in one lane — and we're better for it.",
  },
];

export default function AboutDifferent() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
      <div className="max-w-3xl">
        <SectionHeader
          eyebrow="HOW WE'RE DIFFERENT"
          headline="We said the industry needed to change. So we changed it."
          emphasis="So we changed it."
          size="lg"
        />
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {ITEMS.map((item, i) => (
          <RevealOnScroll key={item.pro} delay={i * 0.08}>
            <article className="h-full rounded-card border border-subtle bg-elevated p-7 md:p-8 flex flex-col gap-5">
              <p className="font-mono text-eyebrow uppercase tracking-[0.18em] text-ink-tri line-through decoration-ink-tri/40">
                {item.anti}
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-ink leading-tight">
                {item.pro}
              </h3>
              <p className="text-ink-sec text-base leading-relaxed">{item.body}</p>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
