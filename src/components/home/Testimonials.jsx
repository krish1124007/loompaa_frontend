import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';
import Button from '../ui/Button.jsx';
import RevealOnScroll from '../ui/RevealOnScroll.jsx';
import IMG from '../../assets/images.js';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const TESTIMONIALS = [
  {
    quote:
      "Cut our CAC by 40% in 60 days. They didn't even ask for a kickoff meeting — they showed up to the first call with the campaign brief already drafted.",
    author: 'Sophie Moore',
    role: 'Founder, D2C Skincare',
    city: 'Ahmedabad',
    avatar: IMG.sophieMoore,
    quoteIcon: IMG.yellowQuote,
  },
  {
    quote:
      'Finally, an agency that reports on revenue and not impressions. Every Friday I get a 4-line email with the number that matters and what changed.',
    author: 'John Carter',
    role: 'CMO, Apparel Brand',
    city: 'Mumbai',
    avatar: IMG.johnCarter,
    quoteIcon: IMG.blueQuote,
  },
  {
    quote:
      "They had observations on day one. We've been working together for 14 months and still haven't had a single 'we need more time to see results' conversation.",
    author: 'Mahesh Patel',
    role: 'Founder, Home-goods',
    city: 'Surat',
    avatar: IMG.johnCarterAlt,
    quoteIcon: IMG.orangeQuote,
  },
];

/* ── Reusable Character Split Component ── */
function SplitText({ text, className }) {
  const chars = useMemo(() => text.split(''), [text]);
  return (
    <span className={className}>
      {chars.map((char, i) => (
        <span key={i} className="char inline-block" style={{ opacity: 0.15 }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];

  useGSAP(() => {
    /* Reveal animation for the quote characters */
    gsap.to('.quote-text .char', {
      opacity: 1,
      duration: 0.04,
      stagger: 0.015,
      ease: 'none',
    });
  }, [active]);

  return (
    <section className="theme-cream bg-base">
     <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <SectionHeader
          align="center"
          eyebrow="WHAT OPERATORS SAY"
          headline="Take a look at what our clients say."
          emphasis="clients"
          emphasisColor="lemon"
        />
        <RevealOnScroll delay={0.1}>
          <div className="mt-8 flex justify-center">
            <Button to="/contact" size="md">
              Get in Touch
            </Button>
          </div>
        </RevealOnScroll>
      </div>

      <RevealOnScroll>
        <article
          key={t.author}
          className="relative max-w-3xl mx-auto rounded-card border border-subtle bg-elevated p-8 md:p-12 lg:p-16 text-center"
        >
          <img
            src={t.quoteIcon}
            alt=""
            aria-hidden="true"
            className="absolute top-8 left-8 h-8 w-8 md:h-10 md:w-10 opacity-30"
          />
          <img
            src={t.quoteIcon}
            alt=""
            aria-hidden="true"
            className="absolute bottom-8 right-8 h-8 w-8 md:h-10 md:w-10 rotate-180 opacity-30"
          />

          <p className="font-bold text-2xl md:text-3xl lg:text-4xl text-ink leading-[1.3] tracking-tight max-w-2xl mx-auto">
            <SplitText text={`"${t.quote}"`} className="quote-text" />
          </p>

          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-tangerine p-0.5 bg-white">
              <img src={t.avatar} alt={t.author} className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <div className="text-lg font-black text-ink tracking-tight uppercase">{t.author}</div>
              <div className="text-xs font-bold text-tangerine tracking-[0.1em] uppercase mt-1">
                {t.role} <span className="text-ink-tri mx-1">/</span> {t.city}
              </div>
            </div>
          </div>
        </article>
      </RevealOnScroll>

      {/* Carousel controls */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
          className="h-12 w-12 rounded-full border border-strong text-ink-sec hover:border-tangerine hover:text-tangerine flex items-center justify-center transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === active ? 'w-8 bg-tangerine' : 'w-2 bg-subtle hover:bg-strong'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setActive((a) => (a + 1) % TESTIMONIALS.length)}
          className="h-12 w-12 rounded-full border border-strong text-ink-sec hover:border-tangerine hover:text-tangerine flex items-center justify-center transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
     </div>
    </section>
  );
}
