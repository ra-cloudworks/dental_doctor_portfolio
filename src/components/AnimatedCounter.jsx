import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

export default function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''));
    if (isNaN(numericTarget)) {
      setCount(target);
      return;
    }

    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * numericTarget);

      if (target.includes('.')) {
        setCount((current + (eased * numericTarget - current)).toFixed(1));
      } else {
        setCount(String(current));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target.replace(/[0-9.]/g, '').length > 0 || target.match(/[0-9]+/) ? target : String(numericTarget));
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix || target.replace(/[0-9.]/g, '')}</span>;
}
