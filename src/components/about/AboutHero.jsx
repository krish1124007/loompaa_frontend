import { useRef, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Pill from '../ui/Pill.jsx';

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

export default function AboutHero() {
  const containerRef = useRef(null);
  const h1Ref        = useRef(null);
  const pillRef      = useRef(null);
  const pRef         = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo(pillRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
      .fromTo(h1Ref.current, 
        { y: 60, opacity: 0, skewY: 4 }, 
        { y: 0, opacity: 1, skewY: 0, duration: 1.1 }, 
        '-=0.5'
      );

    /* Character reveal for paragraph */
    gsap.to('.about-p .char', {
      opacity: 1,
      duration: 0.03,
      stagger: 0.012,
      ease: 'none',
      delay: 0.8,
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(var(--ink-primary) 1px, transparent 1px), linear-gradient(90deg, var(--ink-primary) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-24 md:pb-32">
        <div ref={pillRef} style={{ opacity: 0 }}>
          <Pill variant="default">ABOUT — Who We Are</Pill>
        </div>

        <h1
          ref={h1Ref}
          style={{ opacity: 0 }}
          className="mt-8 font-sans font-black text-display-xl text-ink leading-[0.95] tracking-[-0.03em] max-w-5xl"
        >
          We're not an agency.<br />
          <span className="text-tangerine">
            We're your factory floor.
          </span>
        </h1>

        <p ref={pRef} className="mt-8 text-ink-sec text-lg md:text-xl max-w-prose leading-relaxed font-medium">
          <SplitText 
            text="Loompaa was built by people who got tired of watching great products fail because of broken growth systems. We stopped advising. We started executing." 
            className="about-p" 
          />
        </p>
      </div>
    </section>
  );
}
