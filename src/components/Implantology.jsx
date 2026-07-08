import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const C = {
  creamBg:     'var(--color-cream-bg)',
  creamCard:   'var(--color-cream-card)',
  forestGreen: 'var(--color-forest-green)',
  gold:        'var(--color-gold-accent)',
  goldHover:   'var(--color-gold-hover)',
  serif:       'var(--font-serif-elegant)',
  sans:        'var(--font-sans-premium)',
};

const TECHNOLOGIES = [
  { title: 'CBCT Guided Surgery',   desc: '3D dynamic imaging for sub-millimeter placement accuracy.' },
  { title: 'Zirconia Restoration',  desc: 'Biocompatible, metal-free material for superior gingival health.' },
  { title: 'Digital Scanning',      desc: 'Itero Element scanning for high-precision prosthesis fit.' },
];

export default function Implantology() {
  const [vis, setVis] = useState(false);
  useEffect(() => { setVis(true); window.scrollTo(0, 0); }, []);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: C.creamBg, fontFamily: C.sans }}
    >

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 pt-28 pb-4">
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase" style={{ color: C.gold }}>
          <Link to="/" onMouseEnter={e => (e.currentTarget.style.opacity='0.7')} onMouseLeave={e => (e.currentTarget.style.opacity='1')}>Home</Link>
          <span style={{ color: '#9ca3af' }}>/</span>
          <Link to="/specialties" onMouseEnter={e => (e.currentTarget.style.opacity='0.7')} onMouseLeave={e => (e.currentTarget.style.opacity='1')}>Specialties</Link>
          <span style={{ color: '#9ca3af' }}>/</span>
          <span style={{ color: 'rgba(4,35,30,0.55)' }}>Dental Implantology</span>
        </div>
      </div>

      {/* Main Section */}
      <section className="pb-24 lg:pb-32 px-6 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left Column */}
            <div
              className={`lg:col-span-7 space-y-8 transition-all duration-1000 transform ${
                vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Title with gold bar */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-[3px] self-stretch min-h-[3.5rem] mt-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: C.gold }} />
                  <h1
                    className="text-4xl sm:text-5xl font-normal tracking-wide leading-tight"
                    style={{ fontFamily: C.serif, color: C.forestGreen }}
                  >
                    Advanced Dental Implantology
                  </h1>
                </div>
                <p
                  className="text-xl sm:text-2xl font-light italic leading-relaxed pl-5"
                  style={{ fontFamily: C.serif, color: C.forestGreen }}
                >
                  The Architecture of a Lasting Smile
                </p>
              </div>

              {/* Body copy */}
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed pl-5 max-w-2xl font-light">
                Dental implantology at our practice is approached as both a biological science and a
                structural art. Whether replacing a single tooth or executing a full-arch rehabilitation
                via the <strong>All-on-4®</strong> protocol, our goal is primary stability and
                long-term osseointegration.
              </p>

              {/* Procedure cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pl-5 pt-2">
                {[
                  { label: 'Single Tooth Replacement',
                    body: 'Precision placement to preserve adjacent tooth structure and maintain bone volume. We focus on emergent profile design for indistinguishable aesthetics.' },
                  { label: 'All-on-4 / Full Arch',
                    body: 'Strategic placement of four implants to support a full fixed prosthesis. Ideal for patients with significant bone loss seeking immediate function.' },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    style={{ backgroundColor: C.creamCard, border: '1px solid rgba(4,35,30,0.06)' }}
                  >
                    <h3 className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: C.gold }}>
                      {card.label}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light">
                      {card.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA link */}
              <div className="pl-5 pt-2">
                <Link
                  to="/#gallery"
                  className="inline-flex items-center gap-2.5 text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 group"
                  style={{ color: C.gold }}
                  onMouseEnter={e => (e.currentTarget.style.color = C.goldHover)}
                  onMouseLeave={e => (e.currentTarget.style.color = C.gold)}
                >
                  View Implant Case Studies
                  <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 text-sm">→</span>
                </Link>
              </div>
            </div>

            {/* Right: Technology card */}
            <div
              className={`lg:col-span-5 transition-all duration-1000 delay-300 transform ${
                vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div
                className="rounded-3xl p-10 sm:p-12 shadow-xl relative overflow-hidden"
                style={{ backgroundColor: C.forestGreen, border: '1px solid rgba(255,255,255,0.05)' }}
              >
                {/* Ambient glow */}
                <div
                  className="absolute -right-24 -top-24 w-48 h-48 rounded-full blur-3xl pointer-events-none"
                  style={{ backgroundColor: 'rgba(184,150,108,0.08)' }}
                />

                <div className="relative z-10">
                  {/* Stack icon */}
                  <svg className="w-9 h-9 mb-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: C.gold }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                      d="M12 4L4 8l8 4 8-4-8-4zM4 12l8 4 8-4M4 16l8 4 8-4" />
                  </svg>

                  <h2
                    className="text-3xl font-normal mb-8 tracking-wide text-white"
                    style={{ fontFamily: C.serif }}
                  >
                    Technology Used
                  </h2>

                  <div className="space-y-8">
                    {TECHNOLOGIES.map((t, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: C.gold }}>
                          <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4" />
                        </svg>
                        <div>
                          <h4 className="text-white font-semibold text-sm sm:text-base tracking-wide">{t.title}</h4>
                          <p className="text-xs leading-relaxed mt-1" style={{ color: 'rgba(255,255,255,0.60)' }}>{t.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="py-20 px-6 sm:px-8 lg:px-16"
        style={{ backgroundColor: C.creamCard, borderTop: '1px solid rgba(4,35,30,0.06)' }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-7">
          <h2
            className="text-3xl sm:text-4xl font-normal tracking-wide"
            style={{ fontFamily: C.serif, color: C.forestGreen }}
          >
            Restore Stability, Function &amp; Harmony
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light max-w-2xl mx-auto">
            Every smile has a unique anatomical signature. Schedule a personalized digital
            diagnostic consultation to discuss your custom implant restoration roadmap.
          </p>
          <button
            className="font-bold py-3.5 px-8 rounded-lg shadow-md text-xs sm:text-sm tracking-widest uppercase text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
            style={{ backgroundColor: C.forestGreen }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Schedule Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
