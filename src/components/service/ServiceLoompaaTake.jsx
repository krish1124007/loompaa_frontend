import SectionHeader from '../ui/SectionHeader.jsx';
import RevealOnScroll from '../ui/RevealOnScroll.jsx';

export default function ServiceLoompaaTake({ service }) {
  const take = service.loompaaTake;
  if (!take?.headline) return null;

  const paragraphs = String(take.body || '')
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
      <div className="grid grid-cols-12 gap-8 md:gap-16">
        <div className="col-span-12 md:col-span-5">
          <RevealOnScroll>
            <SectionHeader
              eyebrow="THE LOOMPAA TAKE"
              headline={take.headline}
              emphasis={take.headlineEmphasis}
            />
          </RevealOnScroll>
        </div>
        <div className="col-span-12 md:col-span-7 space-y-6">
          {paragraphs.map((p, i) => (
            <RevealOnScroll key={i} delay={i * 0.06}>
              <p className="text-ink-sec text-base md:text-lg leading-relaxed">{p}</p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
