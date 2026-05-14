import { useRef, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

/* ── Inline stat — single row: number left, label right ── */
function InlineStat({ stat, index }) {
  const wrapRef = useRef(null);
  const numRef  = useRef(null);

  useGSAP(() => {
    const wrap = wrapRef.current;
    const num  = numRef.current;
    if (!wrap || !num) return;

    /* Entrance */
    gsap.fromTo(
      wrap,
      { x: 30, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.7,
        delay: index * 0.14,
        ease: 'expo.out',
        scrollTrigger: { trigger: wrap, start: 'top 88%' },
      },
    );

    /* Count-up */
    const obj = { val: 0 };
    gsap.to(obj, {
      val: stat.value,
      duration: 1.8,
      ease: 'power2.out',
      delay: index * 0.14 + 0.25,
      scrollTrigger: { trigger: wrap, start: 'top 88%' },
      onUpdate() {
        const formatted = Number.isInteger(stat.value)
          ? Math.round(obj.val)
          : obj.val.toFixed(1);
        num.textContent = (stat.prefix || '') + formatted + (stat.suffix || '');
      },
    });
  }, { scope: wrapRef });

  return (
    <div
      ref={wrapRef}
      className="flex flex-col gap-1 cursor-default"
      style={{ opacity: 0 }}
    >
      {/* Big number */}
      <p
        ref={numRef}
        className="font-bold leading-none tracking-[-0.04em]"
        style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#0A0A0A' }}
      >
        {stat.prefix || ''}0{stat.suffix || ''}
      </p>
      {/* Label */}
      <p className="text-sm md:text-base font-medium mt-1" style={{ color: 'rgba(10,10,10,0.50)' }}>
        {stat.label}
      </p>
    </div>
  );
}

export default function Numbers() {
  const sectionRef = useRef(null);

  useGSAP(() => {
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
      },
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
    <section ref={sectionRef} id="numbers" className="theme-cream bg-base overflow-hidden rounded-t-[3rem] relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">

        <div className="grid grid-cols-12 gap-10 md:gap-16 items-center">

          {/* LEFT — World Map image (from contact assets) */}
          <div className="col-span-12 lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              {/* Soft glow behind map */}
              <div
                className="absolute inset-0 m-auto w-[300px] h-[300px] rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255,107,44,0.12) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                }}
              />
              <img
                src={IMG.worldMapLight}
                alt="World map showing Loompaa's reach"
                loading="lazy"
                className="relative w-full max-w-lg mx-auto h-auto"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
          </div>

          {/* RIGHT — Content */}
          <div className="col-span-12 lg:col-span-7 order-1 lg:order-2">

            {/* Headline — styled exactly like the screenshot with cursor on the left pointing right */}
            <h2 className="numbers-headline font-sans font-black text-[42px] md:text-[64px] leading-[1.1] tracking-[-0.04em] text-[#0A0A0A] mb-10">
              <span className="relative inline-block">
                <span className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                   {/* Bigger Cursor Icon closer to text */}
                   <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl rotate-[90deg]">
                      <path d="M5.5 3.5L18.5 11.5L11.5 13.5L9.5 20.5L5.5 3.5Z" fill="black" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
                   </svg>
                </span>
                <span className="relative inline-block px-8 py-3">
                  <span className="absolute inset-0 bg-[#3B3BFF] -rotate-2 rounded-2xl shadow-[0_15px_40px_rgba(59,59,255,0.3)]" />
                  <span className="relative text-white">Unlimited</span>
                </span>
              </span>
              <span className="ml-4">design</span>
              <span className="block mt-2">for your startup</span>
            </h2>

            {/* Body text */}
            <div className="text-ink-sec text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              <SplitText
                text="The output of a good factory is measurable. Here is ours, across the brands we run today."
                className="sub-headline"
              />
            </div>

            {/* Stats — horizontal inline row (reference style, no card boxes) */}
            <div className="flex flex-nowrap gap-6 md:gap-10 mb-10 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
              {STATS.map((stat, i) => (
                <InlineStat key={stat.label} stat={stat} index={i} />
              ))}
            </div>

            {/* Learn more CTA */}
            <a
              href="/about"
              className="inline-flex items-center gap-3 font-bold text-base text-ink hover:text-tangerine transition-colors duration-200 group"
            >
              Learn more
              <span
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border-2 border-current group-hover:bg-tangerine group-hover:border-tangerine group-hover:text-white transition-all duration-200 text-sm"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
