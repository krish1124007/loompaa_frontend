import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn.js';

export default function Logo({ to = '/', variant = 'dark', size = 'md', className = '' }) {
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl md:text-7xl',
  };
  const inkColor = 'text-current';

  return (
    <Link
      to={to}
      className={cn(
        'inline-flex font-sans font-bold tracking-tight',
        sizes[size],
        inkColor,
        className,
      )}
      aria-label="Loompaa — go to home"
    >
      <span>loomp</span>
      <span className="text-tangerine">aa</span>
    </Link>
  );
}
