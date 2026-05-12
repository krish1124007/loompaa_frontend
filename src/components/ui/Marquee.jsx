import { cn } from '../../lib/cn.js';

export default function Marquee({ children, className = '', pauseOnHover = true, repeat = 3, reverse = false }) {
  const items = Array.from({ length: repeat }, (_, i) => (
    <div key={i} aria-hidden={i !== 0} className="flex shrink-0 items-center">
      {children}
    </div>
  ));

  return (
    <div className={cn('relative w-full overflow-hidden', className)} role="marquee">
      <div
        className={cn(
          'flex w-max animate-marquee will-change-transform',
          reverse && '[animation-direction:reverse]',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
      >
        {items}
      </div>
    </div>
  );
}
