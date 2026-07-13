import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal';
import profileImg from '../../assets/profile.jpeg';

const C = {
  creamBg:     'var(--color-cream-bg)',
  creamCard:   'var(--color-cream-card)',
  forestGreen: 'var(--color-forest-green)',
  gold:        'var(--color-gold-accent)',
  goldHover:   'var(--color-gold-hover)',
  serif:       'var(--font-serif-elegant)',
  sans:        'var(--font-sans-premium)',
};

const BADGE_ITEMS = [
  { badge: 'Board Certified', icon: '✓' },
  { badge: 'CAD/CAM Integrated', icon: '⚙' },
];

export default function Specialties() {
  const [services, setServices] = useState([
    { title: 'Complete Mouth Rehabilitation', desc: 'Comprehensive restoration of entire dentition with precision and aesthetics.', icon: '🦷', link: '' },
    { title: 'Dental Implants',              desc: 'State-of-the-art implant placement with osseointegration techniques.', icon: '🔧', link: '#implantology' },
    { title: 'Prosthodontic Restorations',   desc: 'Crowns, bridges, and dentures with superior aesthetics and function.', icon: '✨', link: '' },
    { title: 'Digital Smile Design',         desc: 'Smile visualization and planning using advanced digital technology.', icon: '💻', link: '' },
    { title: 'Bone Grafting',                desc: 'Surgical augmentation for optimal implant placement and longevity.', icon: '🧬', link: '' },
    { title: 'Aesthetic Dentistry',          desc: 'Cosmetic solutions for a beautiful and natural-looking smile.', icon: '💎', link: '' },
  ]);

  const [implantContent, setImplantContent] = useState({
    implant_title: 'Advanced Dental Implantology',
    implant_subtitle: 'The Architecture of a Lasting Smile',
    implant_desc: 'Dental implantology at our practice is approached as both a biological science and a structural art. Whether replacing a single tooth or executing a full-arch rehabilitation via the All-on-4® protocol, our goal is primary stability and long-term osseointegration.',
    implant_proc1_title: 'Single Tooth Replacement',
    implant_proc1_desc: 'Precision placement to preserve adjacent tooth structure and maintain bone volume. We focus on emergent profile design for indistinguishable aesthetics.',
    implant_proc2_title: 'All-on-4 / Full Arch',
    implant_proc2_desc: 'Strategic placement of four implants to support a full fixed prosthesis. Ideal for patients with significant bone loss seeking immediate function.',
    tech_item1_title: 'CBCT Guided Surgery',
    tech_item1_desc: '3D dynamic imaging for sub-millimeter placement accuracy.',
    tech_item2_title: 'Zirconia Restoration',
    tech_item2_desc: 'Biocompatible, metal-free material for superior gingival health.',
    tech_item3_title: 'Digital Scanning',
    tech_item3_desc: 'Itero Element scanning for high-precision prosthesis fit.',
  });

  useEffect(() => {
    fetch('/api/specialties')
      .then(res => { if (res.ok) return res.json(); throw new Error('Failed'); })
      .then(data => { if (data && data.length > 0) setServices(data); })
      .catch(() => {});

    fetch('/api/content')
      .then(res => { if (res.ok) return res.json(); throw new Error('Failed'); })
      .then(data => { if (data) setImplantContent(prev => ({ ...prev, ...data })); })
      .catch(() => {});
  }, []);

  return (
    <div style={{ backgroundColor: C.creamBg, fontFamily: C.sans }}>

      {/* Hero */}
      <section className="min-h-screen pt-24 px-6 sm:px-8 lg:px-16 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left" x={60} duration={0.8}>
              <div className="space-y-8">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.gold }}>PROSTHODONTIC EXCELLENCE</span>
                <h1 className="text-5xl sm:text-6xl font-normal leading-tight" style={{ fontFamily: C.serif, color: C.forestGreen }}>Surgical Specialties &amp; Advanced Restorations</h1>
                <p className="text-gray-600 text-base leading-relaxed" style={{ maxWidth: 520 }}>Precision-driven prosthodontics merging biological integrity with elite aesthetic outcomes. Dr. Popuri utilizes evidence-based protocols and state-of-the-art technology to restore complex dental architectures.</p>
                <div className="flex flex-wrap gap-4">
                  {BADGE_ITEMS.map((item, i) => (
                    <motion.div key={i} className="flex items-center gap-2 px-6 py-3 rounded-full" style={{ background: 'rgba(4,35,30,0.04)', border: '1px solid rgba(4,35,30,0.12)' }} whileHover={{ backgroundColor: 'rgba(184,150,108,0.10)', borderColor: C.gold }}>
                      <span className="font-bold text-lg" style={{ color: C.gold }}>{item.icon}</span>
                      <span className="font-semibold text-sm" style={{ color: C.forestGreen }}>{item.badge}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" x={60} delay={0.2} duration={0.8}>
              <div className="relative max-w-lg mx-auto">
                <div className="absolute inset-0 rounded-3xl shadow-xl" style={{ backgroundColor: C.forestGreen, transform: 'translate(10px,10px)' }} />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl z-10" style={{ backgroundColor: C.creamCard }}>
                  <motion.img src={profileImg} alt="Dr. Chandrika Lakshmi Popuri" className="w-full h-auto object-cover" whileHover={{ scale: 1.03 }} transition={{ duration: 0.5 }} />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 sm:px-8 lg:px-16" style={{ backgroundColor: C.creamCard, borderTop: '1px solid rgba(4,35,30,0.06)' }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16 space-y-3">
              <h2 className="text-4xl sm:text-5xl font-normal" style={{ fontFamily: C.serif, color: C.forestGreen }}>Our Specialized Services</h2>
              <p className="text-gray-600 text-sm max-w-3xl mx-auto leading-relaxed font-light">Comprehensive prosthodontic and implantology services designed to restore your smile with precision and elegance.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <motion.div className="rounded-2xl p-8 shadow-md bg-white text-left h-full" style={{ borderTop: `4px solid ${C.gold}` }} whileHover={{ y: -8, boxShadow: '0 20px 40px -12px rgba(4,35,30,0.12)' }} transition={{ duration: 0.3 }}>
                  <div className="text-5xl mb-4">{s.icon}</div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: C.forestGreen }}>{s.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                  <div className="mt-6 inline-block font-bold text-lg transition-transform duration-300 group-hover:translate-x-2" style={{ color: C.gold }}>→</div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dental Implantology Section */}
      <section id="implantology" className="py-24 px-6 sm:px-8 lg:px-16 scroll-mt-20" style={{ backgroundColor: C.creamBg, borderTop: '1px solid rgba(4,35,30,0.06)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            <ScrollReveal direction="left" x={50} className="lg:col-span-7 space-y-8 text-left">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-[3px] self-stretch min-h-[3.5rem] mt-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: C.gold }} />
                  <h2 className="text-4xl sm:text-5xl font-normal tracking-wide leading-tight" style={{ fontFamily: C.serif, color: C.forestGreen }}>{implantContent.implant_title}</h2>
                </div>
                <p className="text-xl sm:text-2xl font-light italic leading-relaxed pl-5" style={{ fontFamily: C.serif, color: C.forestGreen }}>{implantContent.implant_subtitle}</p>
              </div>

              <p className="text-gray-700 text-sm sm:text-base leading-relaxed pl-5 max-w-2xl font-light">{implantContent.implant_desc}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pl-5 pt-2">
                {[
                  { label: implantContent.implant_proc1_title, body: implantContent.implant_proc1_desc },
                  { label: implantContent.implant_proc2_title, body: implantContent.implant_proc2_desc },
                ].map((card, i) => (
                  <ScrollReveal key={i} delay={0.1 + i * 0.1}>
                    <motion.div className="rounded-2xl p-8 bg-white h-full" style={{ border: '1px solid rgba(4,35,30,0.06)' }} whileHover={{ y: -4, boxShadow: '0 10px 25px -6px rgba(4,35,30,0.08)' }}>
                      <h3 className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: C.gold }}>{card.label}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">{card.body}</p>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>

              <div className="pl-5 pt-2">
                <Link to="/gallery" className="inline-flex items-center gap-2.5 text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 group" style={{ color: C.gold }}>
                  View Implant Case Studies
                  <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 text-sm">→</span>
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" x={50} delay={0.2} className="lg:col-span-5 text-left">
              <div className="rounded-3xl p-10 sm:p-12 shadow-xl relative overflow-hidden" style={{ backgroundColor: C.forestGreen, border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: 'rgba(184,150,108,0.08)' }} />
                <div className="relative z-10">
                  <svg className="w-9 h-9 mb-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: C.gold }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4L4 8l8 4 8-4-8-4zM4 12l8 4 8-4M4 16l8 4 8-4" />
                  </svg>
                  <h3 className="text-3xl font-normal mb-8 tracking-wide text-white" style={{ fontFamily: C.serif }}>Technology Used</h3>
                  <div className="space-y-8">
                    {[
                      { title: implantContent.tech_item1_title, desc: implantContent.tech_item1_desc },
                      { title: implantContent.tech_item2_title, desc: implantContent.tech_item2_desc },
                      { title: implantContent.tech_item3_title, desc: implantContent.tech_item3_desc },
                    ].map((t, i) => (
                      <ScrollReveal key={i} delay={0.3 + i * 0.1} direction="up" y={15}>
                        <div className="flex items-start gap-4">
                          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: C.gold }}>
                            <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4" />
                          </svg>
                          <div>
                            <h4 className="text-white font-semibold text-sm sm:text-base tracking-wide">{t.title}</h4>
                            <p className="text-xs leading-relaxed mt-1" style={{ color: 'rgba(255,255,255,0.60)' }}>{t.desc}</p>
                          </div>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 sm:px-8 lg:px-16 text-center" style={{ backgroundColor: C.forestGreen }}>
        <ScrollReveal>
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-4xl sm:text-5xl font-normal text-white" style={{ fontFamily: C.serif }}>Ready to Transform Your Smile?</h2>
            <p className="text-sm leading-relaxed max-w-2xl mx-auto font-light" style={{ color: 'rgba(255,255,255,0.70)' }}>Schedule a consultation with Dr. Chandrika Lakshmi Popuri today and discover how we can restore your smile to its full potential.</p>
            <Link to="/book" className="inline-block font-bold py-4 px-10 rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105 text-sm tracking-widest uppercase text-center cursor-pointer" style={{ backgroundColor: '#fff', color: C.forestGreen }}>
              Book a Consultation
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
