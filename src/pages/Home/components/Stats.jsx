import { useState, useEffect } from 'react';

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { value: '500+', label: 'Restored Smiles' },
    { value: '15+',  label: 'Years Experience' },
    { value: '2.5k', label: 'Dental Implants' },
    { value: '100%', label: 'Clinical Precision' },
  ];

  return (
    <section
      className="py-10 px-6 sm:px-8 lg:px-16"
      style={{
        backgroundColor: 'var(--color-forest-green)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        fontFamily: 'var(--font-sans-premium)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`transition-all duration-700 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight leading-none mb-2"
                style={{ color: 'var(--color-gold-accent)' }}
              >
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.65)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
