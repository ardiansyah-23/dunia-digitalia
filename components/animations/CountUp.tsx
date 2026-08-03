'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function CountUp({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  className,
}: CountUpProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString('id-ID'));
  const { ref, inView } = useInView({ triggerOnce: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      animate(count, end, {
        duration,
        ease: [0.22, 1, 0.36, 1],
      });
    }
  }, [inView, end, duration, count]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
