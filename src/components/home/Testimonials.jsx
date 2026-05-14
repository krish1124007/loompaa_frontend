import { useState, useMemo } from 'react';
import RevealOnScroll from '../ui/RevealOnScroll.jsx';
import IMG from '../../assets/images.js';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const TESTIMONIALS = [
  {
    title: 'Design brilliance that exceeds expectations.!',
    quote:
      "Lorem ipsum dolor sit amet consectetur. Amet mi in purus velit potenti donec eu faucibus mauris. Neque leo commodo ut viverra in tortor et maecenas sagittis nulla.",
    author: 'Sophie Moore',
    role: 'San Francisco, CA',
    avatar: IMG.sophieMoore,
  },
  {
    title: 'Exceptional results for our brand growth.',
    quote:
      "Lorem ipsum dolor sit amet consectetur. Amet mi in purus velit potenti donec eu faucibus mauris. Neque leo commodo ut viverra in tortor et maecenas sagittis nulla.",
    author: 'John Carter',
    role: 'New York, NY',
    avatar: IMG.johnCarter,
  },
  {
    title: 'Highly recommended for any D2C founder.',
    quote:
      "Lorem ipsum dolor sit amet consectetur. Amet mi in purus velit potenti donec eu faucibus mauris. Neque leo commodo ut viverra in tortor et maecenas sagittis nulla.",
    author: 'Matt Cannon',
    role: 'Austin, TX',
    avatar: IMG.johnCarterAlt,
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];

  useGSAP(() => {
    /* Smooth fade in for content change */
    gsap.fromTo('.testimonial-content', 
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
    );
  }, [active]);

  return (
    <section className="theme-cream bg-[#FBF8F2] py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* ── Heading Section ── */}
        <div className="text-center mb-16 flex flex-col items-center">
          <RevealOnScroll>
            <h2 className="font-sans font-black text-[42px] md:text-[64px] leading-[1.1] tracking-[-0.04em] text-[#0A0A0A] mb-6 flex flex-col items-center">
              <span>Take a look at what</span>
              <span className="flex items-center gap-3">
                our <span className="relative inline-block px-4 py-1">
                  <span className="absolute inset-0 bg-[#FF6B2C] -rotate-2 rounded-xl shadow-lg" />
                  <span className="relative text-white">clients</span>
                </span> say
              </span>
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="text-[#545049] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet consectetur mi urna tellus dignissim duis at in tempor mauris morbi fermentum dolor lobortis aliquam maecenas.
            </p>
          </RevealOnScroll>
        </div>

        {/* ── Testimonials Grid ── */}
        <div className="grid grid-cols-12 gap-8 md:gap-16 items-center">
          
          {/* Left Column: Client Tabs */}
          <div className="col-span-12 lg:col-span-5 space-y-3">
            {TESTIMONIALS.map((item, i) => (
              <button
                key={item.author}
                onClick={() => setActive(i)}
                className={`w-full flex items-center gap-5 p-3.5 rounded-[2rem] transition-all duration-500 text-left border border-transparent ${
                  i === active 
                  ? 'bg-[#0A0A0A] text-white shadow-xl scale-[1.02]' 
                  : 'hover:bg-black/5 text-[#0A0A0A]'
                }`}
              >
                <div className="h-14 w-14 md:h-16 md:w-16 rounded-full overflow-hidden border-2 border-white/10 p-0.5">
                   <img 
                    src={item.avatar} 
                    alt={item.author} 
                    className={`w-full h-full object-cover rounded-full ${i === active ? '' : 'grayscale opacity-70'}`} 
                   />
                </div>
                <div>
                  <h4 className={`text-lg md:text-xl font-black leading-tight ${i === active ? 'text-white' : 'text-[#0A0A0A]'}`}>
                    {item.author}
                  </h4>
                  <p className={`text-xs font-medium mt-0.5 ${i === active ? 'text-white/60' : 'text-[#545049]'}`}>
                    {item.role}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: Testimonial Card */}
          <div className="col-span-12 lg:col-span-7">
            <RevealOnScroll>
              <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.05)] border border-black/5 relative min-h-[360px] flex flex-col justify-center">
                
                {/* Content Container */}
                <div className="testimonial-content">
                  {/* Large Avatar */}
                  <div className="h-20 w-20 md:h-24 md:w-24 rounded-full overflow-hidden border-4 border-[#FBF8F2] shadow-lg mb-8">
                    <img src={t.avatar} alt={t.author} className="w-full h-full object-cover" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-[32px] font-black text-[#0A0A0A] leading-tight tracking-tight mb-4">
                    {t.title}
                  </h3>

                  {/* Quote */}
                  <p className="text-[#545049] text-base md:text-lg leading-relaxed">
                    {t.quote}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-8 right-8 opacity-[0.03]">
                   <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM14.017 21V10C14.017 6.13401 17.151 3 21.017 3V5C18.2556 5 16.017 7.23858 16.017 10H19.017C20.1216 10 21.017 10.8954 21.017 12V15C21.017 16.1046 20.1216 17 19.017 17H16.017C14.9124 17 14.017 16.1046 14.017 15V21ZM3 21L3 18C3 16.8954 3.89543 16 5 16H8C9.10457 16 10 16.8954 10 18V21C10 22.1046 9.10457 23 8 23H5C3.89543 23 3 22.1046 3 21ZM3 21V10C3 6.13401 6.13401 3 10 3V5C7.23858 5 5 7.23858 5 10H8C9.10457 10 10 10.8954 10 12V15C10 16.1046 9.10457 17 8 17H5C3.89543 17 3 16.1046 3 15V21Z" />
                   </svg>
                </div>
              </div>
            </RevealOnScroll>
          </div>

        </div>
      </div>
    </section>
  );
}
