import { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

type Effect = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scaleUp' | 'flipUp';

interface Props {
  children: ReactNode;
  effect?: Effect;
  delay?: number;
}

const variants: Record<Effect, { hidden: object; visible: object }> = {
  fadeUp: {
    hidden: { opacity: 0, y: 90, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -90, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -120, filter: 'blur(6px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 120, filter: 'blur(6px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.75, filter: 'blur(8px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  },
  flipUp: {
    hidden: { opacity: 0, rotateX: 25, y: 80, filter: 'blur(6px)' },
    visible: { opacity: 1, rotateX: 0, y: 0, filter: 'blur(0px)' },
  },
};

const SectionReveal = ({ children, effect = 'fadeUp', delay = 0 }: Props) => {
  const ref = useRef(null);
  // once: false — triggers every time the section enters the viewport
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[effect]}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
      style={{ perspective: '1200px' }}
    >
      {children}
    </motion.div>
  );
};

export default SectionReveal;
