import { cn } from '../../lib/cn.js';

export default function Pill({ variant = 'default', children, className = '', as: Tag = 'span' }) {
  const variants = {
    default: 'bg-elevated text-ink-tri border border-subtle',
    accent: 'bg-tangerine/10 text-tangerine border border-tangerine/30',
    lemon: 'bg-lemon/10 text-lemon border border-lemon/30',
    cream: 'bg-cream text-ink-on-cream border border-cream',
  };
  return (
    <Tag
      className={cn(
        'inline-flex items-center rounded-pill px-3 py-1.5 font-mono uppercase tracking-[0.18em] text-[11px]',
        variants[variant],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
