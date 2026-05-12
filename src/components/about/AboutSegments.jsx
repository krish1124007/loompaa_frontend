import SectionHeader from '../ui/SectionHeader.jsx';
import Button from '../ui/Button.jsx';
import RevealOnScroll from '../ui/RevealOnScroll.jsx';

const SEGMENTS = [
  {
    label: 'A',
    title: 'The Frustrated Founder',
    body: "Has a product that sells, but can't figure out why the ads aren't scaling. Tired of agencies that report on impressions and call it progress.",
  },
  {
    label: 'B',
    title: 'The Scaling Brand',
    body: '₹2Cr–₹20Cr/month. Has a small in-house team but needs specialist execution capacity. Accountable to quarterly numbers. Wants delivery, not managed expectations.',
  },
  {
    label: 'C',
    title: 'The Funded Operator',
    body: 'Has raised capital and needs to deploy it efficiently. Understands CAC, LTV, and payback period. Wants institutional-grade reporting alongside high-speed execution.',
  },
];

export default function AboutSegments() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
      <div className="grid grid-cols-12 gap-8 md:gap-16 mb-16">
        <div className="col-span-12 md:col-span-7">
          <SectionHeader
            eyebrow="WHO WE WORK WITH"
            headline="We're not for everyone. We know exactly who we're for."
            emphasis="exactly who we're for."
            size="lg"
          />
        </div>
        <div className="col-span-12 md:col-span-5 md:pt-12">
          <RevealOnScroll delay={0.1}>
            <p className="text-ink-sec text-base md:text-lg leading-relaxed">
              Loompaa works best with D2C brands doing ₹5L–₹5Cr per month who have proven their product but haven't cracked profitable scale. If you're pre-product, we're probably not the right fit yet. If you're beyond ₹5Cr and need a full-scale operational partner, let's talk on the Full Factory plan.
            </p>
          </RevealOnScroll>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12">
        {SEGMENTS.map((seg, i) => (
          <RevealOnScroll key={seg.label} delay={i * 0.08}>
            <article className="h-full rounded-card border border-subtle bg-elevated p-7 md:p-8 flex flex-col gap-5">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-tangerine/15 text-tangerine font-mono text-lg font-medium">
                {seg.label}
              </span>
              <h3 className="text-xl md:text-2xl font-semibold text-ink">{seg.title}</h3>
              <p className="text-ink-sec text-base leading-relaxed">{seg.body}</p>
            </article>
          </RevealOnScroll>
        ))}
      </div>

      <div className="flex justify-center">
        <Button to="/contact" size="lg">Let's See If We Fit</Button>
      </div>
    </section>
  );
}
