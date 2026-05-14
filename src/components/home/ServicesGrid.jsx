import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';
import Button from '../ui/Button.jsx';
import RevealOnScroll from '../ui/RevealOnScroll.jsx';
import { useSiteStore } from '../../stores/siteStore.js';
import { SERVICE_VISUALS } from '../../assets/images.js';

const COLOR_CYCLE = [
  { bg: 'var(--card-orange)', glow: 'rgba(255,107,74,0.35)' },
  { bg: 'var(--card-blue)',   glow: 'rgba(79,111,255,0.30)' },
  { bg: 'var(--card-yellow)', glow: 'rgba(255,217,61,0.35)' },
  { bg: 'var(--card-mint)',   glow: 'rgba(168,230,207,0.35)' },
];

function ServiceRow({ service, index }) {
  const visual = SERVICE_VISUALS[service.slug] || {};
  const colors = COLOR_CYCLE[index % COLOR_CYCLE.length];

  return (
    <RevealOnScroll delay={index * 0.05}>
      <Link
        to={`/services/${service.slug}`}
        className="group flex items-center gap-6 md:gap-10 py-8 md:py-10 border-t border-subtle/60 hover:bg-elevated/60 transition-all duration-500 -mx-4 md:-mx-8 px-4 md:px-8 rounded-2xl"
      >
        {/* Colored icon block */}
        <div
          className="flex-shrink-0 h-16 w-16 md:h-24 md:w-24 rounded-3xl flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 shadow-lg"
          style={{
            backgroundColor: colors.bg,
            boxShadow: `0 20px 40px -12px ${colors.glow}`,
          }}
        >
          {visual.icon ? (
            <img
              src={visual.icon}
              alt=""
              aria-hidden="true"
              className="h-9 w-9 md:h-12 md:w-12 group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <span className="font-mono text-2xl md:text-3xl font-bold text-ink-on-cream">{service.number}</span>
          )}
        </div>

        {/* Title + description */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4 mb-3">
            <span className="font-mono text-[10px] font-bold text-ink-tri tracking-[0.2em] uppercase bg-ink/5 px-2 py-0.5 rounded">
              {service.number}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-ink group-hover:text-tangerine transition-colors duration-300">
              {service.title}
            </h3>
          </div>
          <p className="text-ink-sec text-base md:text-lg leading-relaxed line-clamp-2 max-w-3xl opacity-80 group-hover:opacity-100 transition-opacity">
            {service.cardDescription}
          </p>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0 hidden sm:flex h-14 w-14 rounded-full border border-subtle items-center justify-center text-ink-tri group-hover:border-tangerine group-hover:text-tangerine group-hover:bg-tangerine/10 group-hover:scale-110 transition-all duration-500 shadow-sm">
          <ArrowUpRight className="h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </div>
      </Link>
    </RevealOnScroll>
  );
}

export default function ServicesGrid() {
  const services = useSiteStore((s) => s.services);

  return (
    <section className="theme-cream bg-white overflow-hidden rounded-b-[60px] md:rounded-b-[100px] shadow-sm z-20 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">

        {/* ── Section header ── */}
        <div className="mb-20 md:mb-28">
          {/* Eyebrow pill */}
          <RevealOnScroll>
            <span className="inline-flex items-center gap-2 bg-tangerine/10 text-tangerine border border-tangerine/30 rounded-full px-4 py-1.5 font-mono text-[11px] font-bold tracking-[0.18em] uppercase mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-tangerine inline-block" />
              WHAT WE DO
            </span>
          </RevealOnScroll>

          <div className="grid grid-cols-12 gap-8 md:gap-16 items-end">
            {/* Big headline */}
            <div className="col-span-12 lg:col-span-7">
              <RevealOnScroll delay={0.05}>
                <h2 className="font-sans font-black text-display-lg text-ink leading-[0.92] tracking-[-0.04em]">
                  We offer a wide{' '}
                  <span className="relative inline-block">
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 inset-y-2 -rotate-1 rounded-[10px] bg-lemon"
                    />
                    <span className="relative text-ink-on-cream">range</span>
                  </span>{' '}
                  of e-commerce{' '}
                  <span className="text-tangerine">services.</span>
                </h2>
              </RevealOnScroll>
            </div>

            {/* Description column */}
            <div className="col-span-12 lg:col-span-5">
              <RevealOnScroll delay={0.12}>
                <div className="relative pl-7 border-l-4 border-tangerine/40">
                  <div className="absolute -left-0.5 top-0 h-10 w-1 bg-tangerine rounded-full" />
                  <p className="text-ink-sec text-lg md:text-xl leading-relaxed font-medium">
                    From the first ad creative to the last-mile delivery, Loompaa manages every part of your e-commerce operation.
                  </p>
                  <p className="mt-4 text-ink-tri text-base leading-relaxed">
                    You focus on the product. We build everything that turns it into revenue.
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>

          {/* Stats strip */}
          <RevealOnScroll delay={0.18}>
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg">
              {[
                { num: '8+', label: 'Services' },
                { num: '48h', label: 'Go-Live' },
                { num: '0', label: 'Retainer Lock-in' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-elevated/60 border border-subtle/60 px-5 py-4"
                >
                  <p className="font-black text-2xl md:text-3xl text-ink tracking-tight">{stat.num}</p>
                  <p className="text-ink-tri text-xs font-mono uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>

        {/* ── Vertical service rows ── */}
        <div className="border-b border-subtle/60">
          {services.map((s, i) => (
            <ServiceRow key={s.slug} service={s} index={i} />
          ))}
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-4">
          <Button to="/contact" size="lg">Get in Touch</Button>
          <Button to="/services" variant="secondary" size="lg">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
}
