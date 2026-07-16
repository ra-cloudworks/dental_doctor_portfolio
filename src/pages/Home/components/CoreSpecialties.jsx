import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollReveal from '../../../components/ScrollReveal';
import CardTilt from '../../../components/CardTilt';
import implantImgFallback from '../../../assets/implant_showcase.png';

const C = {
  creamBg:     'var(--color-cream-bg)',
  creamCard:   'var(--color-cream-card)',
  forestGreen: 'var(--color-forest-green)',
  gold:        'var(--color-gold-accent)',
  goldHover:   'var(--color-gold-hover)',
  serif:       'var(--font-serif-elegant)',
  sans:        'var(--font-sans-premium)',
};

export default function CoreSpecialties() {
  const [specialties, setSpecialties] = useState([]);
  const [content, setContent] = useState({
    implant_title: 'Advanced Dental Implantology',
    implant_desc: 'Restoration of single or multiple missing teeth with elite osseointegrated titanium implants. Focus on long-term stability and bone preservation.'
  });

  useEffect(() => {
    fetch('/api/specialties')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setSpecialties(data);
      })
      .catch(err => console.error('Error fetching specialties:', err));

    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data) setContent(prev => ({ ...prev, ...data }));
      })
      .catch(err => console.error('Error fetching settings content:', err));
  }, []);

  const implantSpecialty = specialties.find(s => s.title.toLowerCase().includes('implant')) || {
    title: 'Advanced Dental Implants',
    desc: 'Restoration of single or multiple missing teeth with elite osseointegrated titanium implants. Focus on long-term stability and bone preservation.'
  };

  const cosmeticSpecialty = specialties.find(s => s.title.toLowerCase().includes('aesthetic') || s.title.toLowerCase().includes('cosmetic')) || {
    title: 'Cosmetic Dentistry',
    desc: 'Aesthetics and design utilizing premium veneers, inlays, and translucent crowns.'
  };

  const fullMouthSpecialty = specialties.find(s => s.title.toLowerCase().includes('mouth') || s.title.toLowerCase().includes('rehabilitation')) || {
    title: 'Full-Mouth Rehabilitation',
    desc: 'Complex reconstructive cases addressing occlusal wear, tooth loss, and jaw joint relationships.'
  };

  const generalSpecialty = specialties.find(s => s.title.toLowerCase().includes('restoration') || s.title.toLowerCase().includes('prosthodontic')) || {
    title: 'Clinical Excellence',
    desc: 'Case studies in full-mouth rehabilitation, implant-supported prosthetics, and digital workflows using state-of-the-art technology for minimal interventions.'
  };

  return (
    <section
      className="py-24 px-6 sm:px-8 lg:px-16"
      style={{ backgroundColor: C.creamBg, fontFamily: C.sans, borderBottom: '1px solid rgba(4,35,30,0.06)' }}
    >
      <div className="max-w-7xl mx-auto">

        <ScrollReveal>
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-normal tracking-wide" style={{ fontFamily: C.serif, color: C.forestGreen }}>
              Core Specialties
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-light">
              Delivering high-fidelity prosthetic restorations through state-of-the-art geometry, materials, and implant surgical protocols.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ScrollReveal delay={0}>
            <CardTilt maxTilt={6} scale={1.02}>
              <Link
                to="/specialties#implantology"
                className="lg:col-span-2 rounded-3xl p-10 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 flex flex-col md:flex-row justify-between items-center gap-8 overflow-hidden group text-left block h-full"
                style={{ background: '#fff', border: '1px solid rgba(4,35,30,0.06)' }}
              >
                <div className="flex-1 space-y-5">
                  <h3 className="text-2xl font-normal tracking-wide" style={{ fontFamily: C.serif, color: C.forestGreen }}>
                    {implantSpecialty.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light max-w-md">{implantSpecialty.desc}</p>
                  <div className="text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 transition-colors duration-300" style={{ color: C.gold }}>
                    IMPLANTATION PROSTHODONTICS
                    <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                  </div>
                </div>
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden flex-shrink-0 shadow-inner" style={{ backgroundColor: C.forestGreen }}>
                  <img src={implantImgFallback} alt="Dental Implant" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                </div>
              </Link>
            </CardTilt>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <CardTilt maxTilt={8} scale={1.03}>
              <motion.div
                whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(4,35,30,0.15)' }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl p-10 flex flex-col justify-between min-h-[300px] h-full"
                style={{ backgroundColor: C.forestGreen }}
              >
                <motion.div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(184,150,108,0.15)', border: '1px solid rgba(184,150,108,0.4)', color: C.gold }}
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </motion.div>
              <div className="text-left">
                <h3 className="text-xl font-normal mb-3 tracking-wide text-white" style={{ fontFamily: C.serif }}>{cosmeticSpecialty.title}</h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">{cosmeticSpecialty.desc}</p>
              </div>
            </motion.div>
            </CardTilt>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <CardTilt maxTilt={8} scale={1.03}>
              <motion.div
                whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(4,35,30,0.12)' }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl p-10 flex flex-col justify-between min-h-[300px] h-full"
                style={{ backgroundColor: C.creamCard, border: '1px solid rgba(4,35,30,0.06)' }}
              >
                <motion.div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(4,35,30,0.05)', border: '1px solid rgba(4,35,30,0.14)', color: C.forestGreen }}
                  whileHover={{ scale: 1.15, rotate: -10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </motion.div>
              <div className="text-left">
                <h3 className="text-xl font-normal mb-3 tracking-wide" style={{ fontFamily: C.serif, color: C.forestGreen }}>{fullMouthSpecialty.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">{fullMouthSpecialty.desc}</p>
              </div>
            </motion.div>
            </CardTilt>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <CardTilt maxTilt={8} scale={1.03}>
              <motion.div
                whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(4,35,30,0.12)' }}
                transition={{ duration: 0.3 }}
                className="lg:col-span-2 rounded-3xl p-10 flex flex-col md:flex-row justify-between items-center gap-8 overflow-hidden h-full"
                style={{ backgroundColor: C.creamCard, border: '1px solid rgba(4,35,30,0.06)' }}
              >
                <div className="flex-1 space-y-4 text-left">
                  <h3 className="text-2xl font-normal tracking-wide" style={{ fontFamily: C.serif, color: C.forestGreen }}>{generalSpecialty.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">{generalSpecialty.desc}</p>
                </div>
                <div className="flex items-center flex-shrink-0">
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                    style={{ background: 'rgba(4,35,30,0.08)', border: '1px solid rgba(4,35,30,0.18)' }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >🔬</motion.div>
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl -ml-4 shadow-md"
                    style={{ background: 'rgba(184,150,108,0.1)', border: '1px solid rgba(184,150,108,0.2)' }}
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >📐</motion.div>
                </div>
              </motion.div>
            </CardTilt>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.35}>
          <div className="text-center mt-12">
            <Link
              to="/specialties"
              className="inline-block font-bold py-3.5 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-[11px] tracking-widest uppercase cursor-pointer group"
              style={{ border: '1px solid var(--color-gold-accent)', color: C.gold, backgroundColor: 'transparent' }}
            >
              <span className="group-hover:text-white transition-colors duration-300">VIEW ALL SPECIALTIES →</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
