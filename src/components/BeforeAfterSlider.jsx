import { useState } from 'react';

const C = {
  forestGreen: 'var(--color-forest-green)',
};

export default function BeforeAfterSlider({ beforeSrc, afterSrc, heightClass = 'aspect-[4/3] sm:aspect-[16/10]' }) {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className={`relative overflow-hidden rounded-3xl group shadow-lg ${heightClass}`} style={{ backgroundColor: C.forestGreen }}>
      {/* Before Image (Background) */}
      <img
        src={beforeSrc}
        alt="Before restoration"
        className="w-full h-full object-cover select-none absolute inset-0"
        style={{ filter: 'contrast(0.9) brightness(0.85) sepia(0.15)' }} // Stylize "Before" to simulate a natural pre-restoration shade
      />
      <div className="absolute top-4 left-4 text-white text-[9px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase bg-black/60 backdrop-blur-md z-20 pointer-events-none">
        Before Restoration
      </div>

      {/* After Image (Overlay clipped on the right side) */}
      <img
        src={afterSrc}
        alt="After restoration"
        className="w-full h-full object-cover select-none absolute inset-0"
        style={{
          clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
        }}
      />
      <div
        className="absolute top-4 right-4 text-white text-[9px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase z-20 pointer-events-none transition-opacity duration-300"
        style={{
          backgroundColor: 'rgba(184,150,108,0.95)',
          opacity: sliderPos < 12 ? 0 : 1,
        }}
      >
        After Treatment
      </div>

      {/* Vertical divider line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white z-20 pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        {/* Handle circle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-forest-green flex items-center justify-center shadow-lg border border-black/10 select-none"
          style={{ color: C.forestGreen }}
        >
          <span className="text-[10px] font-bold tracking-tight select-none">↔</span>
        </div>
      </div>

      {/* Hidden range input covering the area for native drag handling */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
        aria-label="Before after slider"
      />
    </div>
  );
}
