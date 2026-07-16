import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from './BookingContext';

const C = {
  creamBg:     'var(--color-cream-bg)',
  forestGreen: 'var(--color-forest-green)',
  gold:        'var(--color-gold-accent)',
  serif:       'var(--font-serif-elegant)',
  sans:        'var(--font-sans-premium)',
};

export default function Navbar() {
  const { openBooking } = useBooking();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const menuItems = [
    { label: 'CLINICAL PROFILE', href: '/' },
    { label: 'SPECIALTIES',      href: '/specialties' },
    { label: 'IMPLANTOLOGY',     href: '/specialties#implantology' },
    { label: 'CLINICAL GALLERY', href: '/gallery' },
    { label: 'PATIENT RESOURCES',href: '/book#faq' },
  ];

  return (
    <motion.nav
      className="sticky top-0 z-50"
      style={{
        backgroundColor: scrolled ? 'rgba(250,246,240,0.85)' : 'rgba(250,246,240,0.92)',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'blur(16px)',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'blur(16px)',
        borderBottom: '1px solid rgba(4,35,30,0.06)',
        fontFamily: C.sans,
        boxShadow: scrolled
          ? '0 4px 30px -4px rgba(4,35,30,0.12), 0 1px 3px rgba(184,150,108,0.08)'
          : 'none',
        transition: 'background-color 0.4s, backdrop-filter 0.4s, box-shadow 0.4s',
      }}
      initial={false}
      animate={{ paddingTop: scrolled ? 12 : 16, paddingBottom: scrolled ? 12 : 16 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-16 flex justify-between items-center gap-6">
        <motion.div
          className="flex-shrink-0"
          animate={{ scale: scrolled ? 0.95 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/" className="text-xs sm:text-sm font-bold tracking-widest uppercase transition-opacity duration-200 hover:opacity-70" style={{ color: C.forestGreen }}>
            Dr. Chandrika Lakshmi Popuri
          </Link>
        </motion.div>

        <button className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2 z-50" onClick={() => setIsOpen(o => !o)} aria-label="Toggle menu">
          {[0, 1, 2].map(i => (
            <span key={i} className="w-6 h-0.5 rounded transition-all duration-300" style={{ backgroundColor: C.forestGreen, ...(i === 0 && isOpen ? { transform: 'rotate(45deg) translateY(8px)' } : {}), ...(i === 1 && isOpen ? { opacity: 0 } : {}), ...(i === 2 && isOpen ? { transform: 'rotate(-45deg) translateY(-8px)' } : {}) }} />
          ))}
        </button>

        <ul className="hidden md:flex gap-8 lg:gap-10 flex-1 justify-center">
          {menuItems.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link
                to={item.href}
                className="block py-1 font-bold text-[11px] tracking-widest uppercase transition-all duration-300 hover:text-[var(--color-gold-accent)] hover:tracking-[0.2em] relative group"
                style={{ color: 'rgba(4,35,30,0.80)' }}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" style={{ backgroundColor: 'var(--color-gold-accent)' }} />
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="hidden md:block flex-shrink-0">
          <motion.button
            onClick={openBooking}
            className="inline-block font-bold py-2.5 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-[11px] tracking-widest uppercase text-white text-center cursor-pointer"
            style={{
              backgroundColor: C.forestGreen,
              boxShadow: '0 4px 15px -3px rgba(4,35,30,0.3)',
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            BOOK CONSULTATION
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ul className="px-6 py-4 space-y-1" style={{ borderBottom: '1px solid rgba(4,35,30,0.08)', backgroundColor: 'rgba(250,246,240,0.97)' }}>
              {menuItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link to={item.href} className="block px-2 py-3 font-bold text-[11px] tracking-widest uppercase transition-colors duration-200 hover:text-[var(--color-gold-accent)]" style={{ color: 'rgba(4,35,30,0.80)', borderBottom: '1px solid rgba(4,35,30,0.06)' }} onClick={() => setIsOpen(false)}>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
              <li className="pt-2 pb-1">
                <motion.button
                  onClick={() => { openBooking(); setIsOpen(false); }}
                  className="block w-full font-bold py-3 px-6 rounded-full text-[11px] tracking-widest uppercase text-white text-center cursor-pointer"
                  style={{ backgroundColor: C.forestGreen }}
                >
                  BOOK CONSULTATION
                </motion.button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
