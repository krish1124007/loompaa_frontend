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
    body: '₹2Cr–₹20Cr/month. Has a small in-house team but needs specialist execution capacity. Wants delivery, not managed expectations.',
  },
  {
    label: 'C',
    title: 'The Funded Operator',
    body: 'Has raised capital and needs to deploy it efficiently. Understands CAC, LTV, and payback period. Wants institutional-grade reporting.',
  },
];

export default function AboutSegments() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32 overflow-hidden">
      <div className="grid grid-cols-12 gap-8 md:gap-16 mb-20">
        <div className="col-span-12 lg:col-span-7">
          <RevealOnScroll>
            <h2 className="font-sans font-black text-[42px] md:text-[72px] leading-[1.05] tracking-[-0.04em] text-[#0A0A0A]">
              We're not for everyone. <br />
              <span className="text-[#0A0A0A]/30">We know exactly who we're for.</span>
            </h2>
          </RevealOnScroll>
        </div>
        <div className="col-span-12 lg:col-span-5 lg:pt-12">
          <RevealOnScroll delay={0.1}>
            <p className="text-ink-sec text-lg md:text-xl leading-relaxed font-medium">
              Loompaa works best with D2C brands doing ₹5L–₹5Cr per month who have proven their product but haven't cracked profitable scale.
            </p>
          </RevealOnScroll>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
        {SEGMENTS.map((seg, i) => (
          <RevealOnScroll key={seg.label} delay={i * 0.1}>
            <article className="group h-full rounded-[32px] border border-black/5 bg-white p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col gap-6">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-tangerine/10 text-tangerine font-mono text-xl font-bold">
                {seg.label}
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-ink leading-tight">{seg.title}</h3>
              <p className="text-ink-sec text-lg leading-relaxed font-medium">{seg.body}</p>
            </article>
          </RevealOnScroll>
        ))}
      </div>

      <div className="flex justify-center">
        <Button to="/contact" size="lg" className="px-12">Let's See If We Fit</Button>
      </div>
    </section>
  );
}
