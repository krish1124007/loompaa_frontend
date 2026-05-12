import { forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

const baseField =
  'w-full rounded-xl bg-elevated border border-subtle text-ink placeholder:text-ink-tri ' +
  'px-4 py-3 text-[15px] transition-colors duration-200 ease-loompaa ' +
  'focus:outline-none focus:border-tangerine focus:ring-2 focus:ring-tangerine/20 ' +
  'disabled:opacity-60';

function FieldShell({ id, label, hint, error, required, children }) {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm text-ink-sec">
          {label}
          {required && <span className="text-tangerine ml-1">*</span>}
        </label>
      )}
      {children}
      {hint && !error && <p className="text-xs text-ink-tri">{hint}</p>}
      {error && (
        <p className="text-xs text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const Input = forwardRef(function Input(
  { id, label, hint, error, required, className = '', ...rest },
  ref,
) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required}>
      <input
        ref={ref}
        id={id}
        className={cn(baseField, error && 'border-error focus:border-error focus:ring-error/20', className)}
        aria-invalid={Boolean(error)}
        {...rest}
      />
    </FieldShell>
  );
});

export const Textarea = forwardRef(function Textarea(
  { id, label, hint, error, required, className = '', rows = 5, ...rest },
  ref,
) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required}>
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        className={cn(baseField, 'resize-y min-h-[120px]', error && 'border-error focus:border-error focus:ring-error/20', className)}
        aria-invalid={Boolean(error)}
        {...rest}
      />
    </FieldShell>
  );
});

export const Select = forwardRef(function Select(
  { id, label, hint, error, required, options = [], placeholder, className = '', ...rest },
  ref,
) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required}>
      <select
        ref={ref}
        id={id}
        className={cn(baseField, 'appearance-none cursor-pointer pr-10', error && 'border-error focus:border-error focus:ring-error/20', className)}
        aria-invalid={Boolean(error)}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
});

export default Input;
