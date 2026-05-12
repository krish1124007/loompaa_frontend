import { useRef, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealOnScroll from '../ui/RevealOnScroll.jsx';
import IMG from '../../assets/images.js';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    value: 3.8,
    display: '3.8',
    suffix: '×',
    label: 'Average ROAS by Month 3',
  },
  {
    value: 12,
    display: '12',
    prefix: '₹',
    suffix: 'Cr+',
    label: 'Revenue Generated',
  },
  {
    value: 48,
    display: '48',
    suffix: 'hr',
    label: 'Onboard to Live Campaign',
  },
  {
    value: 97,
    display: '97',
    suffix: '%',
    label: 'Client Retention',
  },
];

/* ── Split text component for character animation ── */
function SplitText({ text, className }) {
  const chars = useMemo(() => text.split(''), [text]);
  return (
    <span className={className}>
      {chars.map((char, i) => (
        <span key={i} className="char inline-block" style={{ opacity: 0.1 }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

function StatCard({ stat, index }) {
  const cardRef = useRef(null);
  const numRef  = useRef(null);

  useGSAP(() => {
    const card = cardRef.current;
    const num  = numRef.current;
    if (!card || !num) return;

    /* Entrance: scale + fade */
    gsap.fromTo(
      card,
      { y: 60, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: index * 0.12,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
        },
      },
    );

    /* Animated count-up */
    const obj = { val: 0 };
    gsap.to(obj, {
      val: stat.value,
      duration: 1.8,
      ease: 'power2.out',
      delay: index * 0.12 + 0.3,
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
      },
      onUpdate() {
        const formatted = Number.isInteger(stat.value)
          ? Math.round(obj.val)
          : obj.val.toFixed(1);
        num.textContent =
          (stat.prefix || '') + formatted + (stat.suffix || '');
      },
    });

    /* Hover: clean lift shadow */
    const enter = () =>
      gsap.to(card, {
        boxShadow: '0 20px 48px rgba(0,0,0,0.10)',
        y: -4,
        duration: 0.35,
        ease: 'power2.out',
      });
    const leave = () =>
      gsap.to(card, {
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        y: 0,
        duration: 0.4,
        ease: 'power2.inOut',
      });

    card.addEventListener('mouseenter', enter);
    card.addEventListener('mouseleave', leave);
    return () => {
      card.removeEventListener('mouseenter', enter);
      card.removeEventListener('mouseleave', leave);
    };
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl p-7 md:p-9 flex flex-col gap-3 cursor-default"
      style={{
        background: '#FFFFFF',
        border: '1.5px solid rgba(10,10,10,0.08)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      }}
    >
      <span className="absolute top-6 right-6 h-2.5 w-2.5 rounded-full bg-tangerine" />
      <p
        ref={numRef}
        className="font-black text-[3.5rem] md:text-[4.5rem] leading-none tracking-[-0.04em]"
        style={{ color: '#0A0A0A' }}
      >
        {stat.prefix || ''}0{stat.suffix || ''}
      </p>
      <p className="text-sm font-medium leading-snug" style={{ color: 'rgba(10,10,10,0.55)' }}>
        {stat.label}
      </p>
    </div>
  );
}

export default function Numbers() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    /* Parallax globe */
    gsap.to('.numbers-globe', {
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
    });

    /* Sub-headline "typing" stagger reveal */
    gsap.to('.sub-headline .char', {
      opacity: 1,
      y: 0,
      duration: 0.05,
      stagger: 0.02,
      ease: 'none',
      scrollTrigger: {
        trigger: '.sub-headline',
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    });

    /* Headline fill effect */
    gsap.fromTo(
      '.numbers-headline',
      { color: 'rgba(10,10,10,0.2)' },
      {
        color: 'rgba(10,10,10,1)',
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.numbers-headline',
          start: 'top 80%',
        },
      },
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="numbers" className="theme-cream bg-base overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <RevealOnScroll>
          <span className="inline-flex items-center gap-2 bg-tangerine/10 text-tangerine border border-tangerine/25 rounded-full px-4 py-1.5 font-mono text-[11px] font-bold tracking-[0.18em] uppercase mb-10">
            <span className="h-1.5 w-1.5 rounded-full bg-tangerine inline-block" />
            THE NUMBERS
          </span>
        </RevealOnScroll>

        <div className="grid grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="col-span-12 lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div
                className="absolute inset-0 m-auto w-[280px] h-[280px] rounded-full pointer-events-none"
                style={{
                  background: 'conic-gradient(from 0deg, rgba(255,107,44,0.15), rgba(79,111,255,0.15), rgba(255,217,61,0.12), rgba(16,185,129,0.12), rgba(255,107,44,0.15))',
                  animation: 'spin 12s linear infinite',
                  filter: 'blur(24px)',
                }}
              />
              <img src={IMG.globe} alt="Globe" loading="lazy" className="numbers-globe relative w-full max-w-md mx-auto h-auto" />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 order-1 lg:order-2">
            <h2 className="numbers-headline font-black text-display-lg text-ink leading-[0.92] tracking-[-0.04em] mb-12">
              We are an extension{' '}
              <span className="relative inline-block">
                <span aria-hidden="true" className="absolute inset-x-0 inset-y-2 -rotate-1 rounded-[8px] bg-lemon" />
                <span className="relative" style={{ color: '#0A0A0A' }}>of your team.</span>
              </span>
            </h2>

            <div className="text-ink-sec text-base md:text-lg leading-relaxed mb-12 max-w-xl">
              <SplitText 
                text="The output of a good factory is measurable. Here is ours, across the brands we run today." 
                className="sub-headline" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
