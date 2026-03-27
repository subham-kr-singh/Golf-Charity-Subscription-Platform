import { cn, getInitials } from '../../lib/utils';

export function Avatar({ src, alt, fallback, size = 'md', className }) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-2xl"
  };

  return (
    <div className={cn(
      "relative inline-flex items-center justify-center rounded-full overflow-hidden bg-surface-2 border border-border shrink-0 text-white",
      sizes[size],
      className
    )}>
      {src ? (
        <img 
          src={src} 
          alt={alt || "Avatar"} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <span className="font-heading font-bold text-text uppercase tracking-wider">
          {getInitials(fallback || "U")}
        </span>
      )}
    </div>
  );
}
