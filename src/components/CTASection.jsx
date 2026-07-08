import { useEffect, useState } from 'react';

const C = {
  creamBg:     'var(--color-cream-bg)',
  creamCard:   'var(--color-cream-card)',
  forestGreen: 'var(--color-forest-green)',
  gold:        'var(--color-gold-accent)',
  serif:       'var(--font-serif-elegant)',
  sans:        'var(--font-sans-premium)',
};

export default function CTASection() {
  const [vis, setVis] = useState(false);
  useEffect(() => { setVis(true); }, []);

  return (
    <section
      className="py-16 px-6 sm:px-8 lg:px-16"
      style={{ backgroundColor: C.creamBg, fontFamily: C.sans }}
    >
      <div className="max-w-5xl mx-auto">
        <div
          className={`rounded-[2.5rem] p-12 text-center space-y-6 shadow-sm transition-all duration-1000 transform ${
            vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ backgroundColor: C.creamCard, border: '1px solid rgba(4,35,30,0.06)' }}
        >
          <h2
            className="text-3xl sm:text-4xl font-normal tracking-wide"
            style={{ fontFamily: C.serif, color: C.forestGreen }}
          >
            Begin Your Journey to a Perfect Smile
          </h2>

          <p className="text-gray-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-light">
            Consult with one of the region's leading prosthodontists for a comprehensive diagnostic evaluation.
          </p>

          <div className="pt-2">
            <button
              className="font-bold py-3.5 px-8 rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 text-[10px] tracking-widest uppercase text-white"
              style={{ backgroundColor: C.forestGreen }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              SCHEDULE INITIAL CONSULTATION
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
