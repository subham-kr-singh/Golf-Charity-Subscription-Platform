import { cn } from '../../lib/utils';

export function Skeleton({ className, rounded = 'rounded-md' }) {
  return (
    <div
      className={cn(
        "animate-shimmer bg-[linear-gradient(110deg,#16213A,45%,#1e2d4a,55%,#16213A)] bg-[length:200%_100%] border border-border",
        rounded,
        className
      )}
    />
  );
}
