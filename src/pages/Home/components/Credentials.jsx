import { useEffect, useState } from 'react';

const C = {
  creamBg:     'var(--color-cream-bg)',
  creamCard:   'var(--color-cream-card)',
  forestGreen: 'var(--color-forest-green)',
  gold:        'var(--color-gold-accent)',
  serif:       'var(--font-serif-elegant)',
  sans:        'var(--font-sans-premium)',
};

export default function CredentialsSection() {
  const [vis, setVis] = useState(false);
  useEffect(() => { setVis(true); }, []);

  const timelineItems = [
    {
      tag: 'MDS – MASTER OF DENTAL SURGERY (2016)',
      title: 'Prosthodontics & Crown and Bridge',
      institution: 'Banasthali Institute of Dental Science and Hospital',
      details: 'Specialized training in full-mouth rehabilitation and implant-supported restorations.',
    },
    {
      tag: 'BDS – BACHELOR OF DENTAL SURGERY (2013)',
      title: 'Clinical Foundation',
      institution: 'Uttaranchal Institute of Dental Science and Hospital',
      details: 'Distinguished academic record laying the foundation for restorative excellence.',
    },
    {
      tag: 'AWARD & RECOGNITION',
      title: 'Best Paper Award 2024',
      institution: 'National Prosthodontics Conference',
      details: 'Received for research in advanced restorative techniques and implant protocols.',
    },
  ];

  return (
    <section
      id="clinical"
      className="py-24 px-6 sm:px-8 lg:px-16"
      style={{ backgroundColor: C.creamBg, fontFamily: C.sans, borderBottom: '1px solid rgba(4,35,30,0.06)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ── Left: Timeline ── */}
          <div
            className={`lg:col-span-7 space-y-8 text-left transition-all duration-1000 transform ${
              vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="space-y-3">
              <h2
                className="text-3xl sm:text-4xl font-normal tracking-wide"
                style={{ fontFamily: C.serif, color: C.forestGreen }}
              >
                Professional Credentials
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xl font-light">
                A career defined by academic rigor and a relentless pursuit of surgical excellence.
              </p>
            </div>

            {/* Vertical timeline */}
            <div className="relative pl-8 pt-2 space-y-12">
              {/* Line */}
              <div
                className="absolute left-[9px] top-0 bottom-0 w-[1.5px]"
                style={{ backgroundColor: 'rgba(4,35,30,0.12)' }}
              />

              {timelineItems.map((item, i) => (
                <div
                  key={i}
                  className={`relative space-y-2 transition-all duration-700 transform ${
                    vis ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {/* Gold circle node */}
                  <div
                    className="absolute -left-[31px] top-1.5 w-[21px] h-[21px] rounded-full shadow-sm"
                    style={{
                      backgroundColor: C.gold,
                      border: `4px solid ${C.creamBg}`,
                    }}
                  />

                  <div
                    className="text-[10px] font-bold tracking-widest uppercase"
                    style={{ color: C.gold }}
                  >
                    {item.tag}
                  </div>

                  <h3
                    className="text-lg sm:text-xl font-normal leading-snug tracking-wide"
                    style={{ fontFamily: C.serif, color: C.forestGreen }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed max-w-xl">
                    <span
                      className="font-semibold block mb-0.5"
                      style={{ color: 'rgba(4,35,30,0.75)' }}
                    >
                      {item.institution}
                    </span>
                    {item.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Commitment card ── */}
          <div
            className={`lg:col-span-5 transition-all duration-1000 delay-300 transform ${
              vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div
              className="rounded-[2.5rem] p-10 sm:p-12 shadow-md text-left space-y-6"
              style={{ backgroundColor: C.creamCard, border: '1px solid rgba(4,35,30,0.06)' }}
            >
              {/* Graduation-cap icon */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
                style={{
                  background: 'rgba(184,150,108,0.12)',
                  border: '1px solid rgba(184,150,108,0.28)',
                  color: C.gold,
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M12 14v6" />
                </svg>
              </div>

              <h3
                className="text-2xl font-normal tracking-wide leading-snug"
                style={{ fontFamily: C.serif, color: C.forestGreen }}
              >
                Commitment to Surgical Precision &amp; Lifelong Learning
              </h3>

              <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">
                Dr. Popuri combines her profound academic background with over 10 years of hands-on
                clinical experience, including leadership roles at municipal hospitals and national
                dental clinics, to deliver results that are both functional and biologically sound.
              </p>

              {/* Performance badges */}
              <div
                className="grid grid-cols-2 gap-4 pt-6"
                style={{ borderTop: '1px solid rgba(4,35,30,0.10)' }}
              >
                {[
                  { value: 'Top 1%', label: 'Fellowship Graduates' },
                  { value: 'Global', label: 'Implantology Fellowship' },
                ].map((b, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-4 shadow-sm flex flex-col justify-center"
                    style={{ background: '#fff', border: '1px solid rgba(4,35,30,0.06)' }}
                  >
                    <span
                      className="text-lg font-bold leading-tight"
                      style={{ color: C.gold }}
                    >
                      {b.value}
                    </span>
                    <span className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase mt-1">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
