import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal';
import BeforeAfterSlider from '../../components/BeforeAfterSlider';

const C = {
  creamBg:     'var(--color-cream-bg)',
  creamCard:   'var(--color-cream-card)',
  forestGreen: 'var(--color-forest-green)',
  gold:        'var(--color-gold-accent)',
  goldHover:   'var(--color-gold-hover)',
  serif:       'var(--font-serif-elegant)',
  sans:        'var(--font-sans-premium)',
};

const CATEGORIES = ['All Cases', 'Dental Implants', 'Full-Mouth', 'Cosmetic Dentistry'];

const initialCases = [
  { id: 'Case #01', case_id: 'Case #01', category: 'Dental Implants', title: 'Single Anterior Implant', desc: 'Replacement of a fractured central incisor with a custom titanium implant and translucent zirconia crown.', beforeImage: '/src/assets/implant_showcase.png', afterImage: '/src/assets/implant_showcase.png', prosthetics: 'Screw-retained Zirconia Crown', duration: '3 Months', material: 'Monolithic Translucent Zirconia', featured: 0 },
  { id: 'Case #02', case_id: 'Case #02', category: 'Full-Mouth', title: 'Full-Arch Rehabilitation', desc: 'Complete restoration of upper and lower dentition correcting severe attritional wear and occlusal vertical dimension.', beforeImage: '/src/assets/before_after_showcase.png', afterImage: '/src/assets/before_after_showcase.png', prosthetics: 'Fixed Crown & Bridge Rehabilitation', duration: '5 Months', material: 'IPS e.max Ceram & Zirconia Substructure', featured: 1 },
  { id: 'Case #03', case_id: 'Case #03', category: 'Cosmetic Dentistry', title: 'Aesthetic Porcelain Veneers', desc: 'Smile redesign using ultra-thin lithium disilicate veneers to correct spacing, minor rotation, and staining.', beforeImage: '/src/assets/profile.jpeg', afterImage: '/src/assets/profile.jpeg', prosthetics: '8 Anterior Laminate Veneers', duration: '2 Weeks', material: 'IPS e.max Press (Lithium Disilicate)', featured: 0 },
  { id: 'Case #04', case_id: 'Case #04', category: 'Dental Implants', title: 'Implant-Supported Bridge', desc: 'Restoring posterior masticatory support with two osseointegrated implants supporting a 3-unit fixed bridge.', beforeImage: '/src/assets/implant_showcase.png', afterImage: '/src/assets/implant_showcase.png', prosthetics: '3-Unit Implant Bridge', duration: '4 Months', material: 'Porcelain-Fused-to-Zirconia (PFZ)', featured: 0 },
  { id: 'Case #05', case_id: 'Case #05', category: 'Full-Mouth', title: 'All-on-4® Restoration', desc: 'Immediate loading protocol for fully edentulous mandible, restoring complete chew function in a single day.', beforeImage: '/src/assets/before_after_showcase.png', afterImage: '/src/assets/before_after_showcase.png', prosthetics: 'All-on-4 Fixed Prosthesis', duration: '6 Months (Final)', material: 'Titanium-Reinforced BioHPP & Composite', featured: 0 },
  { id: 'Case #06', case_id: 'Case #06', category: 'Cosmetic Dentistry', title: 'Minimal Prep Veneers', desc: 'Aesthetic enhancement preserving maximum tooth structure, correcting enamel hypoplasia.', beforeImage: '/src/assets/profile.jpeg', afterImage: '/src/assets/profile.jpeg', prosthetics: '6 Minimal Prep Veneers', duration: '3 Weeks', material: 'Premium Translucent Feldspathic Porcelain', featured: 0 },
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('All Cases');
  const [cases, setCases] = useState(initialCases);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    fetch('/api/cases')
      .then(res => { if (res.ok) return res.json(); throw new Error('Failed'); })
      .then(data => { if (data && data.length > 0) setCases(data); })
      .catch(() => {});
  }, []);

  const filteredCases = cases.filter(c => activeTab === 'All Cases' || c.category === activeTab);
  const featuredCase = cases.find(c => c.featured === 1) || cases[0] || initialCases[1];

  return (
    <div style={{ backgroundColor: C.creamBg, fontFamily: C.sans, color: C.forestGreen }} className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">

        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-center block" style={{ color: C.gold }}>Clinical Portfolio</span>
            <h1 className="text-4xl sm:text-5xl font-normal leading-tight text-center" style={{ fontFamily: C.serif }}>Clinical Success Gallery</h1>
            <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed text-center">A showcase of advanced prosthodontic cases demonstrating structural precision, biological integration, and restored aesthetics.</p>
          </div>
        </ScrollReveal>

        {featuredCase && (
          <ScrollReveal>
            <div className="mb-20">
              <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-black/[0.04] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center text-left">
                <div className="lg:col-span-6">
                  <BeforeAfterSlider beforeSrc={featuredCase.beforeImage} afterSrc={featuredCase.afterImage} />
                </div>
                <div className="lg:col-span-6 space-y-6">
                  <span className="inline-block text-[9px] font-bold px-3 py-1 rounded-full tracking-widest uppercase border border-gold/30 bg-gold/10" style={{ color: C.gold }}>Featured Transformation</span>
                  <h2 className="text-3xl sm:text-4xl font-normal leading-snug" style={{ fontFamily: C.serif }}>{featuredCase.title}</h2>
                  <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed">{featuredCase.desc}</p>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-black/[0.06]">
                    <div><span className="block text-[9px] font-bold tracking-widest uppercase text-gray-400">Prosthetics</span><span className="text-xs sm:text-sm font-semibold mt-0.5 block">{featuredCase.prosthetics}</span></div>
                    <div><span className="block text-[9px] font-bold tracking-widest uppercase text-gray-400">Treatment</span><span className="text-xs sm:text-sm font-semibold mt-0.5 block">{featuredCase.duration}</span></div>
                    <div><span className="block text-[9px] font-bold tracking-widest uppercase text-gray-400">Material</span><span className="text-xs sm:text-sm font-semibold mt-0.5 block">{featuredCase.material}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map(tab => (
              <motion.button key={tab} onClick={() => setActiveTab(tab)} className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer" style={{ backgroundColor: activeTab === tab ? C.forestGreen : 'transparent', color: activeTab === tab ? '#fff' : 'rgba(4,35,30,0.6)', border: `1px solid ${activeTab === tab ? C.forestGreen : 'rgba(4,35,30,0.1)'}` }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                {tab}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredCases.map((c, i) => (
              <motion.div key={c.id || i} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, delay: i * 0.05 }} className="bg-white rounded-3xl overflow-hidden border border-black/[0.04] shadow-sm text-left flex flex-col justify-between" whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(4,35,30,0.1)' }}>
                <div className="p-3 pb-0">
                  {c.category === 'Dental Implants' ? (
                    <BeforeAfterSlider beforeSrc={c.beforeImage} afterSrc={c.afterImage} heightClass="aspect-[4/3] rounded-2xl" />
                  ) : (
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden" style={{ backgroundColor: C.forestGreen }}>
                      <img src={c.afterImage} alt={c.title} className="w-full h-full object-cover" />
                      <div className="absolute top-4 right-4 text-white text-[9px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase z-20 pointer-events-none" style={{ backgroundColor: 'rgba(184,150,108,0.9)' }}>{c.category}</div>
                    </div>
                  )}
                </div>
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: C.gold }}>{c.case_id}</span>
                      <span className="text-[9px] font-bold tracking-widest uppercase text-gray-400">{c.category}</span>
                    </div>
                    <h3 className="text-xl font-normal leading-snug" style={{ fontFamily: C.serif }}>{c.title}</h3>
                    <p className="text-gray-500 text-xs sm:text-sm font-light leading-relaxed">{c.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-black/[0.06] space-y-2 text-xs">
                    <div className="flex justify-between"><span className="text-gray-400 font-medium">Prosthetic:</span><span className="font-semibold text-right max-w-[180px] truncate">{c.prosthetics}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400 font-medium">Treatment Time:</span><span className="font-semibold">{c.duration}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400 font-medium">Primary Material:</span><span className="font-semibold text-right max-w-[180px] truncate">{c.material}</span></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
