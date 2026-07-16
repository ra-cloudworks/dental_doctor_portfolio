import { useRef, useMemo } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.7,
  y = 40,
  x = 0,
  scale = 1,
  rotate = 0,
  direction = 'up',
  once = true,
  className = '',
  style = {},
  parallax = 0,
  blur = false,
  stagger = 0,
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-60px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);
  const parallaxRotate = useTransform(scrollYProgress, [0, 1], [rotate, -rotate]);

  const axisMap = {
    up:    { x: 0,  y: y },
    down:  { x: 0,  y: -y },
    left:  { x: x || 60, y: 0 },
    right: { x: x || -60, y: 0 },
  };
  const offset = axisMap[direction] || axisMap.up;

  const blurInitial = blur ? { filter: 'blur(8px)' } : {};
  const blurAnimate = blur ? { filter: 'blur(0px)' } : {};

  const motionStyle = parallax !== 0
    ? { ...style, y: parallaxY, rotate: parallaxRotate }
    : style;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={motionStyle}
      initial={{ opacity: 0, ...offset, scale: scale < 1 ? scale : 1, ...blurInitial }}
      animate={isInView
        ? { opacity: 1, x: 0, y: parallax !== 0 ? parallaxY : 0, scale: 1, rotate: 0, ...blurAnimate }
        : { opacity: 0, ...offset, scale: scale < 1 ? scale : 1, ...blurInitial }
      }
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
