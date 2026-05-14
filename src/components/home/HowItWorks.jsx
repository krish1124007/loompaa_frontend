import { useRef, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../ui/Button.jsx';
import RevealOnScroll from '../ui/RevealOnScroll.jsx';
import IMG from '../../assets/images.js';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: '01',
    icon: IMG.subscribePlan,
    title: 'Subscribe to a plan',
    body: "Lorem ipsum dolor sit amet consectetur mi urna tellus dignissim duis at in tempor mauris morbi.",
  },
  {
    number: '02',
    icon: IMG.makeRequest,
    title: 'Make your request',
    body: "Lorem ipsum dolor sit amet consectetur mi urna tellus dignissim duis at in tempor mauris morbi.",
  },
  {
    number: '03',
    icon: IMG.getDesign,
    title: 'Plug In & Execute',
    body: 'Lorem ipsum dolor sit amet consectetur mi urna tellus dignissim duis at in tempor mauris morbi.',
  },
  {
    number: '04',
    icon: IMG.subscribePlan,
    title: 'Report & Scale',
    body: "Lorem ipsum dolor sit amet consectetur mi urna tellus dignissim duis at in tempor mauris morbi.",
  },
];

export default function HowItWorks() {
  const containerRef = useRef(null);
  const leftColRef   = useRef(null);
  const lineRef      = useRef(null);

  useGSAP(() => {
    /* ── Heading "Follow" Animation ── */
    // Only animate on desktop (where the layout is two columns)
    if (window.innerWidth >= 1024) {
      gsap.to(leftColRef.current, {
        y: () => {
          const h = containerRef.current.offsetHeight - leftColRef.current.offsetHeight - 300;
          return Math.max(0, h);
        },
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 15%',
          end: 'bottom 85%',
          scrub: 1.2,
        },
      });
    }

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
  }, { scope: containerRef });

  return (
    <section id="process" ref={containerRef} className="theme-cream bg-white rounded-t-[60px] md:rounded-t-[100px] relative overflow-hidden z-20 -mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-40">
        <div className="grid grid-cols-12 gap-12 md:gap-20 items-start">
          
          {/* ── Left Side: Heading & CTA ── */}
          <div ref={leftColRef} className="col-span-12 lg:col-span-5 relative">
            <RevealOnScroll>
               <h2 className="font-sans font-black text-[56px] md:text-[84px] leading-[0.9] tracking-[-0.04em] text-[#0A0A0A]">
                  Take a look at our{' '}
                  <span className="relative inline-block px-4 py-1 mx-1 mt-2">
                    <span className="absolute inset-0 bg-[#4F6FFF] -rotate-3 rounded-2xl" />
                    <span className="relative text-white">process</span>
                  </span>
               </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="mt-10 text-[#545049] text-lg md:text-xl leading-relaxed max-w-md">
                Lorem ipsum dolor sit amet consectetur mi urna tellus dignissim duis at in tempor mauris morbi.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <div className="mt-12">
                <Button to="/contact" variant="dark" size="lg" className="rounded-full !px-10">
                  Get in touch
                </Button>
              </div>
            </RevealOnScroll>
          </div>

          {/* ── Right Side: Steps ── */}
          <div className="col-span-12 lg:col-span-7">
            <div className="relative pt-4">
              {/* Vertical line connecting numbers */}
              <div ref={lineRef} aria-hidden="true" className="absolute left-[31px] md:left-[35px] top-12 bottom-12 w-[3px] bg-[#0A0A0A]/10" />

              <ul className="space-y-16 md:space-y-24">
                {STEPS.map((step, i) => (
                  <RevealOnScroll key={step.number} delay={i * 0.1}>
                    <li className="relative group flex items-start gap-8 md:gap-12">
                      
                      {/* Step Number Circle */}
                      <div className="relative flex-shrink-0 h-[64px] w-[64px] md:h-[72px] md:w-[72px] rounded-full bg-[#0A0A0A] text-white flex items-center justify-center font-bold text-xl md:text-2xl z-10 shadow-lg">
                        {step.number}
                      </div>

                      {/* Icon + Content */}
                      <div className="flex-1 min-w-0 pt-2 flex items-start gap-6 md:gap-10">
                        {/* Illustration icon */}
                        <div className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24">
                          <img 
                            src={step.icon} 
                            alt="" 
                            aria-hidden="true" 
                            className="w-full h-auto transition-all duration-500 transform group-hover:scale-110" 
                          />
                        </div>

                        {/* Title + Text */}
                        <div className="flex-1">
                          <h3 className="text-3xl md:text-[44px] font-black text-[#0A0A0A] leading-tight mb-4">
                            {step.title}
                          </h3>
                          <p className="text-[#545049] text-base md:text-xl leading-relaxed max-w-lg">
                            {step.body}
                          </p>
                        </div>
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
