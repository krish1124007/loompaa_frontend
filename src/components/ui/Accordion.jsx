import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/cn.js';

export default function Accordion({ items, className = '' }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        const num = String(idx + 1).padStart(2, '0');
        return (
          <div
            key={item.q}
            className={cn(
              'rounded-card border transition-colors duration-200 ease-loompaa',
              isOpen ? 'border-tangerine bg-elevated' : 'border-subtle bg-base',
            )}
          >
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? -1 : idx)}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-7 md:py-6"
              aria-expanded={isOpen}
            >
              <span className="flex items-center gap-4">
                <span
                  className={cn(
                    'font-mono text-xs flex h-7 w-7 items-center justify-center rounded-full transition-colors',
                    isOpen ? 'bg-tangerine text-ink-on-cream' : 'bg-elevated text-ink-tri',
                  )}
                >
                  {num}
                </span>
                <span className="font-medium text-ink text-base md:text-lg">{item.q}</span>
              </span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 text-ink-sec transition-transform duration-300 ease-loompaa shrink-0',
                  isOpen && 'rotate-180 text-tangerine',
                )}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-6 md:px-7 md:pb-7 md:pl-[68px] text-ink-sec leading-relaxed">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
