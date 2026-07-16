import { useState, memo } from 'react';
import { motion } from 'framer-motion';

function createParticle(i) {
  const angle = (i / 24) * 360 + Math.random() * 30;
  const rad = (angle * Math.PI) / 180;
  const distance = 80 + Math.random() * 120;
  return {
    id: i,
    x: Math.cos(rad) * distance,
    y: Math.sin(rad) * distance - 60,
    rotation: Math.random() * 720 - 360,
    scale: 0.4 + Math.random() * 0.8,
    color: ['#D4AF37', '#B8966C', '#04231E', '#FAF6F0', '#c9a87c', '#9A7B1C'][Math.floor(Math.random() * 6)],
    shape: Math.random() > 0.5 ? 'circle' : 'square',
    delay: Math.random() * 0.15,
    duration: 1.2 + Math.random() * 0.4,
  };
}

function ConfettiBurst({ count = 24 }) {
  const [particles] = useState(() => Array.from({ length: count }, (_, i) => createParticle(i)));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: '50%',
            top: '40%',
            width: p.shape === 'circle' ? 8 : 6,
            height: p.shape === 'circle' ? 8 : 4,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
            backgroundColor: p.color,
          }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: p.x,
            y: p.y,
            scale: [0, p.scale, p.scale * 0.5],
            opacity: [1, 1, 0],
            rotate: p.rotation,
          }}
          transition={{
            duration: p.duration,
            delay: 0.3 + p.delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      ))}
    </div>
  );
}

export default memo(ConfettiBurst);
