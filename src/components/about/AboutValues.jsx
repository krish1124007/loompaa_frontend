import SectionHeader from '../ui/SectionHeader.jsx';
import RevealOnScroll from '../ui/RevealOnScroll.jsx';

const VALUES = [
  {
    number: '01',
    title: 'Results First',
    body: 'Every decision is judged against one question: does this move the number? Not "does this look good." Not "is this on trend." Does it convert? Does it drive revenue? That\'s the brief.',
  },
  {
    number: '02',
    title: 'Radical Transparency',
    body: "You see everything we see. Live dashboards. Honest weekly reports that include what's not working — not just the wins. You should never have to ask for an update. You'll always have one.",
  },
  {
    number: '03',
    title: 'Plug-In Mentality',
    body: 'We integrate into your operation like an internal team — not a vendor you brief once a quarter. We know your products, your customers, and your numbers. We move at your speed.',
  },
  {
    number: '04',
    title: 'Relentless Iteration',
    body: 'Nothing is set-and-forget. We test every week. We learn every week. We improve every week. The compounding effect of weekly iteration over 12 months is what a 3× business looks like.',
  },
  {
    number: '05',
    title: 'Irreverent Confidence',
    body: "We are not an agency that hedge-words everything. We say what we mean. We back it with numbers. We tell you when something won't work — before you spend money on it. You don't need a yes-man. You need Loompaa.",
  },
];

export default function AboutValues() {
  return (
    <section className="bg-elevated/40 border-y border-subtle">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionHeader
            align="center"
            eyebrow="OUR VALUES"
            headline="Five things we'll never negotiate on."
            emphasis="never negotiate on."
          />
        </div>

        <div className="space-y-1">
          {VALUES.map((v, i) => (
            <RevealOnScroll key={v.number} delay={i * 0.05}>
              <div className="grid grid-cols-12 gap-6 md:gap-12 py-8 md:py-10 border-t border-subtle items-start">
                <div className="col-span-12 md:col-span-2">
                  <span className="font-mono text-display-md text-tangerine leading-none">
                    {v.number}
                  </span>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <h3 className="text-xl md:text-2xl font-semibold text-ink">{v.title}</h3>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <p className="text-ink-sec text-base md:text-lg leading-relaxed">{v.body}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
