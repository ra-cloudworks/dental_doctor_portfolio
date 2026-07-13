import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollReveal from '../../../components/ScrollReveal';
import beforeAfterImg from '../../../assets/before_after_showcase.png';

const C = {
  forestGreen: 'var(--color-forest-green)',
  gold:        'var(--color-gold-accent)',
  serif:       'var(--font-serif-elegant)',
  sans:        'var(--font-sans-premium)',
};

const fallbackStory = {
  quote: 'The precision of Dr. Popuri\'s work is simply unmatched. After years of discomfort, my full-mouth reconstruction feels exactly like my natural teeth—only better. Her attention to detail gave me my life back.',
  patient_name: 'Rajeswari Kumar',
  patient_role: 'IMPLANT & PROSTHETIC PATIENT',
};

export default function SuccessStories() {
  const [story, setStory] = useState(fallbackStory);

  useEffect(() => {
    fetch('/api/content')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Failed');
      })
      .then(data => {
        if (data) {
          setStory(prev => ({
            ...prev,
            quote: data.story_quote || prev.quote,
            patient_name: data.story_patient_name || prev.patient_name,
            patient_role: data.story_patient_role || prev.patient_role,
          }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 px-6 sm:px-8 lg:px-16 text-left" style={{ backgroundColor: C.forestGreen, fontFamily: C.sans, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-7xl mx-auto">

        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-normal tracking-wide text-white" style={{ fontFamily: C.serif }}>Patient Success Stories</h2>
              <p className="text-gray-300 text-xs sm:text-sm max-w-xl font-light leading-relaxed">Witness the transformations that restored confidence, function, and life.</p>
            </div>
            <div className="flex-shrink-0">
              <Link to="/gallery" className="inline-block font-bold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-md text-[10px] tracking-widest uppercase bg-transparent text-center cursor-pointer group" style={{ border: '1px solid rgba(184,150,108,0.45)', color: C.gold }}>
                <span className="group-hover:text-white transition-colors duration-300">VIEW FULL CLINICAL GALLERY</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          <ScrollReveal delay={0.1} direction="left" x={50} className="lg:col-span-5">
            <motion.div
              className="relative group rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] max-w-md mx-auto"
              style={{ border: '1px solid rgba(255,255,255,0.10)', backgroundColor: C.forestGreen }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <img src={beforeAfterImg} alt="Before and after dental restoration" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 right-4 text-white text-[9px] font-bold px-3 py-1.5 rounded-full tracking-widest uppercase shadow-sm" style={{ backgroundColor: 'rgba(184,150,108,0.9)', backdropFilter: 'blur(4px)' }}>
                FULL REHABILITATION
              </div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.25} direction="right" x={50} className="lg:col-span-7">
            <div className="space-y-5">
              <motion.span
                className="text-7xl font-normal leading-none block select-none -mb-2"
                style={{ fontFamily: C.serif, color: C.gold }}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                &ldquo;
              </motion.span>

              <blockquote className="text-xl sm:text-2xl lg:text-[28px] font-light italic text-white leading-relaxed" style={{ fontFamily: C.serif }}>
                {story.quote}
              </blockquote>

              <div className="flex items-center gap-4 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(184,150,108,0.15)', border: '1px solid rgba(184,150,108,0.4)', color: C.gold }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm tracking-wide leading-none mb-1">{story.patient_name}</h4>
                  <p className="text-[9px] font-bold tracking-widest uppercase" style={{ color: C.gold }}>{story.patient_role}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
