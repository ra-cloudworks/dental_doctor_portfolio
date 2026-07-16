/**
 * GlobalBackground.jsx — Enhanced with mouse-reactive orbs, film grain,
 * diagonal light rays, animated mesh gradient, shimmer, waves, teeth, particles.
 */
import { useEffect, useRef, useState, memo, useCallback } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

const TOOTH_PATH =
  'M50,18 C60,10 76,14 79,28 C82,40 76,54 73,62 C70,70 69,80 67,86 ' +
  'C66,89 63,89 62,85 C60,77 57,67 50,63 C43,67 40,77 38,85 ' +
  'C37,89 34,89 33,86 C31,80 30,70 27,62 C24,54 18,40 21,28 ' +
  'C24,14 40,10 50,18 Z';

const TEETH = [
  { id: 0, x: '8%',  y: '18%', size: 28, dur: 22, delay: 0,   rot: 15,  opacity: 0.045 },
  { id: 1, x: '85%', y: '12%', size: 22, dur: 28, delay: 4,   rot: -20, opacity: 0.035 },
  { id: 2, x: '75%', y: '72%', size: 34, dur: 20, delay: 7,   rot: 30,  opacity: 0.05  },
  { id: 3, x: '18%', y: '78%', size: 20, dur: 25, delay: 2,   rot: -10, opacity: 0.04  },
  { id: 4, x: '50%', y: '8%',  size: 18, dur: 30, delay: 10,  rot: 45,  opacity: 0.03  },
  { id: 5, x: '92%', y: '45%', size: 26, dur: 18, delay: 5,   rot: -35, opacity: 0.04  },
  { id: 6, x: '5%',  y: '50%', size: 16, dur: 26, delay: 14,  rot: 60,  opacity: 0.03  },
  { id: 7, x: '62%', y: '88%', size: 24, dur: 23, delay: 8,   rot: -15, opacity: 0.045 },
];

const PARTICLES = [
  { id: 0,  x: '10%', y: '30%', dur: 14, delay: 0   },
  { id: 1,  x: '22%', y: '65%', dur: 18, delay: 2   },
  { id: 2,  x: '38%', y: '20%', dur: 12, delay: 4   },
  { id: 3,  x: '55%', y: '50%', dur: 20, delay: 6   },
  { id: 4,  x: '70%', y: '35%', dur: 16, delay: 1   },
  { id: 5,  x: '82%', y: '80%', dur: 22, delay: 9   },
  { id: 6,  x: '45%', y: '90%', dur: 15, delay: 3   },
  { id: 7,  x: '15%', y: '85%', dur: 19, delay: 7   },
  { id: 8,  x: '90%', y: '25%', dur: 13, delay: 5   },
  { id: 9,  x: '30%', y: '45%', dur: 17, delay: 11  },
  { id: 10, x: '68%', y: '15%', dur: 24, delay: 13  },
  { id: 11, x: '5%',  y: '10%', dur: 21, delay: 8   },
];

const ORBS = [
  { id: 0, x: '10%',  y: '20%', w: 420, h: 420, dur: 12, delay: 0,  color: 'rgba(212,175,55,0.07)' },
  { id: 1, x: '70%',  y: '60%', w: 520, h: 520, dur: 16, delay: 4,  color: 'rgba(184,150,108,0.06)' },
  { id: 2, x: '40%',  y: '80%', w: 300, h: 300, dur: 10, delay: 7,  color: 'rgba(212,175,55,0.05)' },
];

const WAVES = [
  { id: 0, stroke: 'url(#bg_wg1)', width: 1.4,
    a: 'M -80,450 C 200,390 450,580 750,440 C 1050,300 1280,520 1600,470',
    b: 'M -80,430 C 220,410 430,540 780,460 C 1080,330 1260,500 1600,450',
    dur: 18, delay: 0 },
  { id: 1, stroke: 'url(#bg_wg2)', width: 1.0,
    a: 'M -80,310 C 180,260 520,420 820,300 C 1120,180 1300,380 1600,330',
    b: 'M -80,330 C 200,280 500,400 840,320 C 1100,200 1280,360 1600,310',
    dur: 24, delay: 6 },
  { id: 2, stroke: 'url(#bg_wg1)', width: 0.7,
    a: 'M -80,580 C 300,620 600,420 950,570 C 1150,660 1340,500 1600,555',
    b: 'M -80,560 C 320,640 620,440 930,550 C 1170,640 1360,520 1600,535',
    dur: 30, delay: 3 },
  { id: 3, stroke: 'url(#bg_wg2)', width: 0.5,
    a: 'M -80,200 C 260,160 500,320 820,200 C 1100,80 1280,250 1600,200',
    b: 'M -80,220 C 240,180 520,300 800,220 C 1080,100 1260,270 1600,220',
    dur: 36, delay: 10 },
  { id: 4, stroke: 'url(#bg_wg1)', width: 0.6,
    a: 'M -80,700 C 200,720 500,600 800,680 C 1100,760 1300,650 1600,700',
    b: 'M -80,680 C 220,700 480,620 820,660 C 1120,740 1280,630 1600,680',
    dur: 28, delay: 14 },
];

