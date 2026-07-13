import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import profileImgFallback from '../../../assets/profile.jpeg';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function HeroPage() {
  const [content, setContent] = useState({
    hero_badge: 'BOARD CERTIFIED PROSTHODONTIST',
    hero_title_left: 'Precision Restorative Care for a ',
    hero_title_gold: 'Lifetime of',
    hero_title_right: 'Smiles.',
    hero_desc: 'Specializing in advanced prosthodontics and implantology to restore function and aesthetic perfection through clinically-driven surgical precision.',
    hero_profile_img: '',
    hero_badge_title: 'MDS PROSTHODONTICS',
    hero_badge_desc: 'Precision Certified Specialist',
  });

  useEffect(() => {
    fetch('/api/content')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Failed to load content');
      })
      .then(data => {
        if (data && data.hero_badge) {
          setContent(data);
        }
      })
      .catch(err => console.error('Error fetching hero content:', err));
  }, []);

  const imageSrc = content.hero_profile_img || profileImgFallback;

  return (
    <section
      className="pt-20 pb-28 px-6 sm:px-8 lg:px-16 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-cream-bg)', fontFamily: 'var(--font-sans-premium)' }}
    >
      {/* Ambient background orbs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(184,150,108,0.3), transparent)' }}
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(4,35,30,0.2), transparent)' }}
        animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Content */}
          <motion.div
            className="lg:col-span-7 space-y-8"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-[10px] font-bold px-4 py-2 rounded-full tracking-widest uppercase shadow-sm border"
              style={{ background: '#fff', borderColor: 'rgba(4,35,30,0.12)', color: 'var(--color-forest-green)' }}
            >
              {content.hero_badge}
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-[56px] font-normal leading-tight tracking-wide"
              style={{ fontFamily: 'var(--font-serif-elegant)', color: 'var(--color-forest-green)' }}
            >
              {content.hero_title_left}
              <span style={{ color: 'var(--color-gold-accent)', fontStyle: 'italic' }}>
                {content.hero_title_gold}
              </span>
              <br />
              {content.hero_title_right}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-lg font-light"
            >
              {content.hero_desc}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/book"
                className="font-bold py-3.5 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-[11px] tracking-widest uppercase text-white text-center cursor-pointer"
                style={{ backgroundColor: 'var(--color-forest-green)' }}
              >
                BOOK A CONSULTATION
              </Link>
              <Link
                to="/gallery"
                className="font-bold py-3.5 px-8 rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 text-[11px] tracking-widest uppercase bg-transparent text-center cursor-pointer group"
                style={{ border: '1px solid var(--color-gold-accent)', color: 'var(--color-gold-accent)' }}
              >
                <span className="group-hover:text-white transition-colors duration-300">VIEW SUCCESS STORIES</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative max-w-md mx-auto">
              <motion.div
                className="absolute inset-0 rounded-[2.5rem] shadow-xl"
                style={{ backgroundColor: 'var(--color-forest-green)' }}
                initial={{ x: 12, y: 12 }}
                animate={{ x: 12, y: 12 }}
                whileHover={{ x: 16, y: 16 }}
                transition={{ duration: 0.4 }}
              />

              <div
                className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10"
                style={{ backgroundColor: 'var(--color-cream-card)' }}
              >
                <motion.img
                  src={imageSrc}
                  alt="Dr. Chandrika Lakshmi Popuri"
                  className="w-full h-auto object-cover aspect-[4/5]"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6 }}
                />
              </div>

              <motion.div
                className="absolute -bottom-5 -left-5 z-20 bg-white rounded-2xl shadow-xl p-4 max-w-[260px]"
                style={{ border: '1px solid rgba(184,150,108,0.4)' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                transition={{
                  opacity: { delay: 1, duration: 0.5 },
                  scale: { delay: 1, duration: 0.5 },
                  y: { delay: 1.5, duration: 4, repeat: Infinity, ease: 'easeInOut' }
                }}
              >
                <div className="flex items-start gap-3">
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
                    <h3 className="font-bold text-[11px] tracking-widest uppercase text-left" style={{ color: 'var(--color-forest-green)' }}>
                      {content.hero_badge_title}
                    </h3>
                    <p className="text-gray-500 text-[10px] mt-0.5 leading-tight text-left">{content.hero_badge_desc}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
