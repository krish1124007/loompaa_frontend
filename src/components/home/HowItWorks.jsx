import { useRef, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../ui/SectionHeader.jsx';
import Button from '../ui/Button.jsx';
import RevealOnScroll from '../ui/RevealOnScroll.jsx';
import IMG from '../../assets/images.js';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: '01',
    icon: IMG.subscribePlan,
    title: 'Audit & Brief',
    body: "We dissect your store, ad account, and funnel before we say a word about what we'd do. We show up to the first call with observations — not questions.",
  },
  {
    number: '02',
    icon: IMG.makeRequest,
    title: '90-Day Plan',
    body: "Not a vague strategy document. A specific, milestone-by-milestone growth roadmap — you know exactly what we're building and when it goes live.",
  },
  {
    number: '03',
    icon: IMG.getDesign,
    title: 'Plug In & Execute',
    body: 'First campaign live within 48 hours. Creative ships every week. Optimisation runs every day. We are inside the machine, not advising from outside it.',
  },
  {
    number: '04',
    icon: IMG.subscribePlan,
    title: 'Report & Scale',
    body: "Weekly transparency reports. Live dashboards. Monthly growth reviews. If a number isn't moving, you'll know it from us — before you notice it yourself.",
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

export default function HowItWorks() {
  const containerRef = useRef(null);
  const handsRef     = useRef(null);
  const lineRef      = useRef(null);
  const btnRef       = useRef(null);

  useGSAP(() => {
    /* ── Floating hands illustration ── */
    gsap.to('.floating-hands', {
      y: -20,
      rotation: 3,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    /* ── Drawing vertical line on scroll ── */
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0, transformOrigin: 'top' },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          scrub: true,
        },
      }
    );

    /* ── Step Body Reveal (Fast Character Stagger) ── */
    gsap.utils.toArray('.step-body').forEach((body) => {
      gsap.to(body.querySelectorAll('.char'), {
        opacity: 1,
        duration: 0.03,
        stagger: 0.01, // Extra fast
        ease: 'none',
        scrollTrigger: {
          trigger: body,
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      });
    });

    /* ── Icon pulse when in view ── */
    gsap.utils.toArray('.step-icon').forEach((icon) => {
      gsap.to(icon, {
        scale: 1.15,
        backgroundColor: '#FF6B2C',
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: icon,
          start: 'top 65%',
          end: 'bottom 35%',
          toggleActions: 'play reverse play reverse',
        }
      });
    });

    /* ── Magnetic button ── */
    const btn = btnRef.current;
    if (btn) {
      const onMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        gsap.to(btn, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.4,
          ease: 'power2.out',
        });
      };
      const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      btn.addEventListener('mousemove', onMove);
      btn.addEventListener('mouseleave', onLeave);
    }
  }, { scope: containerRef });

  return (
    <section id="process" ref={containerRef} className="theme-cream bg-base border-y border-subtle relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid grid-cols-12 gap-8 md:gap-20 items-start">
          
          <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-28">
            <div ref={handsRef} className="rounded-[32px] bg-elevated/40 backdrop-blur-md border border-subtle p-8 md:p-12 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)]">
              <SectionHeader eyebrow="THE PROCESS" headline="Take a look at our process." emphasis="process." emphasisColor="lemon" />
              <div className="mt-12 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-lemon/10 blur-[60px] rounded-full scale-75" />
                <img src={IMG.openHands} alt="Hands" loading="lazy" className="floating-hands w-full max-w-sm h-auto relative z-10 select-none drop-shadow-2xl" />
              </div>
              <div className="mt-12 pt-8 border-t border-subtle/50">
                <p className="text-ink-sec text-[15px] md:text-base leading-relaxed mb-6">
                  Four steps. Zero ambiguity. We've stripped out the 6-week onboarding and the 40-slide strategy deck.
                </p>
                <div ref={btnRef} className="inline-block">
                  <Button to="/contact" size="md" className="w-full sm:w-auto">Get Started</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="relative pt-4">
              <div ref={lineRef} aria-hidden="true" className="absolute left-[31px] md:left-[35px] top-12 bottom-12 w-[3px]" style={{ background: 'linear-gradient(to bottom, var(--accent-tangerine), var(--accent-lemon))' }} />

              <ul className="space-y-4">
                {STEPS.map((step, i) => (
                  <RevealOnScroll key={step.number} delay={i * 0.1}>
                    <li className="relative group flex items-start gap-6 md:gap-10 py-8 md:py-10 first:pt-0 last:pb-0">
                      <div className="step-icon relative flex-shrink-0 h-[64px] w-[64px] md:h-[72px] md:w-[72px] rounded-2xl bg-ink text-ink-inverse flex items-center justify-center shadow-lg shadow-ink/20 ring-8 ring-base transition-colors duration-500">
                        <img src={step.icon} alt="" aria-hidden="true" className="h-8 w-8 md:h-9 md:w-9 relative z-10 invert brightness-0" />
                      </div>

                      <div className="flex-1 min-w-0 pt-2">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
                          <span className="inline-block font-mono text-[11px] font-bold text-tangerine tracking-widest bg-tangerine/5 px-2.5 py-1 rounded-md border border-tangerine/10 w-fit">
                            STEP {step.number}
                          </span>
                          <h3 className="text-2xl md:text-3xl font-black text-ink">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-ink-sec text-base md:text-lg leading-relaxed max-w-prose">
                          <SplitText text={step.body} className="step-body" />
                        </p>
                      </div>
                    </li>
                  </RevealOnScroll>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
