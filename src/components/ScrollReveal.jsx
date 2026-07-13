import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.7,
  y = 40,
  x = 0,
  scale = 1,
  direction = 'up',
  once = true,
  className = '',
  style = {},
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-60px' });

  const axisMap = {
    up:    { x: 0,  y: y },
    down:  { x: 0,  y: -y },
    left:  { x: x || 60, y: 0 },
    right: { x: x || -60, y: 0 },
  };
  const offset = axisMap[direction] || axisMap.up;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, ...offset, scale: scale < 1 ? scale : 1 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, ...offset, scale: scale < 1 ? scale : 1 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
