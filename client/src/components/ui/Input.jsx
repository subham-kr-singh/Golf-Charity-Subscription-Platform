import { cn } from '../../lib/utils';
import { forwardRef } from 'react';

export const Input = forwardRef(({
  label,
  name,
  type = 'text',
  placeholder,
  error,
  leftIcon,
  rightIcon,
  className,
  ...props
}, ref) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={name} className="mb-1.5 text-xs font-heading font-bold uppercase tracking-wider text-muted">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={cn(
            "w-full h-11 bg-surface-2 border rounded-btn px-4 text-text placeholder:text-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
            error ? "border-danger focus:ring-danger" : "border-border",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <span className="mt-1.5 text-xs text-danger">{error}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
