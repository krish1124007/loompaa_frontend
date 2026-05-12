import { cn } from '../../lib/cn.js';

export default function Card({
  children,
  variant = 'default',
  className = '',
  as: Tag = 'div',
  ...rest
}) {
  const variants = {
    default: 'bg-elevated border border-subtle',
    bordered: 'bg-base border border-strong',
    cream: 'bg-cream text-ink-on-cream border border-cream',
  };
  return (
    <Tag
      className={cn(
        'rounded-card transition-transform duration-300 ease-loompaa',
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
