import { useRef, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Pill from '../../components/ui/Pill.jsx';
import RevealOnScroll from '../../components/ui/RevealOnScroll.jsx';
import ContactForm from '../../components/contact/ContactForm.jsx';
import ContactInfo from '../../components/contact/ContactInfo.jsx';
import IMG from '../../assets/images.js';

const LD_JSON = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Loompaa',
  url: 'https://loompaa.in/contact',
};

const OFFICES = [
  {
    iconSrc: IMG.locationGreen,
    location: '47 Athwagate Circle',
    city: 'Surat, GJ 395001',
    email: 'surat@loompaa.in',
  },
  {
    iconSrc: IMG.locationBlue,
    location: '12 Prahlad Nagar Rd',
    city: 'Ahmedabad, GJ 380015',
    email: 'ahmedabad@loompaa.in',
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

export default function Contact() {
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
    gsap.to('.contact-p .char', {
      opacity: 1,
      duration: 0.03,
      stagger: 0.01,
      ease: 'none',
      delay: 0.8,
    });
  }, { scope: containerRef });

  return (
    <>
      <Helmet>
        <title>Contact Loompaa — Let's Build Something Together</title>
        <meta
          name="description"
          content="Tell us about your brand. We'll come back with observations — not a sales pitch."
        />
        <script type="application/ld+json">{JSON.stringify(LD_JSON)}</script>
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
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-12 text-center">
          <div ref={pillRef} style={{ opacity: 0 }} className="flex justify-center">
            <Pill variant="default">TALK — Let's Begin</Pill>
          </div>
          <h1
            ref={h1Ref}
            style={{ opacity: 0 }}
            className="mt-8 font-sans font-black text-display-xl text-ink leading-[0.95] tracking-[-0.03em] max-w-4xl mx-auto"
          >
            The factory floor{' '}
            <span className="text-tangerine">is open.</span>
          </h1>
          <p className="mt-8 text-ink-sec text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            <SplitText 
              text="Tell us about your brand. What you're selling. What's not working. What you need to move. We'll come back with observations — not a sales pitch." 
              className="contact-p" 
            />
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-12 gap-8 md:gap-12">
          <div className="col-span-12 lg:col-span-4">
            <ContactInfo />
          </div>
          <div className="col-span-12 lg:col-span-8 space-y-8">
            <RevealOnScroll>
              <div>
                <h2 className="font-sans font-black text-display-md text-ink leading-[1.05] tracking-[-0.02em]">
                  Tell us where{' '}
                  <span className="text-tangerine">you actually are.</span>
                </h2>
                <p className="mt-5 text-ink-sec text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                  Not where you want to be. Where you are right now. The more honest you are about what's broken, the faster we can tell you what we'd do about it.
                </p>
              </div>
            </RevealOnScroll>
            <div className="rounded-card border border-subtle bg-elevated p-6 md:p-10 shadow-sm hover:shadow-md transition-shadow">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-elevated/40 border-y border-subtle">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-24">
          <div className="grid grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="col-span-12 lg:col-span-5">
              <RevealOnScroll>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-tangerine mb-6 font-bold">
                  Visit
                </p>
                <h2 className="font-sans font-black text-display-md text-ink leading-[1.05] tracking-[-0.02em]">
                  Come and visit{' '}
                  <span className="text-tangerine">our offices.</span>
                </h2>
                <p className="mt-6 text-ink-sec text-base md:text-lg leading-relaxed font-medium">
                  Two cities. One factory floor. Walk in, hand us your numbers, and we'll show you what we'd ship in your first 48 hours.
                </p>
              </RevealOnScroll>
            </div>

            <div className="col-span-12 lg:col-span-7">
              <RevealOnScroll delay={0.1}>
                <div className="relative">
                  <img
                    src={IMG.worldMapDark}
                    alt="Map"
                    className="w-full h-auto opacity-60"
                    style={{ filter: 'invert(0.9) hue-rotate(180deg) saturate(0.3)' }}
                  />

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {OFFICES.map((o) => (
                      <div
                        key={o.email}
                        className="rounded-card border border-subtle bg-base p-5 hover:border-tangerine transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <img src={o.iconSrc} alt="" aria-hidden="true" className="h-8 w-8" />
                          <div className="flex-1">
                            <p className="text-[10px] text-ink-tri font-mono uppercase tracking-widest font-bold">
                              Location
                            </p>
                            <p className="mt-1 text-sm text-ink font-black leading-tight tracking-tight uppercase">
                              {o.location}
                              <br />
                              {o.city}
                            </p>
                            <p className="mt-3 text-[10px] text-ink-tri font-mono uppercase tracking-widest font-bold">
                              Email
                            </p>
                            <a
                              href={`mailto:${o.email}`}
                              className="text-sm text-tangerine font-bold hover:underline"
                            >
                              {o.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 text-center">
        <p className="font-black text-2xl md:text-3xl text-ink-sec max-w-4xl mx-auto leading-tight tracking-tight uppercase">
          No pitch decks. No 48-hour follow-up drip. We'll look at your brand, come back with something specific, and have a real conversation about whether we're the right fit.
        </p>
      </section>
    </>
  );
}
