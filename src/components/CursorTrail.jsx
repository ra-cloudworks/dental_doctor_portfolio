import { useState, useEffect, useCallback, useRef } from 'react';

const TRAIL_LENGTH = 8;
const TRAIL_INTERVAL = 40;

export default function CursorTrail() {
  const [trails, setTrails] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const idCounter = useRef(0);
  const lastTrailTime = useRef(0);
  const mouseRef = useRef({ x: -100, y: -100 });

  const handleMouseMove = useCallback((e) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
    if (!visible) setVisible(true);

    const now = Date.now();
    if (now - lastTrailTime.current > TRAIL_INTERVAL) {
      lastTrailTime.current = now;
      const id = idCounter.current++;
      setTrails(prev => [
        ...prev.slice(-(TRAIL_LENGTH - 1)),
        { id, x: e.clientX, y: e.clientY, time: now }
      ]);
    }
  }, [visible]);

  useEffect(() => {
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"], .interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setTrails(prev => prev.filter(t => now - t.time < TRAIL_LENGTH * TRAIL_INTERVAL));
    }, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      clearInterval(cleanupInterval);
    };
  }, [handleMouseMove]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {/* Main cursor dot */}
      {/* eslint-disable react-hooks/refs -- imperative ref for 60fps cursor tracking */}
      {visible && (
        <div
          className="cursor-glow"
          style={{
            left: mouseRef.current.x,
            top: mouseRef.current.y,
            width: isHovering ? 48 : 24,
            height: isHovering ? 48 : 24,
            opacity: isHovering ? 0.5 : 0.3,
          }}
        />
      )}
      {/* eslint-enable react-hooks/refs */}
      {/* Trail particles */}
      {trails.map((trail) => {
        // eslint-disable-next-line react-hooks/purity -- intentional: trail age computed at render time for smooth animation
        const age = (Date.now() - trail.time) / (TRAIL_LENGTH * TRAIL_INTERVAL);
        const opacity = (1 - age) * 0.3;
        const size = (1 - age) * (isHovering ? 16 : 10);
        return (
          <div
            key={trail.id}
            className="cursor-glow"
            style={{
              left: trail.x,
              top: trail.y,
              width: size,
              height: size,
              opacity,
              transition: 'opacity 0.2s',
            }}
          />
        );
      })}
    </div>
  );
}
