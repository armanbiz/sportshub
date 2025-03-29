import React from 'react';
import { motion } from 'framer-motion';
import { LazyMotion, domAnimation, m } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
          delay
        }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}