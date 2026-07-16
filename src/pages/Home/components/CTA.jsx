import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBooking } from '../../../components/BookingContext';
import ScrollReveal from '../../../components/ScrollReveal';

const C = {
  creamBg:     'var(--color-cream-bg)',
  creamCard:   'var(--color-cream-card)',
  forestGreen: 'var(--color-forest-green)',
  gold:        'var(--color-gold-accent)',
  serif:       'var(--font-serif-elegant)',
  sans:        'var(--font-sans-premium)',
};

export default function CTASection() {
  const { openBooking } = useBooking();
  const [content, setContent] = useState({
    clinic_phone: '+91 (0) 40 2345 6789',
    clinic_email: 'contact@drpopuri.com',
  });

  useEffect(() => {
    fetch('/api/content')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Failed');
      })
      .then(data => {
        if (data && data.clinic_phone) setContent(prev => ({ ...prev, ...data }));
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-16 px-6 sm:px-8 lg:px-16" style={{ backgroundColor: C.creamBg, fontFamily: C.sans }}>
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="relative">
            {/* Glowing orb behind card */}
            <motion.div
              className="absolute inset-0 rounded-[2.5rem] pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              className="rounded-[2.5rem] p-12 text-center space-y-6 shadow-sm animate-border-shimmer relative overflow-hidden"
              style={{ backgroundColor: C.creamCard, border: '1px solid rgba(4,35,30,0.06)' }}
              whileHover={{ boxShadow: '0 20px 50px -12px rgba(4,35,30,0.1)' }}
            >
              {/* Inner shimmer sweep */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(105deg, transparent 20%, rgba(212,175,55,0.06) 50%, transparent 80%)',
                }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
              />

              <h2
                className="text-3xl sm:text-4xl font-normal tracking-wide relative z-10"
                style={{ fontFamily: C.serif, color: C.forestGreen }}
              >
                Begin Your Journey to a Perfect Smile
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-light relative z-10">
                Consult with one of the region's leading prosthodontists for a comprehensive diagnostic evaluation.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                {/* Primary CTA with ping ring */}
                <div className="relative inline-flex items-center justify-center">
                  <span
                    className="absolute inline-flex rounded-full animate-soft-ping"
                    style={{
                      width: '100%', height: '100%',
                      backgroundColor: 'rgba(4,35,30,0.1)',
                    }}
                  />
                  <motion.button
                    onClick={openBooking}
                    className="relative inline-block font-bold py-3.5 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-[10px] tracking-widest uppercase text-white text-center cursor-pointer"
                    style={{ backgroundColor: C.forestGreen }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    SCHEDULE INITIAL CONSULTATION
                  </motion.button>
                </div>

                <a
                  href={`tel:${content.clinic_phone.replace(/\s+/g, '')}`}
                  className="inline-block font-bold py-3.5 px-8 rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 text-[10px] tracking-widest uppercase bg-transparent text-center cursor-pointer"
                  style={{ border: `1px solid ${C.gold}`, color: C.gold }}
                >
                  CALL {content.clinic_phone}
                </a>
              </div>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
