import SectionHeader from '../ui/SectionHeader.jsx';
import Button from '../ui/Button.jsx';
import RevealOnScroll from '../ui/RevealOnScroll.jsx';

export default function LoompaaStory() {
  return (
    <section className="bg-[#0A0A0A] text-white py-24 md:py-40 rounded-[60px] md:rounded-[100px] overflow-hidden relative shadow-2xl">
      {/* Decorative background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-br from-[#FF6B2C]/10 to-transparent blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="max-w-4xl">
          <SectionHeader
            eyebrow="THE LOOMPAA STORY"
            headline="Behind every great brand are the ones who actually do the work."
            emphasis="actually do the work."
            emphasisColor="lemon"
            size="xl"
            light={true}
          />
        </div>

        <div className="mt-16 grid grid-cols-12 gap-8 md:gap-20 relative z-10">
          <div className="col-span-12 lg:col-span-7 space-y-8">
            <RevealOnScroll>
              <p className="text-white/60 text-lg md:text-xl leading-relaxed">
                Remember the Oompa Loompaas? They ran Wonka's factory. Every bar of chocolate, every golden ticket, every miracle of production — they made it happen. No credit. All output. Nothing would exist without them.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <p className="text-white/60 text-lg md:text-xl leading-relaxed">
                That's Loompaa. We're your e-commerce factory floor. We're not here for the photo ops. We're here to build the ad systems, run the store, optimise the funnels, and hit the numbers — while you take the bow.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="text-white/60 text-lg md:text-xl leading-relaxed">
                The Oompa Loompaas weren't random workers. They were specialists, brought to Wonka's factory because they understood cocoa at its roots. That's what we bring to your brand: native, deep expertise in e-commerce — the pixels, the funnels, the ad systems that actually convert.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.3}>
              <div className="pt-6">
                <Button to="/about" variant="inverse" size="lg" className="rounded-full !px-10">Read Our Full Story</Button>
              </div>
            </RevealOnScroll>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <RevealOnScroll delay={0.15}>
              <figure className="relative pl-8 md:pl-10 border-l-4 border-[#FF6B2C] py-6">
                <blockquote className="font-sans font-black italic text-3xl md:text-4xl lg:text-5xl text-white leading-tight tracking-tight">
                  "The real magic isn't in the idea. It's in the execution."
                </blockquote>
                <figcaption className="mt-8 font-mono text-[13px] font-bold uppercase tracking-[0.2em] text-[#FF6B2C]">
                  — The Loompaa Operating System
                </figcaption>
              </figure>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
