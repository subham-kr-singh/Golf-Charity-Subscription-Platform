import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Spinner } from './Spinner';
import { useReducedMotion } from 'framer-motion';

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  className,
  children,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();

  const baseStyles = "inline-flex items-center justify-center font-body font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-btn focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#00E5FF] to-[#0099FF] text-bg hover:shadow-glow-cyan border border-transparent",
    secondary: "bg-accent-2 text-white hover:bg-accent-2/90 hover:shadow-glow-violet border border-transparent",
    ghost: "bg-transparent text-white hover:bg-white/10 border border-transparent",
    danger: "bg-danger text-white hover:bg-danger/90 border border-transparent",
    outline: "bg-transparent border border-border text-white hover:border-accent hover:text-accent"
  };

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-5 text-base",
    lg: "h-14 px-8 text-lg"
  };

  const interactiveDisabled = disabled || isLoading;

  const content = (
    <>
      {isLoading && <Spinner size="sm" className="mr-2" />}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </>
  );

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (prefersReducedMotion) {
    return (
      <button
        type={type}
        className={classes}
        disabled={interactiveDisabled}
        onClick={onClick}
        {...props}
      >
        {content}
      </button>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      disabled={interactiveDisabled}
      onClick={onClick}
      whileHover={interactiveDisabled ? {} : { scale: 1.02 }}
      whileTap={interactiveDisabled ? {} : { scale: 0.97 }}
      {...props}
    >
      {content}
    </motion.button>
  );
}
