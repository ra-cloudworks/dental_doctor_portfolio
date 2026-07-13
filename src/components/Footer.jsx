import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const C = {
  forestGreen: 'var(--color-forest-green)',
  gold:        'var(--color-gold-accent)',
  serif:       'var(--font-serif-elegant)',
  sans:        'var(--font-sans-premium)',
};

export default function Footer() {
  const [content, setContent] = useState({
    clinic_phone: '+91 (0) 40 2345 6789',
    clinic_location: 'Specialist Restorative Wing, Premium Dental Care, Jubilee Hills, Hyderabad, Telangana',
    clinic_email: 'contact@drpopuri.com',
    footer_bio_summary: 'Specialist Prosthodontist specializing in advanced restorations and oral implantology.'
  });

  useEffect(() => {
    fetch('/api/content')
      .then(res => { if (res.ok) return res.json(); throw new Error('Failed'); })
      .then(data => { if (data && data.clinic_phone) setContent(prev => ({ ...prev, ...data })); })
      .catch(() => {});
  }, []);

  const quickLinks = [
    { label: 'Clinical Profile',   href: '/#clinical' },
    { label: 'Specialties',        href: '/specialties' },
    { label: 'Implantology',       href: '/specialties#implantology' },
    { label: 'Clinical Gallery',   href: '/gallery' },
    { label: 'Patient Resources',  href: '/book#faq' },
  ];

  return (
    <footer style={{ backgroundColor: C.forestGreen, fontFamily: C.sans, color: '#fff' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 text-left">

          <ScrollReveal delay={0} className="md:col-span-5 space-y-5">
            <h2 className="text-xl sm:text-2xl font-normal tracking-wide" style={{ fontFamily: C.serif }}>Dr. Chandrika Lakshmi Popuri</h2>
            <p className="text-sm font-light leading-relaxed max-w-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{content.footer_bio_summary}</p>
            <div className="flex gap-3">
              {[
                { title: 'Share', path: 'M8.684 10.742l5.053-2.527m0 7.57l-5.053-2.527m0 0A3.001 3.001 0 118 8a3.001 3.001 0 01.82 5.093zm8.36 4.647a3 3 0 11-6 0 3 3 0 016 0zM16 8a3 3 0 11-6 0 3 3 0 016 0z', href: '#share' },
                { title: 'Email', path: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', href: `mailto:${content.clinic_email}` },
              ].map(s => (
                <motion.a key={s.title} href={s.href} title={s.title} className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300" style={{ border: '1px solid rgba(184,150,108,0.4)', color: C.gold }} whileHover={{ backgroundColor: C.gold, color: '#fff', scale: 1.1 }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={s.path} /></svg>
                </motion.a>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="md:col-span-3 space-y-5">
            <h3 className="text-[11px] font-bold tracking-widest uppercase" style={{ color: C.gold }}>Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((lk, i) => (
                <li key={i}>
                  <Link to={lk.href} className="text-xs sm:text-sm font-light block py-0.5 transition-colors duration-200 hover:text-[var(--color-gold-accent)]" style={{ color: 'rgba(255,255,255,0.65)' }}>{lk.label}</Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="md:col-span-4 space-y-5">
            <h3 className="text-[11px] font-bold tracking-widest uppercase" style={{ color: C.gold }}>Clinic Location</h3>
            <div className="flex gap-3">
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: C.gold }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-xs sm:text-sm font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{content.clinic_location}</p>
            </div>
            <div className="flex gap-3 items-center">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: C.gold }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href={`tel:${content.clinic_phone.replace(/\s+/g, '')}`} className="text-xs sm:text-sm font-light transition-colors duration-200 hover:text-[var(--color-gold-accent)]" style={{ color: 'rgba(255,255,255,0.65)' }}>{content.clinic_phone}</a>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-7 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.45)' }}>&copy; 2026 Dr. Chandrika Lakshmi Popuri. All Rights Reserved. Prosthodontics &amp; Implant Specialist.</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-light" style={{ color: 'rgba(255,255,255,0.45)' }}>
            {['Privacy Policy', 'Terms of Service', 'Patient Privacy (HIPAA)'].map((t, i) => (
              <span key={i} className="flex items-center gap-4">
                {i > 0 && <span>&bull;</span>}
                <a href={`#${t.toLowerCase().replace(/\s/g, '-')}`} className="transition-colors duration-200 hover:text-[var(--color-gold-accent)]">{t}</a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
