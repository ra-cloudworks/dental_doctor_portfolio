import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
          <motion.div
            className="rounded-[2.5rem] p-12 text-center space-y-6 shadow-sm"
            style={{ backgroundColor: C.creamCard, border: '1px solid rgba(4,35,30,0.06)' }}
            whileHover={{ boxShadow: '0 20px 50px -12px rgba(4,35,30,0.1)' }}
          >
            <h2 className="text-3xl sm:text-4xl font-normal tracking-wide" style={{ fontFamily: C.serif, color: C.forestGreen }}>
              Begin Your Journey to a Perfect Smile
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-light">
              Consult with one of the region's leading prosthodontists for a comprehensive diagnostic evaluation.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book" className="inline-block font-bold py-3.5 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-[10px] tracking-widest uppercase text-white text-center cursor-pointer" style={{ backgroundColor: C.forestGreen }}>
                SCHEDULE INITIAL CONSULTATION
              </Link>
              <a
                href={`tel:${content.clinic_phone.replace(/\s+/g, '')}`}
                className="inline-block font-bold py-3.5 px-8 rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 text-[10px] tracking-widest uppercase bg-transparent text-center cursor-pointer"
                style={{ border: `1px solid ${C.gold}`, color: C.gold }}
              >
                CALL {content.clinic_phone}
              </a>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
