import { motion } from 'framer-motion';
import Pill from '../ui/Pill.jsx';
import IMG, { SERVICE_VISUALS } from '../../assets/images.js';

function renderEmphasized(text, emphasis) {
  if (!emphasis) return text;
  const idx = text.toLowerCase().indexOf(emphasis.toLowerCase());
  if (idx < 0) return text;
  return (
    <>
      {text.slice(0, idx)}
      <em className="font-display not-italic italic text-tangerine">
        {text.slice(idx, idx + emphasis.length)}
      </em>
      {text.slice(idx + emphasis.length)}
    </>
  );
}

const BLOCK_BG = {
  tangerine: '#FF6B2C',
  lemon: '#FFD93D',
  success: '#4ADE80',
};

export default function ServiceHero({ service }) {
  const { hero, categoryTag, number } = service;
  const visual = SERVICE_VISUALS[service.slug] || {};
  const blockBg = BLOCK_BG[visual.block] || '#FF6B2C';

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(var(--ink-primary) 1px, transparent 1px), linear-gradient(90deg, var(--ink-primary) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="grid grid-cols-12 gap-8 md:gap-16">
          <div className="col-span-12 md:col-span-7 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Pill variant="accent">
                {hero?.eyebrow || `SERVICE ${number} — ${service.title}`}
              </Pill>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="h-20 w-20 md:h-24 md:w-24 rounded-2xl flex items-center justify-center"
              style={{
                backgroundColor: blockBg,
                boxShadow: `0 14px 28px -8px ${blockBg}33`,
              }}
            >
              {visual.icon && (
                <img
                  src={visual.icon}
                  alt=""
                  aria-hidden="true"
                  className="h-12 w-12 md:h-14 md:w-14"
                />
              )}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans font-bold text-display-lg text-ink leading-[1] tracking-[-0.025em]"
            >
              {renderEmphasized(hero?.headline || service.title, hero?.headlineEmphasis)}
            </motion.h1>

            {hero?.subhead && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="text-ink-sec text-lg md:text-xl max-w-prose leading-relaxed"
              >
                {hero.subhead}
              </motion.p>
            )}
          </div>

          <div className="col-span-12 md:col-span-5 flex items-start justify-end relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans font-bold text-[clamp(6rem,15vw,12rem)] leading-[0.85] tracking-[-0.04em] text-tangerine/15 select-none absolute top-0 right-0 pointer-events-none"
            >
              {categoryTag}
            </motion.div>
            {/* Web design illustration on Web Development service for visual richness */}
            {service.slug === 'website-development' && (
              <motion.img
                src={IMG.webDesignMain}
                alt=""
                aria-hidden="true"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-md"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
