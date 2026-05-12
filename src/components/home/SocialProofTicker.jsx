import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import IMG from '../../assets/images.js';

const ITEMS = [
  { label: 'Result-Driven',       icon: IMG.growth      },
  { label: 'No Retainer Drama',   icon: IMG.agency      },
  { label: 'Plug. Build. Grow.',  icon: IMG.startup     },
  { label: '48 Hours to Live',    icon: IMG.venture     },
  { label: 'We Are The Loompaas', icon: IMG.enterprise  },
  { label: "Numbers Don't Lie",   icon: IMG.company     },
  { label: 'Your Factory Floor',  icon: IMG.institute   },
  { label: 'Zero Lock-In',        icon: IMG.star        },
];

/* ── Animated icon — no bubble, no border, plain dark image ── */
function AnimatedIcon({ icon, index }) {
  const iconRef = useRef(null);

  useGSAP(() => {
    const el = iconRef.current;
    if (!el) return;

    /* Float up-down with different phase per icon */
    gsap.to(el, {
      y: -6,
      duration: 1.8 + index * 0.25,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: index * 0.18,
    });

    /* Hover: scale + slight rotate */
    const enter = () =>
      gsap.to(el, { scale: 1.3, rotate: 12, duration: 0.3, ease: 'back.out(2)' });
    const leave = () =>
      gsap.to(el, { scale: 1, rotate: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });

    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
    return () => {
      el.removeEventListener('mouseenter', enter);
      el.removeEventListener('mouseleave', leave);
    };
  }, { scope: iconRef });

  return (
    <img
      ref={iconRef}
      src={icon}
      alt=""
      aria-hidden="true"
      className="h-7 w-7 md:h-9 md:w-9 flex-shrink-0 cursor-pointer"
      style={{ filter: 'brightness(0)', opacity: 0.7 }}
    />
  );
}

/* ── Single marquee row ── */
function TickerRow({ items, speed = 40, reverse = false }) {
  const tripled = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex items-center w-max"
        style={{
          gap: '3rem',
          animation: `ticker-${reverse ? 'rtl' : 'ltr'} ${speed}s linear infinite`,
        }}
      >
        {tripled.map((item, i) => (
          <span
            key={`${item.label}-${i}`}
            className="inline-flex items-center gap-4 select-none"
          >
            <AnimatedIcon icon={item.icon} index={i % items.length} />

            <span
              className="font-mono uppercase text-sm md:text-base tracking-[0.18em] font-semibold whitespace-nowrap"
              style={{ color: 'rgba(10,10,10,0.50)' }}
            >
              {item.label}
            </span>

            {/* Separator — plain tangerine dot, no glow */}
            <span className="text-base font-bold flex-shrink-0 text-tangerine">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SocialProofTicker() {
  const firstHalf  = ITEMS.slice(0, Math.ceil(ITEMS.length / 2));
  const secondHalf = ITEMS.slice(Math.ceil(ITEMS.length / 2));

  return (
    <section className="border-y border-subtle overflow-hidden py-10 md:py-14 flex flex-col gap-10 md:gap-12 bg-base/60">
      <TickerRow items={[...firstHalf, ...secondHalf]} speed={55} />
      <TickerRow items={[...secondHalf, ...firstHalf]} speed={45} reverse />

      <style>{`
        @keyframes ticker-ltr {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        @keyframes ticker-rtl {
          0%   { transform: translateX(-33.3333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
