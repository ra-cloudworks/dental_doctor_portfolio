import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function SpotlightCard({ children, className = '', style = {} }) {
  const ref = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y, opacity: 1 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSpotlight(prev => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Spotlight radial glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 250px at ${spotlight.x}% ${spotlight.y}%, rgba(184,150,108,0.12), transparent)`,
          opacity: spotlight.opacity,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
