import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TextCharReveal from '../../components/TextCharReveal';
import MagneticButton from '../../components/MagneticButton';
import { useBooking } from '../../components/BookingContext';

const C = {
  creamBg:     'var(--color-cream-bg)',
  forestGreen: 'var(--color-forest-green)',
  gold:        'var(--color-gold-accent)',
  serif:       'var(--font-serif-elegant)',
  sans:        'var(--font-sans-premium)',
};

const TOOTH =
  'M50,18 C60,10 76,14 79,28 C82,40 76,54 73,62 C70,70 69,80 67,86 ' +
  'C66,89 63,89 62,85 C60,77 57,67 50,63 C43,67 40,77 38,85 ' +
  'C37,89 34,89 33,86 C31,80 30,70 27,62 C24,54 18,40 21,28 C24,14 40,10 50,18 Z';

const FLOATING_TEETH = [
  { x: '10%', y: '15%', size: 30, dur: 18, delay: 0, rot: 20 },
  { x: '85%', y: '20%', size: 22, dur: 22, delay: 3, rot: -15 },
  { x: '75%', y: '75%', size: 36, dur: 16, delay: 6, rot: 35 },
  { x: '15%', y: '80%', size: 20, dur: 20, delay: 1, rot: -25 },
  { x: '50%', y: '5%',  size: 18, dur: 24, delay: 8, rot: 50 },
  { x: '90%', y: '50%', size: 28, dur: 15, delay: 4, rot: -40 },
];

export default function NotFound() {
  const { openBooking } = useBooking();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{ backgroundColor: C.creamBg, fontFamily: C.sans }}
    >
      {/* Floating background teeth constellation */}
      {FLOATING_TEETH.map((t, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: t.x, top: t.y, width: t.size, height: t.size }}
          animate={{
            y: [0, -18, 5, -12, 0],
            x: [0, 8, -6, 4, 0],
            rotate: [t.rot, t.rot + 10, t.rot - 8, t.rot + 5, t.rot],
            opacity: [0.04, 0.08, 0.04, 0.07, 0.04],
          }}
          transition={{ duration: t.dur, delay: t.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d={TOOTH} stroke={C.gold} strokeWidth="3" fill="rgba(184,150,108,0.05)" strokeLinecap="round" />
          </svg>
        </motion.div>
      ))}

      {/* Ambient glow orbs */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ left: '20%', top: '30%', background: 'radial-gradient(circle, rgba(184,150,108,0.08), transparent 70%)' }}
        animate={{ scale: [1, 1.3, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full blur-3xl pointer-events-none"
        style={{ right: '15%', bottom: '25%', background: 'radial-gradient(circle, rgba(4,35,30,0.05), transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], x: [0, -25, 0], y: [0, 15, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="text-center max-w-lg space-y-8 relative z-10">
        {/* Animated tooth icon with path draw */}
        <motion.div
          className="mx-auto relative"
          style={{ width: 80, height: 80 }}
          initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        >
          {/* Glow ring behind tooth */}
          <motion.div
            className="absolute inset-[-16px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.2), transparent 65%)' }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full relative z-10">
            <motion.path
              d={TOOTH}
              stroke="url(#notfound_gold)"
              strokeWidth="2.5"
              fill="rgba(184,150,108,0.08)"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
            />
            <defs>
              <linearGradient id="notfound_gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F8E0B8" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#9A7B1C" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* 404 number — dramatic 3D reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.8, rotateX: 30 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 18, delay: 0.4 }}
          style={{ perspective: '800px' }}
        >
          <h1
            className="text-[120px] sm:text-[160px] font-normal tracking-tight leading-none select-none"
            style={{
              fontFamily: C.serif,
              color: 'transparent',
              WebkitTextStroke: '2px rgba(4,35,30,0.08)',
              textShadow: '0 4px 40px rgba(184,150,108,0.15)',
            }}
          >
            404
          </h1>
          {/* Shadow number behind */}
          <h1
            className="text-[120px] sm:text-[160px] font-normal tracking-tight leading-none absolute inset-0 select-none -z-10"
            style={{
              fontFamily: C.serif,
              color: 'rgba(4,35,30,0.04)',
              transform: 'translate(4px, 4px)',
            }}
            aria-hidden="true"
          >
            404
          </h1>
        </motion.div>

        {/* Message — character reveal */}
        <div className="space-y-3 -mt-4">
          <TextCharReveal
            text="Page Not Found"
            tag="h2"
            className="text-2xl sm:text-3xl font-normal justify-center"
            style={{ fontFamily: C.serif, color: C.forestGreen }}
            delay={0.7}
            staggerDelay={0.04}
          />
          <motion.p
            className="text-gray-500 text-sm font-light leading-relaxed max-w-md mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            The page you are looking for may have been moved, renamed, or does not exist.
            Please check the URL or return to the homepage.
          </motion.p>
        </div>

        {/* CTA buttons with magnetic effect */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <MagneticButton strength={0.15}>
            <Link
              to="/"
              className="font-bold py-3.5 px-8 rounded-full text-[11px] tracking-widest uppercase text-white text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 inline-flex"
              style={{ backgroundColor: C.forestGreen }}
            >
              Return Home
            </Link>
          </MagneticButton>
          <MagneticButton strength={0.15}>
            <motion.button
              onClick={openBooking}
              className="font-bold py-3.5 px-8 rounded-full text-[11px] tracking-widest uppercase text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
              style={{ border: `1px solid ${C.gold}`, color: C.gold }}
              whileHover={{ backgroundColor: C.gold, color: '#fff' }}
              whileTap={{ scale: 0.97 }}
            >
              Book Consultation
            </motion.button>
          </MagneticButton>
        </motion.div>
      </div>
    </div>
  );
}
