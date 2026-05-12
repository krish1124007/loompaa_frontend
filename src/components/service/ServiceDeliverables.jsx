import SectionHeader from '../ui/SectionHeader.jsx';
import RevealOnScroll from '../ui/RevealOnScroll.jsx';

export default function ServiceDeliverables({ service }) {
  const items = service.deliverables || [];
  if (!items.length) return null;

  return (
    <section className="bg-elevated/40 border-y border-subtle">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-8 md:gap-16 mb-12">
          <div className="col-span-12 md:col-span-5">
            <SectionHeader
              eyebrow={service.whatWeLabel || 'WHAT WE BUILD'}
              headline={`Five things we ship for ${service.title.toLowerCase()}.`}
              emphasis="ship"
            />
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          {items.map((d, i) => (
            <RevealOnScroll key={d.number || i} delay={i * 0.05}>
              <article className="grid grid-cols-12 gap-6 md:gap-12 items-start py-6 md:py-8 border-t border-subtle">
                <div className="col-span-2 md:col-span-1">
                  <span className="font-mono text-2xl md:text-3xl text-tangerine leading-none">
                    {d.number || String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="col-span-10 md:col-span-4">
                  <h3 className="text-xl md:text-2xl font-semibold text-ink">{d.title}</h3>
                </div>
                <div className="col-span-12 md:col-span-7">
                  <p className="text-ink-sec text-base md:text-lg leading-relaxed">{d.body}</p>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
