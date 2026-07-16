import { useEffect, useState } from 'react';
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

const DOT_SIZE = 16;
const LINE_LEFT = 7;

export default function CredentialsSection() {
  const [timelineItems, setTimelineItems] = useState([
    { tag: 'MDS – MASTER OF DENTAL SURGERY (2016)', title: 'Prosthodontics & Crown and Bridge', institution: 'Banasthali Institute of Dental Science and Hospital', details: 'Specialized training in full-mouth rehabilitation and implant-supported restorations.' },
    { tag: 'BDS – BACHELOR OF DENTAL SURGERY (2013)', title: 'Clinical Foundation', institution: 'Uttaranchal Institute of Dental Science and Hospital', details: 'Distinguished academic record laying the foundation for restorative excellence.' },
    { tag: 'AWARD & RECOGNITION', title: 'Best Paper Award 2024', institution: 'National Prosthodontics Conference', details: 'Received for research in advanced restorative techniques and implant protocols.' },
  ]);

  const [content, setContent] = useState({
    commit_title: 'Commitment to Surgical Precision & Lifelong Learning',
    commit_desc: 'Dr. Popuri combines her profound academic background with over 10 years of hands-on clinical experience, including leadership roles at municipal hospitals and national dental clinics, to deliver results that are both functional and biologically sound.',
    commit_badge1_val: 'Top 1%',
    commit_badge1_lbl: 'Fellowship Graduates',
    commit_badge2_val: 'Global',
    commit_badge2_lbl: 'Implantology Fellowship',
  });

  useEffect(() => {
    fetch('/api/timeline')
      .then(res => res.json())
      .then(data => { if (data && data.length > 0) setTimelineItems(data); })
      .catch(err => console.error('Error fetching credentials timeline:', err));

    fetch('/api/content')
      .then(res => res.json())
      .then(data => { if (data && data.commit_title) setContent(prev => ({ ...prev, ...data })); })
      .catch(err => console.error('Error fetching bio commitment settings:', err));
  }, []);

  return (
    <section id="clinical" className="py-24 px-6 sm:px-8 lg:px-16" style={{ backgroundColor: C.creamBg, fontFamily: C.sans, borderBottom: '1px solid rgba(4,35,30,0.06)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left: Timeline */}
          <div className="lg:col-span-7 space-y-8">
            <ScrollReveal>
              <div className="space-y-3 text-left">
                <h2 className="text-3xl sm:text-4xl font-normal tracking-wide" style={{ fontFamily: C.serif, color: C.forestGreen }}>Professional Credentials</h2>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xl font-light">A career defined by academic rigor and a relentless pursuit of surgical excellence.</p>
              </div>
            </ScrollReveal>

            <div className="relative pl-10 pt-2 space-y-10">
              {/* Vertical line — animated draw-in */}
              <motion.div
                className="absolute top-1 bottom-1 rounded-full"
                style={{
                  left: LINE_LEFT,
                  width: 1.5,
                  backgroundColor: 'rgba(4,35,30,0.12)',
                  transformOrigin: 'top',
                }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
              />

              {timelineItems.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.15} direction="left" x={40}>
                  <div className="relative text-left">
                    {/* Dot with glow pulse */}
                    <div
                      className="absolute"
                      style={{
                        left: LINE_LEFT + 1.5 / 2 - DOT_SIZE / 2,
                        top: 2,
                        width: DOT_SIZE,
                        height: DOT_SIZE,
                      }}
                    >
                      {/* Glow ring */}
                      <motion.div
                        className="absolute inset-[-6px] rounded-full"
                        style={{ backgroundColor: 'rgba(184,150,108,0.2)' }}
                        animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full shadow-sm"
                        style={{ backgroundColor: C.gold, border: `3px solid ${C.creamBg}` }}
                        whileInView={{ scale: [0, 1.3, 1] }}
                        transition={{ delay: i * 0.15 + 0.3, duration: 0.5, type: 'spring' }}
                        viewport={{ once: true }}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-[10px] font-bold tracking-widest uppercase" style={{ color: C.gold }}>{item.tag}</div>
                      <h3 className="text-lg sm:text-xl font-normal leading-snug tracking-wide" style={{ fontFamily: C.serif, color: C.forestGreen }}>{item.title}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed max-w-xl">
                        <span className="font-semibold block mb-0.5" style={{ color: 'rgba(4,35,30,0.75)' }}>{item.institution}</span>
                        {item.details}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right: Commitment card — sticky so it stays visible while scrolling the timeline */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={0.3} direction="right" x={40}>
              <div
                className="lg:sticky lg:top-28 rounded-[2rem] p-8 sm:p-10 shadow-md text-left space-y-5"
                style={{ backgroundColor: C.creamCard, border: '1px solid rgba(4,35,30,0.06)' }}
              >
                <motion.div
                  className="w-11 h-11 rounded-full flex items-center justify-center shadow-sm"
                  style={{ background: 'rgba(184,150,108,0.12)', border: '1px solid rgba(184,150,108,0.28)', color: C.gold }}
                  whileInView={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14v6" />
                  </svg>
                </motion.div>

                <h3 className="text-xl sm:text-2xl font-normal tracking-wide leading-snug" style={{ fontFamily: C.serif, color: C.forestGreen }}>{content.commit_title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">{content.commit_desc}</p>

                <div className="grid grid-cols-2 gap-3 pt-5" style={{ borderTop: '1px solid rgba(4,35,30,0.10)' }}>
                  {[{ value: content.commit_badge1_val, label: content.commit_badge1_lbl }, { value: content.commit_badge2_val, label: content.commit_badge2_lbl }].map((b, i) => (
                    <motion.div
                      key={i}
                      className="rounded-2xl p-4 shadow-sm flex flex-col justify-center"
                      style={{ background: '#fff', border: '1px solid rgba(4,35,30,0.06)' }}
                      whileHover={{ y: -3, boxShadow: '0 8px 20px -4px rgba(4,35,30,0.1)' }}
                    >
                      <span className="text-lg font-bold leading-tight" style={{ color: C.gold }}>{b.value}</span>
                      <span className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase mt-1">{b.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
