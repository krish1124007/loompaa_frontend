import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import Button from '../ui/Button.jsx';
import RevealOnScroll from '../ui/RevealOnScroll.jsx';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    q: 'How fast can you actually go live?',
    a: "First campaign live in 48 hours from contract. We don't do 6-week onboardings. The first week is spent inside your data, not in kickoff calls.",
  },
  {
    q: 'Do you charge a retainer?',
    a: "We have monthly plans, but no lock-ins. Cancel anytime with 30 days' notice. Our Full Factory plan includes a performance guarantee — miss the targets, we work the next 30 days free.",
  },
  {
    q: 'What size brands do you work with?',
    a: "D2C brands doing ₹5L–₹5Cr per month with a proven product. If you're pre-product, we're probably not the right fit yet.",
  },
  {
    q: 'Will you work on Amazon and Flipkart, not just D2C?',
    a: 'Yes. Marketplace management is a full service — Amazon, Flipkart, Meesho, Blinkit, Zepto. We manage listings, ads, and inventory the same way we manage performance marketing.',
  },
  {
    q: 'Who actually does the work?',
    a: 'Loompaas. Our in-house team. No outsourcing to freelancers, no offshore hand-offs. Every campaign, creative, and report is built by the people on your weekly call.',
  },
  {
    q: 'Where are you based?',
    a: 'Surat and Ahmedabad. We work with brands across India and select international markets (US, UAE, UK).',
  },
];

function FAQItem({ item, isOpen, onClick }) {
  const contentRef = useRef(null);

  useGSAP(() => {
    gsap.to(contentRef.current, {
      height: isOpen ? 'auto' : 0,
      opacity: isOpen ? 1 : 0,
      duration: 0.4,
      ease: 'power2.inOut',
    });
  }, [isOpen]);

  return (
    <div className="bg-white border-2 border-black/5 rounded-[32px] overflow-hidden mb-4 shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={onClick}
        className="w-full px-8 py-8 flex items-center justify-between text-left group"
      >
        <span className="text-xl md:text-2xl font-black text-[#0A0A0A] leading-tight pr-4">
          {item.q}
        </span>
        <div className={`flex-shrink-0 w-12 h-12 rounded-full border border-black/10 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#0A0A0A] text-white rotate-90' : 'group-hover:border-black'}`}>
          <ArrowRight className={`w-6 h-6 ${isOpen ? 'text-white' : 'text-[#0A0A0A]'}`} />
        </div>
      </button>
      <div ref={contentRef} className="overflow-hidden px-8 h-0 opacity-0">
        <div className="pb-8 pt-2 text-[#545049] text-lg leading-relaxed max-w-2xl">
          {item.a}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const containerRef = useRef(null);
  const leftColRef = useRef(null);

  useGSAP(() => {
    // Only animate follow on desktop
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
  }, { scope: containerRef });

  return (
    <section id="faq" ref={containerRef} className="theme-cream bg-[#FBF8F2] py-28 md:py-40 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-12 gap-12 md:gap-20 items-start">
          
          {/* ── Left Side: Heading & CTA ── */}
          <div ref={leftColRef} className="col-span-12 lg:col-span-5 relative h-fit">
            <RevealOnScroll>
               <h2 className="font-sans font-black text-[56px] md:text-[84px] leading-[0.9] tracking-[-0.04em] text-[#0A0A0A]">
                  Have any <br className="hidden md:block" />
                  <span className="relative inline-block px-5 py-2 mt-3">
                    <span className="absolute inset-0 bg-[#FF6B2C] -rotate-3 rounded-2xl shadow-lg" />
                    <span className="relative text-white">questions?</span>
                  </span>
               </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="mt-10 text-[#545049] text-lg md:text-xl leading-relaxed max-w-md">
                Lorem ipsum dolor sit amet consectetur mi urna tellus dignissim duis at in tempor.
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

          {/* ── Right Side: Accordion ── */}
          <div className="col-span-12 lg:col-span-7">
            <div className="relative">
              {ITEMS.map((item, i) => (
                <RevealOnScroll key={i} delay={i * 0.1}>
                  <FAQItem 
                    item={item} 
                    isOpen={openIndex === i} 
                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)} 
                  />
                </RevealOnScroll>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
