import Pill from './Pill.jsx';
import { cn } from '../../lib/cn.js';

function Highlight({ children, color = 'lemon' }) {
  const fills = {
    lemon: 'bg-lemon',
    tangerine: 'bg-tangerine',
    blue: 'bg-card-blue',
    yellow: 'bg-card-yellow',
  };
  return (
    <span className="relative inline-block px-1">
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-x-0 inset-y-1 -rotate-1 rounded-[6px]',
          fills[color] || fills.lemon,
        )}
      />
      <span className="relative">{children}</span>
    </span>
  );
}

function renderEmphasized(text, emphasis, color) {
  if (!emphasis) return text;
  const idx = text.toLowerCase().indexOf(emphasis.toLowerCase());
  if (idx < 0) return text;
  return (
    <>
      {text.slice(0, idx)}
      <Highlight color={color}>{text.slice(idx, idx + emphasis.length)}</Highlight>
      {text.slice(idx + emphasis.length)}
    </>
  );
}

export default function SectionHeader({
  eyebrow,
  headline,
  emphasis,
  emphasisColor = 'lemon',
  subhead,
  align = 'left',
  size = 'lg',
  className = '',
  light = false,
}) {
  const aligns = { left: 'items-start text-left', center: 'items-center text-center' };
  const sizes = {
    md: 'text-display-md',
    lg: 'text-display-lg',
    xl: 'text-display-xl',
  };
  return (
    <div className={cn('flex flex-col gap-6', aligns[align], className)}>
      {eyebrow && <Pill variant={light ? "inverse" : "accent"}>{eyebrow}</Pill>}
      <h2 className={cn('font-sans font-bold', light ? 'text-white' : 'text-ink', sizes[size])}>
        {renderEmphasized(headline, emphasis, emphasisColor)}
      </h2>
      {subhead && (
        <p
          className={cn(
            light ? 'text-white/60' : 'text-ink-sec',
            'text-base md:text-lg leading-relaxed max-w-prose',
            align === 'center' && 'mx-auto',
          )}
        >
          {subhead}
        </p>
      )}
    </div>
  );
}

export { Highlight };
