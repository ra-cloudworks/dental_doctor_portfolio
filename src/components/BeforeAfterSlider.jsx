import { useState } from 'react';
import { motion } from 'framer-motion';

const C = {
  forestGreen: 'var(--color-forest-green)',
};

export default function BeforeAfterSlider({ beforeSrc, afterSrc, heightClass = 'aspect-[4/3] sm:aspect-[16/10]' }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      className={`relative overflow-hidden rounded-3xl group shadow-lg ${heightClass}`}
      style={{ backgroundColor: C.forestGreen }}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Before Image */}
      <img
        src={beforeSrc}
        alt="Before restoration"
        className="w-full h-full object-cover select-none absolute inset-0 transition-transform duration-500 group-hover:scale-[1.02]"
        style={{ filter: 'contrast(0.9) brightness(0.85) sepia(0.15)' }}
      />
      <div className="absolute top-4 left-4 text-white text-[9px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase bg-black/60 backdrop-blur-md z-20 pointer-events-none">
        Before Restoration
      </div>

      {/* After Image */}
      <img
        src={afterSrc}
        alt="After restoration"
        className="w-full h-full object-cover select-none absolute inset-0 transition-transform duration-500 group-hover:scale-[1.02]"
        style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
      />
      <div
        className="absolute top-4 right-4 text-white text-[9px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase z-20 pointer-events-none transition-opacity duration-300"
        style={{ backgroundColor: 'rgba(184,150,108,0.95)', opacity: sliderPos < 12 ? 0 : 1 }}
      >
        After Treatment
      </div>

      {/* Vertical divider */}
      <div className="absolute top-0 bottom-0 w-[2px] bg-white z-20 pointer-events-none" style={{ left: `${sliderPos}%` }}>
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-forest-green flex items-center justify-center shadow-lg border border-black/10 select-none"
          style={{ color: C.forestGreen }}
          animate={isDragging ? { scale: 1.15, boxShadow: '0 0 20px rgba(184,150,108,0.4)' } : { scale: 1, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <span className="text-[11px] font-bold tracking-tight select-none">↔</span>
        </motion.div>
      </div>

      {/* Range input */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
        aria-label="Before after slider"
      />
    </motion.div>
  );
}
