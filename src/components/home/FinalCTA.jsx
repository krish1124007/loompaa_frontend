import { useRef, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../ui/Button.jsx';

gsap.registerPlugin(ScrollTrigger);

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

export default function FinalCTA() {
  const sectionRef  = useRef(null);
  const headlineRef = useRef(null);
  const btnRef      = useRef(null);
  const orbRef      = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;

    /* ── Animated spotlight orb follows mouse ── */
    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      gsap.to(orbRef.current, {
        left: x,
        top: y,
        duration: 1.2,
        ease: 'power3.out',
      });
    };
    section.addEventListener('mousemove', onMove);

    /* ── Character Reveal Animation ── */
    gsap.to('.cta-body .char', {
      opacity: 1,
      duration: 0.04,
      stagger: 0.015, // Slightly faster
      ease: 'none',
      scrollTrigger: {
        trigger: '.cta-body',
        start: 'top 85%',
      }
    });

    /* ── Headline entrance ── */
    gsap.fromTo(
      headlineRef.current,
      { y: 60, opacity: 0, skewY: 3 },
      {
        y: 0,
        opacity: 1,
        skewY: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 82%',
        },
      },
    );

    /* ── Magnetic button ── */
    const btn = btnRef.current;
    if (btn) {
      const onBtnMove = (e) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top  + r.height / 2);
        gsap.to(btn, {
          x: dx * 0.28,
          y: dy * 0.28,
          duration: 0.4,
          ease: 'power2.out',
        });
      };
      const onBtnLeave = () =>
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });

      btn.addEventListener('mousemove', onBtnMove);
      btn.addEventListener('mouseleave', onBtnLeave);
    }

    return () => section.removeEventListener('mousemove', onMove);
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--ink-primary) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div
        ref={orbRef}
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,44,0.12) 0%, rgba(255,217,61,0.06) 40%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(8px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-44 text-center">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 bg-tangerine/10 text-tangerine border border-tangerine/25 rounded-full px-4 py-1.5 font-mono text-[11px] font-bold tracking-[0.18em] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-tangerine inline-block animate-pulse" />
            READY TO BUILD?
          </span>
        </div>

        <div ref={headlineRef} style={{ opacity: 0 }}>
          <h2 className="font-black text-display-xl text-ink leading-[0.88] tracking-[-0.04em] max-w-5xl mx-auto">
            Your factory floor is{' '}
            <span className="relative inline-block">
              <span aria-hidden="true" className="absolute inset-x-0 inset-y-2 -rotate-1 rounded-[10px] bg-lemon" />
              <span className="relative" style={{ color: '#0A0A0A' }}>ready to run.</span>
            </span>
          </h2>
        </div>

        <div className="mt-8">
          <p className="text-ink-sec text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            <SplitText 
              text="Pick a plan. Be live in 48 hours. No lock-in. No onboarding deck. No kickoff meeting that never ends." 
              className="cta-body" 
            />
          </p>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-4">
          <div ref={btnRef} style={{ display: 'inline-block' }}>
            <Button to="/contact" size="lg">Start Building</Button>
          </div>
          <Button href="mailto:hello@loompaa.in" variant="secondary" size="lg">
            hello@loompaa.in
          </Button>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-3">
          {['No retainer', '48h go-live', 'Full transparency', 'Cancel anytime'].map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 rounded-full border border-subtle px-4 py-1.5 text-xs font-mono font-medium text-ink-tri bg-elevated/50"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-tangerine/60" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
