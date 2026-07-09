import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import beforeAfterImg from '../../../assets/before_after_showcase.png';

const C = {
  forestGreen: 'var(--color-forest-green)',
  gold:        'var(--color-gold-accent)',
  serif:       'var(--font-serif-elegant)',
  sans:        'var(--font-sans-premium)',
};

export default function SuccessStories() {
  const [vis, setVis] = useState(false);
  useEffect(() => { setVis(true); }, []);

  return (
    <section
      className="py-24 px-6 sm:px-8 lg:px-16 text-left"
      style={{
        backgroundColor: C.forestGreen,
        fontFamily: C.sans,
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <h2
              className="text-3xl sm:text-4xl font-normal tracking-wide text-white"
              style={{ fontFamily: C.serif }}
            >
              Patient Success Stories
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm max-w-xl font-light leading-relaxed">
              Witness the transformations that restored confidence, function, and life.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              to="/gallery"
              className="inline-block font-bold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-md text-[10px] tracking-widest uppercase bg-transparent text-center cursor-pointer"
              style={{ border: '1px solid rgba(184,150,108,0.45)', color: C.gold }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = C.gold;
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = C.gold;
              }}
            >
              VIEW FULL CLINICAL GALLERY
            </Link>
          </div>
        </div>

        {/* ── Testimonial ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Before/After image */}
          <div
            className={`lg:col-span-5 transition-all duration-1000 transform ${
              vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div
              className="relative group rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] max-w-md mx-auto"
              style={{ border: '1px solid rgba(255,255,255,0.10)', backgroundColor: C.forestGreen }}
            >
              <img
                src={beforeAfterImg}
                alt="Before and after dental restoration"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div
                className="absolute top-4 right-4 text-white text-[9px] font-bold px-3 py-1.5 rounded-full tracking-widest uppercase shadow-sm"
                style={{ backgroundColor: 'rgba(184,150,108,0.9)', backdropFilter: 'blur(4px)' }}
              >
                FULL REHABILITATION
              </div>
            </div>
          </div>

          {/* Quote */}
          <div
            className={`lg:col-span-7 space-y-6 transition-all duration-1000 delay-200 transform ${
              vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span
              className="text-7xl font-normal leading-none block select-none"
              style={{ fontFamily: C.serif, color: C.gold, lineHeight: 1, height: '2rem' }}
            >
              "
            </span>

            <blockquote
              className="text-xl sm:text-2xl lg:text-[28px] font-light italic text-white leading-relaxed"
              style={{ fontFamily: C.serif }}
            >
              The precision of Dr. Popuri's work is simply unmatched. After years of discomfort,
              my full-mouth reconstruction feels exactly like my natural teeth—only better.
              Her attention to detail gave me my life back.
            </blockquote>

            <div
              className="flex items-center gap-4 pt-6 max-w-lg"
              style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(184,150,108,0.15)', border: '1px solid rgba(184,150,108,0.4)', color: C.gold }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm tracking-wide leading-none mb-1">
                  Rajeswari Kumar
                </h4>
                <p
                  className="text-[9px] font-bold tracking-widest uppercase"
                  style={{ color: C.gold }}
                >
                  IMPLANT &amp; PROSTHETIC PATIENT
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
