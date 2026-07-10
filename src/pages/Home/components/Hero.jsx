import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import profileImgFallback from '../../../assets/profile.jpeg';

export default function HeroPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState({
    hero_badge: 'BOARD CERTIFIED PROSTHODONTIST',
    hero_title_left: 'Precision Restorative Care for a ',
    hero_title_gold: 'Lifetime of',
    hero_title_right: 'Smiles.',
    hero_desc: 'Specializing in advanced prosthodontics and implantology to restore function and aesthetic perfection through clinically-driven surgical precision.',
    hero_profile_img: '',
    hero_badge_title: 'MDS PROSTHODONTICS',
    hero_badge_desc: 'Precision Certified Specialist',
  });

  useEffect(() => {
    setIsVisible(true);
    fetch('/api/content')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Failed to load content');
      })
      .then(data => {
        if (data && data.hero_badge) {
          setContent(data);
        }
      })
      .catch(err => console.error('Error fetching hero content:', err));
  }, []);

  const imageSrc = content.hero_profile_img || profileImgFallback;

  return (
    <section
      className="pt-20 pb-28 px-6 sm:px-8 lg:px-16 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-cream-bg)', fontFamily: 'var(--font-sans-premium)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ── Left Content ── */}
          <div
            className={`lg:col-span-7 space-y-8 transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Badge */}
            <span
              className="inline-block text-[10px] font-bold px-4 py-2 rounded-full tracking-widest uppercase shadow-sm border"
              style={{
                background: '#fff',
                borderColor: 'rgba(4,35,30,0.12)',
                color: 'var(--color-forest-green)',
              }}
            >
              {content.hero_badge}
            </span>

            {/* Heading */}
            <h1
              className="text-4xl sm:text-5xl lg:text-[56px] font-normal leading-tight tracking-wide"
              style={{ fontFamily: 'var(--font-serif-elegant)', color: 'var(--color-forest-green)' }}
            >
              {content.hero_title_left}
              <span style={{ color: 'var(--color-gold-accent)', fontStyle: 'italic' }}>
                {content.hero_title_gold}
              </span>
              <br />
              {content.hero_title_right}
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-lg font-light">
              {content.hero_desc}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/book"
                className="font-bold py-3.5 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-[11px] tracking-widest uppercase text-white text-center cursor-pointer"
                style={{ backgroundColor: 'var(--color-forest-green)' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                BOOK A CONSULTATION
              </Link>

              <Link
                to="/gallery"
                className="font-bold py-3.5 px-8 rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 text-[11px] tracking-widest uppercase bg-transparent text-center cursor-pointer"
                style={{ border: '1px solid var(--color-gold-accent)', color: 'var(--color-gold-accent)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'var(--color-gold-accent)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-gold-accent)';
                }}
              >
                VIEW SUCCESS STORIES
              </Link>
            </div>
          </div>

          {/* ── Right Image ── */}
          <div
            className={`lg:col-span-5 relative transition-all duration-1000 delay-300 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative max-w-md mx-auto">

              {/* Dark green offset backdrop */}
              <div
                className="absolute inset-0 rounded-[2.5rem] shadow-xl"
                style={{
                  backgroundColor: 'var(--color-forest-green)',
                  transform: 'translate(12px, 12px)',
                }}
              />

              {/* Profile image */}
              <div
                className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]"
                style={{ backgroundColor: 'var(--color-cream-card)' }}
              >
                <img
                  src={imageSrc}
                  alt="Dr. Chandrika Lakshmi Popuri"
                  className="w-full h-auto object-cover aspect-[4/5]"
                />
              </div>

              {/* Floating badge */}
              <div
                className="animate-float absolute -bottom-5 -left-5 z-20 bg-white rounded-2xl shadow-xl p-4 max-w-[260px]"
                style={{ border: '1px solid rgba(184,150,108,0.4)' }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full"
                    style={{ background: 'rgba(184,150,108,0.12)', border: '1px solid rgba(184,150,108,0.4)', color: 'var(--color-gold-accent)' }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className="font-bold text-[11px] tracking-widest uppercase text-left"
                      style={{ color: 'var(--color-forest-green)' }}
                    >
                      {content.hero_badge_title}
                    </h3>
                    <p className="text-gray-500 text-[10px] mt-0.5 leading-tight text-left">
                      {content.hero_badge_desc}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

