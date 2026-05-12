import Button from '../ui/Button.jsx';
import RevealOnScroll from '../ui/RevealOnScroll.jsx';

export default function ServiceCTA({ service }) {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
      <div className="text-center max-w-3xl mx-auto">
        <RevealOnScroll>
          <h2 className="font-sans font-bold text-display-md text-ink leading-[1] tracking-[-0.02em]">
            Ready to scale{' '}
            <em className="font-display not-italic italic text-tangerine">
              {service.title.toLowerCase()}
            </em>
            ?
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <p className="mt-6 text-ink-sec text-lg leading-relaxed">
            Tell us your numbers. We'll come back with observations and a 90-day plan — not a sales pitch.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button to={`/contact?service=${service.slug}`} size="lg">
              Start Building
            </Button>
            <Button href="mailto:hello@loompaa.in" variant="secondary" size="lg">
              Book a Strategy Session
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
