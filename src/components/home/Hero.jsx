import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Pill from '../ui/Pill.jsx';
import Button from '../ui/Button.jsx';
import { Highlight } from '../ui/SectionHeader.jsx';
import IMG from '../../assets/images.js';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const pillRef      = useRef(null);
  const h1Ref        = useRef(null);
  const subRef       = useRef(null);
  const btnsRef      = useRef(null);
  const imgRef       = useRef(null);

  useGSAP(() => {
    /* ── Floating decorative shapes ── */
    gsap.to('.floating-shape', {
      y: 'random(-30, 30)',
      x: 'random(-15, 15)',
      rotation: 'random(-25, 25)',
      duration: 'random(3, 6)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: { each: 0.5, from: 'random' },
    });

    /* ── Entrance Timeline ── */
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    tl.fromTo(pillRef.current, { y: 20, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.8 })
      /* Premium skew reveal for headline */
      .fromTo(h1Ref.current, 
        { y: 70, opacity: 0, skewY: 4, transformOrigin: 'left top' }, 
        { y: 0, opacity: 1, skewY: 0, duration: 1.2 }, 
        '-=0.5'
      )
      .fromTo(subRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
      .fromTo(btnsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
      .fromTo(imgRef.current, 
        { y: 80, opacity: 0, scale: 0.94, rotationX: -10 }, 
        { y: 0, opacity: 1, scale: 1, rotationX: 0, duration: 1.4, ease: 'power4.out' }, 
        '-=0.7'
      );

    /* ── Parallax drift on scroll ── */
    gsap.to('.parallax-item', {
      y: (i, target) => -1 * (target.dataset.speed || 40) * 1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    /* ── Grid backdrop movement ── */
    gsap.to('.hero-grid', {
      y: -100,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    /* ── 3D Mouse Tilt for Mockup Image ── */
    const onMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      gsap.to(imgRef.current, {
        rotationY: x * 8,
        rotationX: -y * 8,
        x: x * 20,
        y: y * 20,
        duration: 0.8,
        ease: 'power2.out',
      });
    };
    containerRef.current.addEventListener('mousemove', onMove);

    return () => {
      containerRef.current?.removeEventListener('mousemove', onMove);
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="theme-cream bg-base relative -mt-16 md:-mt-20 pt-16 md:pt-20 rounded-b-[3rem] z-10"
    >
      {/* Inner clip: keeps decoratives from bleeding out of section bounds */}
      <div className="absolute inset-0 overflow-hidden rounded-b-[3rem] pointer-events-none">
        {/* Decorative grid backdrop */}
        <div
          aria-hidden="true"
          className="hero-grid absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(var(--ink-primary) 1px, transparent 1px), linear-gradient(90deg, var(--ink-primary) 1px, transparent 1px)',
            backgroundSize: '120px 120px',
          }}
        />

        {/* Decorative radial glow */}
        <div
          aria-hidden="true"
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,107,44,0.08) 0%, transparent 65%)',
          }}
        />
      </div>

      {/* Floating decorative shapes with speed data for parallax */}
      <img
        src={IMG.dot}
        alt=""
        aria-hidden="true"
        data-speed="120"
        className="floating-shape parallax-item absolute top-[18%] left-[6%] w-4 h-4 opacity-50 hidden md:block"
      />
      <img
        src={IMG.cross}
        alt=""
        aria-hidden="true"
        data-speed="80"
        className="floating-shape parallax-item absolute top-[12%] right-[12%] w-6 h-6 opacity-60 hidden md:block"
      />
      <img
        src={IMG.lines}
        alt=""
        aria-hidden="true"
        data-speed="150"
        className="floating-shape parallax-item absolute bottom-[28%] left-[10%] w-9 opacity-40 hidden md:block"
      />
      <div
        aria-hidden="true"
        data-speed="60"
        className="floating-shape parallax-item absolute top-[35%] right-[7%] w-5 h-5 rounded-full bg-tangerine/30 hidden md:block"
      />
      <div
        aria-hidden="true"
        data-speed="100"
        className="floating-shape parallax-item absolute bottom-[40%] right-[20%] w-3 h-3 rounded-full bg-lemon/40 hidden md:block"
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-12 md:pt-20 pb-12 md:pb-16">
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center gap-8">

          {/* Pill badge */}
          <div ref={pillRef} style={{ opacity: 0 }}>
            <Pill variant="accent">RESULTS — Result-Driven E-Commerce Partner</Pill>
          </div>

          {/* Headline with premium skew reveal */}
          <h1
            ref={h1Ref}
            style={{ opacity: 0 }}
            className="hero-title font-sans font-black text-[40px] md:text-[84px] text-ink leading-[1.1] tracking-[-0.04em]"
          >
            <span className="block whitespace-nowrap">
              We don't <Highlight color="lemon">pitch decks.</Highlight>
            </span>
            <span className="block whitespace-nowrap mt-4">
              We Ship <span className="relative inline-block ml-8">
                <span className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                   {/* Bigger Cursor Icon closer to text */}
                   <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl rotate-[90deg]">
                      <path d="M5.5 3.5L18.5 11.5L11.5 13.5L9.5 20.5L5.5 3.5Z" fill="black" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
                   </svg>
                </span>
                <span className="relative inline-block px-8 py-3">
                  <span className="absolute inset-0 bg-[#3B3BFF] -rotate-2 rounded-2xl shadow-[0_15px_40px_rgba(59,59,255,0.3)]" />
                  <span className="relative text-white">results.</span>
                </span>
              </span>
            </span>
          </h1>

          {/* Sub copy */}
          <p
            ref={subRef}
            style={{ opacity: 0 }}
            className="hero-text text-ink-sec text-lg md:text-xl max-w-2xl leading-relaxed font-medium"
          >
            Loompaa is your e-commerce factory floor. We plug in, build the systems,
            run the ads, and move the number — while you take the bow.
          </p>

          {/* CTA buttons */}
          <div
            ref={btnsRef}
            style={{ opacity: 0 }}
            className="flex flex-wrap justify-center gap-6 pt-4 items-center"
          >
            <Button to="/contact" size="lg">Start Building</Button>
            <Button href="#process" variant="secondary" size="lg">
              See How It Works
            </Button>
          </div>
        </div>

        {/* Hero illustration with 3D tilt entrance */}
        <div ref={imgRef} style={{ opacity: 0 }} className="relative mt-12 md:mt-16">
          <img
            src={IMG.heroMockups}
            alt="Loompaa factory floor"
            loading="eager"
            className="w-full max-w-5xl mx-auto h-auto select-none pointer-events-none"
            style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.25))' }}
          />
        </div>
      </div>
    </section>
  );
}
