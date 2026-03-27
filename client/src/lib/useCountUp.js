import { useEffect, useState } from 'react';
import { useMotionValue, animate, useReducedMotion } from 'framer-motion';

export function useCountUp(target, duration = 2) {
  const [value, setValue] = useState(0);
  const motionValue = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    const controls = animate(motionValue, target, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        setValue(Math.round(latest));
      }
    });

    return controls.stop;
  }, [target, duration, motionValue, prefersReducedMotion]);

  return value;
}
