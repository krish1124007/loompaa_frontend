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
    body: "You see everything we see. Live dashboards. Honest weekly reports that include what's not working — not just the wins. You should never have to ask for an update.",
  },
  {
    number: '03',
    title: 'Plug-In Mentality',
    body: 'We integrate into your operation like an internal team — not a vendor you brief once a quarter. We know your products, your customers, and your numbers.',
  },
  {
    number: '04',
    title: 'Relentless Iteration',
    body: 'Nothing is set-and-forget. We test every week. We learn every week. We improve every week. The compounding effect of weekly iteration is what scaling looks like.',
  },
  {
    number: '05',
    title: 'Irreverent Confidence',
    body: "We say what we mean. We back it with numbers. We tell you when something won't work — before you spend money on it. You don't need a yes-man. You need Loompaa.",
  },
];

export default function AboutValues() {
  return (
    <section className="bg-[#0A0A0A] text-white py-24 md:py-40 rounded-[60px] md:rounded-[100px] overflow-hidden relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
          <RevealOnScroll>
            <h2 className="font-sans font-black text-[42px] md:text-[72px] leading-[1.05] tracking-[-0.04em] mb-6">
              Five things we'll <br />
              <span className="text-white/40">never negotiate on.</span>
            </h2>
          </RevealOnScroll>
        </div>

        <div className="space-y-1">
          {VALUES.map((v, i) => (
            <RevealOnScroll key={v.number} delay={i * 0.05}>
              <div className="grid grid-cols-12 gap-6 md:gap-12 py-10 md:py-16 border-t border-white/10 items-start group hover:bg-white/[0.02] transition-colors duration-500 px-4 md:px-8 -mx-4 md:-mx-8 rounded-2xl">
                <div className="col-span-12 md:col-span-2">
                  <span className="font-mono text-4xl md:text-5xl text-tangerine leading-none font-bold opacity-50 group-hover:opacity-100 transition-opacity">
                    {v.number}
                  </span>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <h3 className="text-2xl md:text-4xl font-black text-white leading-tight">{v.title}</h3>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <p className="text-white/60 text-lg md:text-xl leading-relaxed font-medium">{v.body}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
