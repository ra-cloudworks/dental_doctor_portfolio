import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../../../components/BookingContext';
import profileImgFallback from '../../../assets/d_image.png';
import heroBg from '../../../assets/screen.png';

/* ─────────────────────────────────────────────────────────────────
   TOOTH SVG PATH (molar outline)
───────────────────────────────────────────────────────────────── */
const TOOTH =
  'M50,18 C60,10 76,14 79,28 C82,40 76,54 73,62 C70,70 69,80 67,86 ' +
  'C66,89 63,89 62,85 C60,77 57,67 50,63 C43,67 40,77 38,85 ' +
  'C37,89 34,89 33,86 C31,80 30,70 27,62 C24,54 18,40 21,28 C24,14 40,10 50,18 Z';

/* ─────────────────────────────────────────────────────────────────
   ANIMATION CONSTANTS
───────────────────────────────────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1];   // expo out

const overlay   = { hidden: { opacity: 1 }, show: { opacity: 0, transition: { duration: 1.1, ease: EASE, delay: 0.2 } } };
const logoAnim  = { hidden: { scale: 3, rotateY: -180, opacity: 0, y: -60 },
                    show:   { scale: 1, rotateY: 0,    opacity: 1, y: 0,
                              transition: { duration: 1.2, ease: EASE, delay: 0.9 } } };
const badgeAnim = { hidden: { opacity: 0, y: -16 },
                    show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 1.5 } } };
const lineAnim  = (delay) => ({
  hidden: { opacity: 0, y: 40, skewY: 4 },
  show:   { opacity: 1, y: 0,  skewY: 0, transition: { duration: 0.8, ease: EASE, delay } },
});
const descAnim  = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 1, delay: 2.1 } } };
const ctaAnim   = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 2.35 } } };
const imgAnim   = { hidden: { clipPath: 'inset(0 100% 0 0)', x: 40, opacity: 0 },
                    show:   { clipPath: 'inset(0 0% 0 0)',   x: 0,  opacity: 1,
                              transition: { duration: 1.1, ease: EASE, delay: 1.7 } } };
const badgePop  = { hidden: { scale: 0, opacity: 0 },
                    show:   { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 18, delay: 2.5 } } };
const statAnim  = (i) => ({
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: 2.6 + i * 0.12 } },
});

/* ─────────────────────────────────────────────────────────────────
   ORBIT RING (decorative circles around logo)
───────────────────────────────────────────────────────────────── */
function OrbitRing({ radius, dur, delay, dotSize = 4, color = '#D4AF37' }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: radius * 2, height: radius * 2,
        borderRadius: '50%',
        border: `1px solid rgba(212,175,55,0.12)`,
        top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: dur, repeat: Infinity, ease: 'linear', delay }}
    >
      {/* dot on ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: dotSize, height: dotSize,
          background: color,
          top: -dotSize / 2, left: '50%',
          marginLeft: -dotSize / 2,
          boxShadow: `0 0 8px 2px ${color}55`,
        }}
        animate={{ scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FLOATING PARTICLES around logo
───────────────────────────────────────────────────────────────── */
const SPARKS = [
  { angle: 30,  r: 85,  dur: 3.2, delay: 2.8  },
  { angle: 105, r: 95,  dur: 4.0, delay: 3.1  },
  { angle: 200, r: 80,  dur: 3.6, delay: 3.4  },
  { angle: 280, r: 100, dur: 4.4, delay: 2.6  },
  { angle: 155, r: 90,  dur: 3.8, delay: 3.6  },
  { angle: 340, r: 88,  dur: 3.0, delay: 2.9  },
];

function Sparks() {
  return (
    <>
      {SPARKS.map((s, i) => {
        const rad = (s.angle * Math.PI) / 180;
        const x = Math.cos(rad) * s.r;
        const y = Math.sin(rad) * s.r;
        return (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{ background: '#D4AF37', left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.4, 0.8, 1.2, 0], opacity: [0, 1, 0.7, 1, 0], y: [0, -12, 0] }}
            transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        );
      })}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────── */
export default function HeroPage() {
  const { openBooking } = useBooking();
  const [content, setContent] = useState({
    hero_badge:       'BOARD CERTIFIED PROSTHODONTIST',
    hero_title_left:  'Precision Restorative',
    hero_title_gold:  'Care for a Lifetime',
    hero_title_right: 'of Smiles.',
    hero_desc:        'Specializing in advanced prosthodontics and implantology to restore function and aesthetic perfection through clinically-driven surgical precision.',
    hero_profile_img: '',
    hero_badge_title: 'MDS PROSTHODONTICS',
    hero_badge_desc:  'Precision Certified Specialist',
  });

  const [heroStats, setHeroStats] = useState([
    { value: '500+', label: 'Smiles Restored' },
    { value: '15+',  label: 'Years Experience' },
    { value: '2.5k', label: 'Implants Placed'  },
  ]);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch('/api/content')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => d?.hero_badge && setContent(d))
      .catch(() => {});

    fetch('/api/stats')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => {
        if (Array.isArray(d) && d.length > 0) {
          setHeroStats(d.slice(0, 3).map(s => ({ value: s.value, label: s.label })));
        }
      })
      .catch(() => {});

    // Short delay so route transition completes before our animation fires
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  const imageSrc = content.hero_profile_img || profileImgFallback;

  return (
    <section
      className="relative min-h-screen w-full flex items-center overflow-hidden pt-20 pb-16 px-6 sm:px-8 lg:px-16"
      style={{ backgroundColor: 'var(--color-cream-bg)', fontFamily: 'var(--font-sans-premium)' }}
    >
      {/* ── BACKGROUND IMAGE ─────────────────────────────────── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ backgroundColor: 'rgba(250,246,240,0.50)' }}
      />

      {/* ── CINEMATIC DARK CURTAIN REVEAL ──────────────────────── */}
      <AnimatePresence>
        {ready && (
          <motion.div
            key="curtain"
            className="absolute inset-0 z-50 pointer-events-none"
            style={{ backgroundColor: 'var(--color-forest-green)' }}
            variants={overlay}
            initial="hidden"
            animate="show"
          />
        )}
      </AnimatePresence>

      {/* ── AMBIENT GLOW ORBS ──────────────────────────────────── */}
      <motion.div
        className="absolute top-10 left-0 w-[520px] h-[520px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.10), transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(4,35,30,0.07), transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── BACKGROUND DIAGONAL LINES (subtle grid) ──────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 60px,
            rgba(184,150,108,0.025) 60px,
            rgba(184,150,108,0.025) 61px
          )`,
        }}
      />

      {/* ── MAIN GRID ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

          {/* ╔══════════════════════════════╗
              ║  LEFT COLUMN — Text Content  ║
              ╚══════════════════════════════╝ */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* LOGO + BADGE ROW */}
            <div className="flex items-center gap-5">
              {/* Animated gold tooth logo */}
              <motion.div
                className="relative flex-shrink-0"
                style={{ width: 72, height: 72, perspective: 600 }}
                variants={logoAnim}
                initial="hidden"
                animate={ready ? 'show' : 'hidden'}
              >
                {/* Orbit rings */}
                <OrbitRing radius={52} dur={9}  delay={0} dotSize={4} />
                <OrbitRing radius={40} dur={6}  delay={3} dotSize={3} color="#B8966C" />

                {/* Spark particles */}
                <Sparks />

                {/* Pulsing glow bg */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.25), transparent 65%)' }}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                />

                {/* Tooth SVG */}
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full relative z-10">
                  <motion.path
                    d={TOOTH}
                    stroke="url(#hg)"
                    strokeWidth="3"
                    fill="rgba(212,175,55,0.06)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={ready ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 1.6, ease: 'easeInOut', delay: 1.2 }}
                  />
                  {/* Crown shimmer */}
                  <motion.path
                    d="M33,38 C42,35 58,35 67,38"
                    stroke="url(#hs)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    initial={{ opacity: 0 }}
                    animate={ready ? { opacity: [0, 1, 0] } : {}}
                    transition={{ duration: 1.8, delay: 2.8, repeat: Infinity, repeatDelay: 4 }}
                  />
                  <defs>
                    <linearGradient id="hg" x1="10%" y1="0%" x2="90%" y2="100%">
                      <stop offset="0%"   stopColor="#F8E0B8" />
                      <stop offset="45%"  stopColor="#D4AF37" />
                      <stop offset="100%" stopColor="#9A7B1C" />
                    </linearGradient>
                    <linearGradient id="hs" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%"   stopColor="rgba(255,236,160,0)"   />
                      <stop offset="50%"  stopColor="rgba(255,236,160,0.9)" />
                      <stop offset="100%" stopColor="rgba(255,236,160,0)"   />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Hover tilt wrapper */}
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ rotateY: 20, rotateX: -10 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                />
              </motion.div>

              {/* Badge pill */}
              <motion.div
                className="flex flex-col gap-1"
                variants={badgeAnim}
                initial="hidden"
                animate={ready ? 'show' : 'hidden'}
              >
                <span
                  className="inline-block text-[10px] font-bold px-4 py-2 rounded-full tracking-widest uppercase shadow-sm border animate-border-shimmer"
                  style={{ background: '#fff', borderColor: 'rgba(4,35,30,0.12)', color: 'var(--color-forest-green)' }}
                >
                  {content.hero_badge}
                </span>
              </motion.div>
            </div>

            {/* HEADLINE — line by line reveal */}
            <div className="overflow-hidden space-y-1">
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-[58px] font-normal leading-tight tracking-wide block"
                style={{ fontFamily: 'var(--font-serif-elegant)', color: 'var(--color-forest-green)' }}
                variants={lineAnim(1.6)}
                initial="hidden"
                animate={ready ? 'show' : 'hidden'}
              >
                {content.hero_title_left}
              </motion.h1>
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-[58px] font-normal leading-tight tracking-wide block italic"
                style={{ fontFamily: 'var(--font-serif-elegant)', color: 'var(--color-gold-accent)' }}
                variants={lineAnim(1.82)}
                initial="hidden"
                animate={ready ? 'show' : 'hidden'}
              >
                {content.hero_title_gold}
              </motion.h1>
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-[58px] font-normal leading-tight tracking-wide block"
                style={{ fontFamily: 'var(--font-serif-elegant)', color: 'var(--color-forest-green)' }}
                variants={lineAnim(2.04)}
                initial="hidden"
                animate={ready ? 'show' : 'hidden'}
              >
                {content.hero_title_right}
              </motion.h1>
            </div>

            {/* DESCRIPTION */}
            <motion.p
              className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-lg font-light"
              variants={descAnim}
              initial="hidden"
              animate={ready ? 'show' : 'hidden'}
            >
              {content.hero_desc}
            </motion.p>

            {/* CTA BUTTONS */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-1"
              variants={ctaAnim}
              initial="hidden"
              animate={ready ? 'show' : 'hidden'}
            >
              {/* Primary */}
              <div className="relative inline-flex">
                <span className="absolute inset-0 rounded-full animate-soft-ping" style={{ background: 'rgba(4,35,30,0.08)' }} />
                <motion.button
                  onClick={openBooking}
                  className="relative font-bold py-3.5 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-[11px] tracking-widest uppercase text-white text-center cursor-pointer"
                  style={{ backgroundColor: 'var(--color-forest-green)' }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  BOOK A CONSULTATION
                </motion.button>
              </div>

              {/* Secondary */}
              <Link
                to="/gallery"
                className="font-bold py-3.5 px-8 rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 text-[11px] tracking-widest uppercase bg-transparent text-center group"
                style={{ border: '1px solid var(--color-gold-accent)', color: 'var(--color-gold-accent)' }}
              >
                <span className="group-hover:opacity-70 transition-opacity duration-300">VIEW SUCCESS STORIES</span>
              </Link>
            </motion.div>

            {/* MINI STATS ROW */}
            <motion.div
              className="flex gap-8 pt-4 border-t"
              style={{ borderColor: 'rgba(4,35,30,0.08)' }}
              initial="hidden"
              animate={ready ? 'show' : 'hidden'}
            >
              {heroStats.map((s, i) => (
                <motion.div key={i} variants={statAnim(i)} className="text-left">
                  <div
                    className="text-2xl font-bold tracking-tight"
                    style={{ fontFamily: 'var(--font-serif-elegant)', color: 'var(--color-gold-accent)' }}
                  >
                    {s.value}
                  </div>
                  <div className="text-[10px] font-bold tracking-widest uppercase mt-0.5" style={{ color: 'rgba(4,35,30,0.45)' }}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>

          {/* ╔══════════════════════════════╗
              ║  RIGHT COLUMN — Doctor Card  ║
              ╚══════════════════════════════╝ */}
          <motion.div
            className="lg:col-span-5 relative"
            variants={imgAnim}
            initial="hidden"
            animate={ready ? 'show' : 'hidden'}
          >
            <div className="relative max-w-md mx-auto">

              {/* Decorative corner arcs */}
              <motion.div
                className="absolute -top-6 -right-6 w-32 h-32 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              >
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full opacity-20">
                  <path d="M10,50 A40,40 0 0,1 50,10" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 4" />
                  <path d="M50,10 A40,40 0 0,1 90,50" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2 6" />
                </svg>
              </motion.div>

              {/* Forest-green shadow slab */}
              <motion.div
                className="absolute inset-0 rounded-[2.5rem] shadow-2xl"
                style={{ backgroundColor: 'var(--color-forest-green)' }}
                initial={{ x: 12, y: 12 }}
                animate={{ x: 12, y: 12 }}
                whileHover={{ x: 18, y: 18 }}
                transition={{ duration: 0.5 }}
              />

              {/* Photo frame */}
              <motion.div
                className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl"
                style={{ backgroundColor: 'var(--color-cream-card)', border: '1px solid rgba(255,255,255,0.1)' }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.5 }}
              >
                <motion.img
                  src={imageSrc}
                  alt="Dr. Chandrika Lakshmi Popuri"
                  className="w-full h-auto object-cover aspect-[4/5]"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.7 }}
                />

                {/* Shimmer overlay on image */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, transparent 30%, rgba(212,175,55,0.07) 50%, transparent 70%)',
                  }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 6, ease: 'easeInOut', delay: 3 }}
                />
              </motion.div>

              {/* Floating credential badge */}
              <motion.div
                className="absolute -bottom-5 -left-5 z-20 bg-white rounded-2xl shadow-xl p-4 max-w-[260px] animate-border-shimmer"
                style={{ border: '1px solid rgba(184,150,108,0.4)' }}
                variants={badgePop}
                initial="hidden"
                animate={ready ? 'show' : 'hidden'}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full"
                    style={{ background: 'rgba(184,150,108,0.12)', border: '1px solid rgba(184,150,108,0.4)', color: 'var(--color-gold-accent)' }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[11px] tracking-widest uppercase" style={{ color: 'var(--color-forest-green)' }}>
                      {content.hero_badge_title}
                    </h3>
                    <p className="text-gray-500 text-[10px] mt-0.5 leading-tight">{content.hero_badge_desc}</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Top-right experience bubble */}
              <motion.div
                className="absolute -top-4 -right-4 z-20 bg-white rounded-2xl shadow-lg px-4 py-3"
                style={{ border: '1px solid rgba(212,175,55,0.35)' }}
                variants={badgePop}
                initial="hidden"
                animate={ready ? 'show' : 'hidden'}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 3.5 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-serif-elegant)', color: 'var(--color-gold-accent)' }}>
                    15+
                  </div>
                  <div className="text-[9px] font-bold tracking-widest uppercase" style={{ color: 'rgba(4,35,30,0.55)' }}>
                    Years Expert
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* ── BOTTOM SCROLL HINT ─────────────────────────────────── */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none select-none"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 3.2, duration: 0.8 }}
      >
        <div className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1" style={{ borderColor: 'rgba(184,150,108,0.5)' }}>
          <motion.div
            className="w-0.5 h-2 rounded-full"
            style={{ backgroundColor: '#B8966C' }}
            animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase" style={{ color: 'rgba(184,150,108,0.6)' }}>
          Scroll
        </span>
      </motion.div>

    </section>
  );
}
