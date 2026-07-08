import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const C = {
  creamBg:     'var(--color-cream-bg)',
  creamCard:   'var(--color-cream-card)',
  forestGreen: 'var(--color-forest-green)',
  gold:        'var(--color-gold-accent)',
  serif:       'var(--font-serif-elegant)',
  sans:        'var(--font-sans-premium)',
};

const BADGE_ITEMS = [
  { badge: 'Board Certified', icon: '✓' },
  { badge: 'CAD/CAM Integrated', icon: '⚙' },
];

const SERVICES = [
  { title: 'Complete Mouth Rehabilitation', desc: 'Comprehensive restoration of entire dentition with precision and aesthetics.', icon: '🦷' },
  { title: 'Dental Implants',              desc: 'State-of-the-art implant placement with osseointegration techniques.', icon: '🔧', link: '/implantology' },
  { title: 'Prosthodontic Restorations',   desc: 'Crowns, bridges, and dentures with superior aesthetics and function.', icon: '✨' },
  { title: 'Digital Smile Design',         desc: 'Smile visualization and planning using advanced digital technology.', icon: '💻' },
  { title: 'Bone Grafting',                desc: 'Surgical augmentation for optimal implant placement and longevity.', icon: '🧬' },
  { title: 'Aesthetic Dentistry',          desc: 'Cosmetic solutions for a beautiful and natural-looking smile.', icon: '💎' },
];

export default function Specialties() {
  const [vis, setVis] = useState(false);
  useEffect(() => { setVis(true); }, []);

  return (
    <div style={{ backgroundColor: C.creamBg, fontFamily: C.sans }}>

      {/* ── Hero ── */}
      <section className="min-h-screen pt-24 px-6 sm:px-8 lg:px-16 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div
              className={`space-y-8 transition-all duration-1000 transform ${
                vis ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: C.gold }}
              >
                PROSTHODONTIC EXCELLENCE
              </span>

              <h1
                className="text-5xl sm:text-6xl font-normal leading-tight"
                style={{ fontFamily: C.serif, color: C.forestGreen }}
              >
                Surgical Specialties &amp; Advanced Restorations
              </h1>

              <p className="text-gray-600 text-base leading-relaxed" style={{ maxWidth: 520 }}>
                Precision-driven prosthodontics merging biological integrity with elite aesthetic
                outcomes. Dr. Popuri utilizes evidence-based protocols and state-of-the-art
                technology to restore complex dental architectures.
              </p>

              <div className="flex flex-wrap gap-4">
                {BADGE_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-500 transform ${
                      vis ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                    }`}
                    style={{
                      transitionDelay: `${i * 100}ms`,
                      background: 'rgba(4,35,30,0.04)',
                      border: '1px solid rgba(4,35,30,0.12)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(184,150,108,0.10)';
                      e.currentTarget.style.borderColor = C.gold;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(4,35,30,0.04)';
                      e.currentTarget.style.borderColor = 'rgba(4,35,30,0.12)';
                    }}
                  >
                    <span className="font-bold text-lg" style={{ color: C.gold }}>{item.icon}</span>
                    <span className="font-semibold text-sm" style={{ color: C.forestGreen }}>{item.badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right image */}
            <div
              className={`relative transition-all duration-1000 delay-300 transform ${
                vis ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="relative max-w-lg mx-auto">
                {/* Green offset backdrop */}
                <div
                  className="absolute inset-0 rounded-3xl shadow-xl"
                  style={{ backgroundColor: C.forestGreen, transform: 'translate(10px,10px)' }}
                />
                <div
                  className="relative rounded-3xl overflow-hidden shadow-2xl z-10"
                  style={{ backgroundColor: C.creamCard }}
                >
                  <img
                    src="/src/assets/profile.jpeg"
                    alt="Dr. Chandrika Lakshmi Popuri"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section
        className="py-20 px-6 sm:px-8 lg:px-16"
        style={{ backgroundColor: C.creamCard, borderTop: '1px solid rgba(4,35,30,0.06)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <h2
              className="text-4xl sm:text-5xl font-normal"
              style={{ fontFamily: C.serif, color: C.forestGreen }}
            >
              Our Specialized Services
            </h2>
            <p className="text-gray-600 text-sm max-w-3xl mx-auto leading-relaxed font-light">
              Comprehensive prosthodontic and implantology services designed to restore your smile
              with precision and elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((s, i) => {
              const cardClass = `rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group ${
                vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`;
              const cardStyle = {
                transitionDelay: `${i * 100}ms`,
                background: '#fff',
                borderTop: `4px solid ${C.gold}`,
              };
              const inner = (
                <>
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: C.forestGreen }}>{s.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                  <div
                    className="mt-6 inline-block font-bold text-lg group-hover:translate-x-2 transition-transform duration-300"
                    style={{ color: C.gold }}
                  >
                    →
                  </div>
                </>
              );

              return s.link ? (
                <Link key={i} to={s.link} className={`${cardClass} block text-left`} style={cardStyle}>
                  {inner}
                </Link>
              ) : (
                <div key={i} className={cardClass} style={cardStyle}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-16 px-6 sm:px-8 lg:px-16 text-center"
        style={{ backgroundColor: C.forestGreen }}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <h2
            className="text-4xl sm:text-5xl font-normal text-white"
            style={{ fontFamily: C.serif }}
          >
            Ready to Transform Your Smile?
          </h2>
          <p className="text-sm leading-relaxed max-w-2xl mx-auto font-light" style={{ color: 'rgba(255,255,255,0.70)' }}>
            Schedule a consultation with Dr. Chandrika Lakshmi Popuri today and discover how we can
            restore your smile to its full potential.
          </p>
          <button
            className="font-bold py-4 px-10 rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105 text-sm tracking-widest uppercase"
            style={{ backgroundColor: '#fff', color: C.forestGreen }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = C.creamCard)}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#fff')}
          >
            Book a Consultation
          </button>
        </div>
      </section>

    </div>
  );
}
