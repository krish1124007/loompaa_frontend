import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Pill from '../ui/Pill.jsx';
import { Highlight } from '../ui/SectionHeader.jsx';

export default function AboutHero() {
  const containerRef = useRef(null);
  const pillRef      = useRef(null);
  const h1Ref        = useRef(null);
  const subRef       = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    tl.fromTo(pillRef.current, { y: 20, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.8 })
      .fromTo(h1Ref.current, 
        { y: 70, opacity: 0, skewY: 4, transformOrigin: 'left top' }, 
        { y: 0, opacity: 1, skewY: 0, duration: 1.2 }, 
        '-=0.5'
      )
      .fromTo(subRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6');

    /* Character reveal for subtext */
    gsap.fromTo('.char-reveal', 
      { opacity: 0.1 },
      { 
        opacity: 1, 
        stagger: 0.01, 
        duration: 0.5, 
        scrollTrigger: {
          trigger: subRef.current,
          start: 'top 80%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="theme-cream bg-base relative -mt-16 md:-mt-20 pt-16 md:pt-20 rounded-b-[3rem] md:rounded-b-[5rem] z-10 overflow-hidden"
    >
      {/* Decorative backdrop */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(var(--ink-primary) 1px, transparent 1px), linear-gradient(90deg, var(--ink-primary) 1px, transparent 1px)',
            backgroundSize: '120px 120px',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[600px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,107,44,0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-24 md:pb-32">
        <div className="max-w-4xl">
          <div ref={pillRef} style={{ opacity: 0 }}>
            <Pill variant="accent">THE OPERATOR PHILOSOPHY</Pill>
          </div>

          <h1
            ref={h1Ref}
            style={{ opacity: 0 }}
            className="mt-8 font-sans font-black text-[44px] md:text-[88px] text-ink leading-[1] tracking-[-0.04em]"
          >
            We're not an agency.<br />
            <span className="block mt-2">
              We're your <Highlight color="lemon">factory floor.</Highlight>
            </span>
          </h1>

          <p 
            ref={subRef}
            style={{ opacity: 0 }}
            className="mt-10 text-ink-sec text-xl md:text-2xl max-w-3xl leading-relaxed font-medium"
          >
            Loompaa was built by people who got tired of watching great products fail because of broken growth systems. We stopped advising. We started executing. We're the hands in the dirt, the code in the store, and the results on the dashboard.
          </p>
        </div>
      </div>
    </section>
  );
}