function ShimmerSweep() {
  const ctrl = useAnimationControls();
  useEffect(() => {
    const loop = async () => {
      while (true) {
        await new Promise(r => setTimeout(r, 8000));
        await ctrl.start({
          x: ['-100%', '120%'],
          opacity: [0, 0.12, 0.12, 0],
          transition: { duration: 2.2, ease: 'easeInOut' },
        });
      }
    };
    loop();
  }, [ctrl]);

  return (
    <motion.div
      animate={ctrl}
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'linear-gradient(105deg, transparent 30%, rgba(212,175,55,0.18) 50%, transparent 70%)',
        zIndex: 0,
      }}
    />
  );
}

function HexMesh() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(184,150,108,0.06) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        zIndex: 0,
      }}
      animate={{ scale: [1, 1.04, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

function FilmGrain() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '128px 128px',
        animation: 'grain 8s steps(10) infinite',
        zIndex: 5,
      }}
    />
  );
}

function DiagonalLightRays() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {[1, 2, 3].map(i => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: '2px',
            height: '150%',
            background: `linear-gradient(to bottom, transparent, rgba(212,175,55,${0.04 + i * 0.01}), transparent)`,
            left: `${20 + i * 25}%`,
            top: '-25%',
            transform: `rotate(${15 + i * 5}deg)`,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            x: [0, 20 * i, -10 * i, 0],
          }}
          transition={{
            duration: 10 + i * 4,
            delay: i * 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

function MouseReactiveOrbs() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const reactiveOrbs = [
    { x: 15, y: 25, w: 350, color: 'rgba(184,150,108,0.06)', factor: 30 },
    { x: 75, y: 55, w: 400, color: 'rgba(212,175,55,0.05)', factor: -25 },
    { x: 50, y: 80, w: 280, color: 'rgba(184,150,108,0.04)', factor: 20 },
  ];

  return (
    <>
      {reactiveOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{
            left: `${orb.x + (mouse.x - 0.5) * orb.factor}%`,
            top: `${orb.y + (mouse.y - 0.5) * orb.factor}%`,
            width: orb.w,
            height: orb.w,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            transition: 'left 1.5s cubic-bezier(0.25, 0.1, 0.25, 1), top 1.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        />
      ))}
    </>
  );
}

function GlobalBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <HexMesh />
      <ShimmerSweep />
      <DiagonalLightRays />
      <MouseReactiveOrbs />
      <FilmGrain />

      {/* Static animated orbs */}
      {ORBS.map(orb => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full blur-3xl"
          style={{
            left: orb.x, top: orb.y,
            width: orb.w, height: orb.h,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.5, 1, 0.5],
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
          }}
          transition={{ duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Animated SVG waves */}
      <svg className="absolute w-full h-full" viewBox="0 0 1440 800" fill="none"
        preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.65 }}>
        {WAVES.map(w => (
          <motion.path key={w.id} stroke={w.stroke} strokeWidth={w.width} d={w.a}
            animate={{ d: [w.a, w.b, w.a] }}
            transition={{ duration: w.dur, delay: w.delay, repeat: Infinity, ease: 'easeInOut' }} />
        ))}
        <defs>
          <linearGradient id="bg_wg1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgba(212,175,55,0)" />
            <stop offset="20%"  stopColor="rgba(212,175,55,0.22)" />
            <stop offset="60%"  stopColor="rgba(184,150,108,0.30)" />
            <stop offset="100%" stopColor="rgba(212,175,55,0)" />
          </linearGradient>
          <linearGradient id="bg_wg2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgba(184,150,108,0)" />
            <stop offset="35%"  stopColor="rgba(184,150,108,0.15)" />
            <stop offset="75%"  stopColor="rgba(212,175,55,0.20)" />
            <stop offset="100%" stopColor="rgba(184,150,108,0)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating teeth */}
      {TEETH.map(t => (
        <motion.div key={t.id} className="absolute pointer-events-none"
          style={{ left: t.x, top: t.y, width: t.size, height: t.size, opacity: t.opacity, transform: `rotate(${t.rot}deg)` }}
          animate={{
            y: [0, -22, 8, -14, 0],
            x: [0, 10, -8, 6, 0],
            rotate: [t.rot, t.rot + 8, t.rot - 6, t.rot + 4, t.rot],
            opacity: [t.opacity, t.opacity * 1.8, t.opacity, t.opacity * 1.4, t.opacity],
          }}
          transition={{ duration: t.dur, delay: t.delay, repeat: Infinity, ease: 'easeInOut' }}>
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d={TOOTH_PATH} stroke="url(#bg_tooth_g)" strokeWidth="4" fill="url(#bg_tooth_fill)"
              strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="bg_tooth_g" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#9A7B1C" />
              </linearGradient>
              <linearGradient id="bg_tooth_fill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(212,175,55,0.06)" />
                <stop offset="100%" stopColor="rgba(184,150,108,0.03)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}

      {/* Particles */}
      {PARTICLES.map(p => (
        <motion.div key={p.id} className="absolute rounded-full"
          style={{ left: p.x, top: p.y, width: 3, height: 3, backgroundColor: '#D4AF37' }}
          animate={{
            y: [0, -30, 15, -20, 0],
            x: [0, 12, -8, 18, 0],
            opacity: [0, 0.35, 0.18, 0.4, 0],
            scale: [0.8, 1.4, 0.9, 1.2, 0.8],
          }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export default memo(GlobalBackground);
