import { useRef, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Pill from '../../components/ui/Pill.jsx';
import RevealOnScroll from '../../components/ui/RevealOnScroll.jsx';
import FinalCTA from '../../components/home/FinalCTA.jsx';
import { useSiteStore } from '../../stores/siteStore.js';
import { SERVICE_VISUALS } from '../../assets/images.js';

const BLOCK_COLORS = {
  tangerine: '#FF6B2C',
  lemon: '#FFD93D',
  success: '#4ADE80',
};

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

function ServiceCard({ service, index }) {
  const visual = SERVICE_VISUALS[service.slug] || {};
  const bg = BLOCK_COLORS[visual.block] || '#FF6B2C';

  return (
    <RevealOnScroll delay={index * 0.05}>
      <Link
        to={`/services/${service.slug}`}
        className="group block h-full rounded-card border border-subtle bg-elevated p-6 md:p-8 transition-all duration-300 ease-loompaa hover:border-tangerine hover:-translate-y-1"
      >
        <div className="flex items-start justify-between gap-3 mb-6">
          <div
            className="h-16 w-16 md:h-20 md:w-20 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:-rotate-3"
            style={{
              backgroundColor: bg,
              boxShadow: `0 12px 24px -8px ${bg}33`,
            }}
          >
            {visual.icon && (
              <img
                src={visual.icon}
                alt=""
                aria-hidden="true"
                className="h-9 w-9 md:h-11 md:w-11"
              />
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="font-mono text-xs text-ink-tri tracking-wider">{service.number}</span>
            <ArrowUpRight className="h-5 w-5 text-ink-tri group-hover:text-tangerine transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
        <h3 className="text-xl md:text-2xl font-black text-ink mb-3 group-hover:text-tangerine transition-colors">
          {service.title}
        </h3>
        <p className="text-ink-sec text-sm md:text-base leading-relaxed font-medium">
          {service.cardDescription}
        </p>
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-tangerine uppercase tracking-wider">
          <span>Learn more</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </Link>
    </RevealOnScroll>
  );
}

export default function Services() {
  const services = useSiteStore((s) => s.services);
  const containerRef = useRef(null);
  const h1Ref = useRef(null);
  const pillRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo(pillRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
      .fromTo(h1Ref.current, 
        { y: 60, opacity: 0, skewY: 4 }, 
        { y: 0, opacity: 1, skewY: 0, duration: 1.1 }, 
        '-=0.5'
      );

    /* Character reveal for paragraph */
    gsap.to('.services-p .char', {
      opacity: 1,
      duration: 0.03,
      stagger: 0.01, // Slightly faster
      ease: 'none',
      delay: 0.8,
    });
  }, { scope: containerRef });

  return (
    <>
      <Helmet>
        <title>Services — Full-Stack E-Commerce Execution | Loompaa</title>
        <meta
          name="description"
          content="Brand building, performance marketing, website development, marketplace management, logistics — all under one factory roof."
        />
      </Helmet>

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
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-12 md:pb-16 text-center">
          <div ref={pillRef} style={{ opacity: 0 }} className="flex justify-center">
            <Pill variant="default">SERVICES — Eight Stations, One Factory</Pill>
          </div>
          <h1
            ref={h1Ref}
            style={{ opacity: 0 }}
            className="mt-8 font-sans font-black text-display-xl text-ink leading-[0.95] tracking-[-0.03em] max-w-5xl mx-auto"
          >
            We offer a wide range of{' '}
            <span className="text-tangerine">e-commerce services.</span>
          </h1>
          <p className="mt-8 text-ink-sec text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            <SplitText 
              text="From the first ad creative to the last-mile delivery, Loompaa manages every part of your e-commerce operation. You focus on the product. We build everything that turns it into revenue." 
              className="services-p" 
            />
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
