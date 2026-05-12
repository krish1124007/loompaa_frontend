import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn.js';

/* Modern diagonal arrow — matches reference image */
function ArrowIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="5" y1="19" x2="19" y2="5" />
      <polyline points="5 5 19 5 19 19" />
    </svg>
  );
}

const VARIANTS = {
  primary:
    'bg-[#FF6B2C] text-white hover:bg-[#FF7C45] active:scale-[0.97] shadow-[0_4px_24px_rgba(255,107,44,0.40)]',
  secondary:
    'bg-transparent text-[#0A0A0A] hover:text-[#0A0A0A]/80 active:scale-[0.97]',
  tangerine:
    'bg-[#FF6B2C] text-white hover:bg-[#FF7C45] active:scale-[0.97] shadow-[0_4px_24px_rgba(255,107,44,0.40)]',
  ghost:
    'bg-transparent text-[#0A0A0A] hover:bg-[#0A0A0A]/5',
  inverse:
    'bg-white text-[#0A0A0A] hover:bg-white/90',
  danger:
    'bg-red-500 text-white hover:bg-red-600',
  dark:
    'bg-[#0A0A0A] text-white hover:bg-[#1a1a1a] active:scale-[0.97] shadow-[0_4px_24px_rgba(0,0,0,0.30)]',
};

const SIZES = {
  sm: 'px-5 py-2.5 text-[13px]',
  md: 'px-7 py-3.5 text-[15px]',
  lg: 'px-8 py-4 text-[17px]',
};

const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    to,
    href,
    children,
    className = '',
    arrow = true,
    icon = null,
    type = 'button',
    disabled,
    ...rest
  },
  ref,
) {
  const isSecondary = variant === 'secondary';

  const cls = cn(
    'group inline-flex items-center justify-center gap-2.5 font-bold tracking-[-0.01em] transition-all duration-300',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF6B2C]',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
    isSecondary ? 'rounded-none' : 'rounded-2xl',
    VARIANTS[variant],
    SIZES[size],
    className,
  );

  const inner = (
    <>
      {icon}
      <span
        className={
          isSecondary
            ? 'border-b border-current/30 group-hover:border-current transition-colors pb-0.5'
            : ''
        }
      >
        {children}
      </span>
      {arrow && (
        <span
          className={cn(
            'flex items-center justify-center rounded-full transition-all duration-300',
            isSecondary
              ? 'h-9 w-9 border-2 border-current group-hover:bg-[#0A0A0A] group-hover:text-white group-hover:border-[#0A0A0A]'
              : 'h-5 w-5',
          )}
        >
          <ArrowIcon
            className={cn(
              'transition-transform duration-300',
              isSecondary ? 'h-3.5 w-3.5 group-hover:rotate-45' : 'h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
            )}
          />
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link ref={ref} to={to} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a ref={ref} href={href} className={cls} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button ref={ref} type={type} className={cls} disabled={disabled} {...rest}>
      {inner}
    </button>
  );
});

export default Button;
