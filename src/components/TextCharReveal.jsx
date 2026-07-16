import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function TextCharReveal({
  text,
  className = '',
  style = {},
  tag: Tag = 'span',
  delay = 0,
  staggerDelay = 0.03,
  once = true,
  springStiffness = 200,
  springDamping = 12,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-40px' });

  const chars = text.split('');

  return (
    <Tag ref={ref} className={className} style={{ ...style, display: 'inline-flex', flexWrap: 'wrap' }}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          initial={{ opacity: 0, y: 30, rotateX: -60, filter: 'blur(4px)' }}
          animate={isInView ? {
            opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
          } : {
            opacity: 0, y: 30, rotateX: -60, filter: 'blur(4px)',
          }}
          transition={{
            delay: delay + i * staggerDelay,
            type: 'spring',
            stiffness: springStiffness,
            damping: springDamping,
          }}
        >
          {char}
        </motion.span>
      ))}
    </Tag>
  );
}
