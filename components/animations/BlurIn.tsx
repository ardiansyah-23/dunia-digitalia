'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BlurInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function BlurIn({ children, delay = 0, className }: BlurInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: 'blur(12px)', scale: 0.97 }}
      whileInView={{
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        transition: {
          duration: 0.7,
          delay,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  );
}
