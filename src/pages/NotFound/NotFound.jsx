import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: C.creamBg, fontFamily: C.sans }}
    >
      <div className="text-center max-w-lg space-y-8">
        {/* Animated tooth icon */}
        <motion.div
          className="mx-auto"
          style={{ width: 80, height: 80 }}
          initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path
              d={TOOTH}
              stroke={C.gold}
              strokeWidth="2.5"
              fill="rgba(184,150,108,0.08)"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1
            className="text-8xl sm:text-9xl font-normal tracking-tight"
            style={{ fontFamily: C.serif, color: C.forestGreen, opacity: 0.12 }}
          >
            404
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          className="space-y-3 -mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <h2
            className="text-2xl sm:text-3xl font-normal"
            style={{ fontFamily: C.serif, color: C.forestGreen }}
          >
            Page Not Found
          </h2>
          <p className="text-gray-500 text-sm font-light leading-relaxed max-w-md mx-auto">
            The page you are looking for may have been moved, renamed, or does not exist.
            Please check the URL or return to the homepage.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            to="/"
            className="font-bold py-3.5 px-8 rounded-full text-[11px] tracking-widest uppercase text-white text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            style={{ backgroundColor: C.forestGreen }}
          >
            Return Home
          </Link>
          <Link
            to="/book"
            className="font-bold py-3.5 px-8 rounded-full text-[11px] tracking-widest uppercase text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            style={{ border: `1px solid ${C.gold}`, color: C.gold }}
          >
            Book Consultation
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
