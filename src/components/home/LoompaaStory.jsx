import SectionHeader from '../ui/SectionHeader.jsx';
import Button from '../ui/Button.jsx';
import RevealOnScroll from '../ui/RevealOnScroll.jsx';

export default function LoompaaStory() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
      <div className="max-w-4xl">
        <SectionHeader
          eyebrow="THE LOOMPAA STORY"
          headline="Behind every great brand are the ones who actually do the work."
          emphasis="actually do the work."
          emphasisColor="lemon"
          size="xl"
        />
      </div>

      <div className="mt-16 grid grid-cols-12 gap-8 md:gap-12">
        <div className="col-span-12 md:col-span-7 space-y-6">
          <RevealOnScroll>
            <p className="text-ink-sec text-base md:text-lg leading-relaxed">
              Remember the Oompa Loompaas? They ran Wonka's factory. Every bar of chocolate, every golden ticket, every miracle of production — they made it happen. No credit. All output. Nothing would exist without them.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="text-ink-sec text-base md:text-lg leading-relaxed">
              That's Loompaa. We're your e-commerce factory floor. We're not here for the photo ops. We're here to build the ad systems, run the store, optimise the funnels, and hit the numbers — while you take the bow.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="text-ink-sec text-base md:text-lg leading-relaxed">
              The Oompa Loompaas weren't random workers. They were specialists, brought to Wonka's factory because they understood cocoa at its roots. That's what we bring to your brand: native, deep expertise in e-commerce — the pixels, the funnels, the ad systems that actually convert.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.3}>
            <div className="pt-4">
              <Button to="/about" variant="secondary">Read Our Full Story</Button>
            </div>
          </RevealOnScroll>
        </div>

        <div className="col-span-12 md:col-span-5">
          <RevealOnScroll delay={0.15}>
            <figure className="relative pl-6 md:pl-8 border-l-2 border-tangerine py-4">
              <blockquote className="font-display italic text-2xl md:text-3xl lg:text-4xl text-ink leading-snug">
                "The real magic isn't in the idea. It's in the execution."
              </blockquote>
              <figcaption className="mt-6 font-mono text-eyebrow uppercase tracking-[0.18em] text-ink-tri">
                — The Loompaa Operating System
              </figcaption>
            </figure>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
