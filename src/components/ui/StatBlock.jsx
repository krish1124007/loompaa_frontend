import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '../../lib/cn.js';

function parseStat(raw) {
  const m = String(raw).match(/^([₹$€£]?)([\d.]+)([a-zA-Z+×%]*)$/);
  if (!m) return { prefix: '', number: NaN, suffix: raw };
  return { prefix: m[1] || '', number: parseFloat(m[2]), suffix: m[3] || '' };
}

const SIZE_CLASSES = {
  md: 'text-[clamp(2.75rem,5.5vw,4.5rem)]',
  lg: 'text-display-lg',
};

export default function StatBlock({
  value,
  label,
  className = '',
  highlightSuffix = false,
  size = 'lg',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const { prefix, number, suffix } = parseStat(value);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || Number.isNaN(number)) return;
    const duration = 1500;
    const start = performance.now();
    const decimals = String(number).split('.')[1]?.length || 0;
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - 1.2 * t, 3); // Faster start
      const currentVal = Math.min(number, number * eased);
      setDisplay(decimals ? Number(currentVal.toFixed(decimals)) : Math.round(currentVal));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, number]);

  return (
    <div ref={ref} className={cn('flex flex-col gap-4', className)}>
      <div
        className={cn(
          'font-mono font-bold text-ink leading-none tracking-tighter tabular-nums whitespace-nowrap',
          SIZE_CLASSES[size] || SIZE_CLASSES.lg,
        )}
      >
        <span className="text-tangerine/40 mr-1">{prefix}</span>
        {Number.isNaN(number) ? value : display}
        <span className={highlightSuffix ? 'text-tangerine' : 'text-ink-tri ml-1'}>{suffix}</span>
      </div>
      <div className="text-ink-sec text-[15px] md:text-lg font-medium leading-tight max-w-[24ch]">{label}</div>
    </div>
  );
}
