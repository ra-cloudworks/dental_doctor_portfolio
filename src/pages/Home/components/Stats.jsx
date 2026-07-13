import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../../../components/ScrollReveal';
import AnimatedCounter from '../../../components/AnimatedCounter';

const fallbackStats = [
  { value: '500+', label: 'Restored Smiles' },
  { value: '15+',  label: 'Years Experience' },
  { value: '2.5k', label: 'Dental Implants' },
  { value: '100%', label: 'Clinical Precision' },
];

export default function StatsSection() {
  const [stats, setStats] = useState(fallbackStats);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Failed to load stats');
      })
      .then(data => {
        if (data && data.length > 0) {
          setStats(data);
        }
      })
      .catch(err => console.error('Error fetching stats:', err));
  }, []);

  return (
    <section
      className="py-14 px-6 sm:px-8 lg:px-16"
      style={{
        backgroundColor: 'var(--color-forest-green)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        fontFamily: 'var(--font-sans-premium)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
          {stats.map((stat, index) => (
            <ScrollReveal key={index} delay={index * 0.12} y={20}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="py-2"
              >
                <div
                  className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight leading-none mb-3"
                  style={{ color: 'var(--color-gold-accent)' }}
                >
                  <AnimatedCounter target={stat.value} duration={2000} />
                </div>
                <div className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  {stat.label}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
