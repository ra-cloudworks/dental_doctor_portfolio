import { useState } from 'react';
import { Link } from 'react-router-dom';

const C = {
  creamBg:     'var(--color-cream-bg)',
  forestGreen: 'var(--color-forest-green)',
  gold:        'var(--color-gold-accent)',
  serif:       'var(--font-serif-elegant)',
  sans:        'var(--font-sans-premium)',
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'CLINICAL PROFILE', href: '/#clinical' },
    { label: 'SPECIALTIES',      href: '/specialties' },
    { label: 'IMPLANTOLOGY',     href: '/specialties#implantology' },
    { label: 'CLINICAL GALLERY', href: '/gallery' },
    { label: 'PATIENT RESOURCES',href: '/book#faq' },
  ];

  return (
    <nav
      className="sticky top-0 z-50 shadow-sm"
      style={{
        backgroundColor: 'rgba(250,246,240,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(4,35,30,0.06)',
        fontFamily: C.sans,
      }}
    >
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-16 py-4 flex justify-between items-center gap-6">

        {/* Brand */}
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="text-xs sm:text-sm font-bold tracking-widest uppercase transition-opacity duration-200 hover:opacity-70"
            style={{ color: C.forestGreen }}
          >
            Dr. Chandrika Lakshmi Popuri
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2 z-50"
          onClick={() => setIsOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="w-6 h-0.5 rounded transition-all duration-300"
              style={{
                backgroundColor: C.forestGreen,
                ...(i === 0 && isOpen ? { transform: 'rotate(45deg) translateY(8px)' } : {}),
                ...(i === 1 && isOpen ? { opacity: 0 } : {}),
                ...(i === 2 && isOpen ? { transform: 'rotate(-45deg) translateY(-8px)' } : {}),
              }}
            />
          ))}
        </button>

        {/* Desktop nav links */}
        <ul className="hidden md:flex gap-8 lg:gap-10 flex-1 justify-center">
          {menuItems.map((item, i) => (
            <li key={i}>
              <Link
                to={item.href}
                className="block py-1 font-bold text-[11px] tracking-widest uppercase transition-colors duration-300"
                style={{ color: 'rgba(4,35,30,0.80)' }}
                onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(4,35,30,0.80)')}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Book button */}
        <div className="hidden md:block flex-shrink-0">
          <Link
            to="/book"
            className="inline-block font-bold py-2.5 px-6 rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 text-[11px] tracking-widest uppercase text-white text-center cursor-pointer"
            style={{ backgroundColor: C.forestGreen }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            BOOK CONSULTATION
          </Link>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? '24rem' : 0 }}
      >
        <ul
          className="px-6 py-4 space-y-1"
          style={{ borderBottom: '1px solid rgba(4,35,30,0.08)', backgroundColor: 'rgba(250,246,240,0.97)' }}
        >
          {menuItems.map((item, i) => (
            <li key={i}>
              <Link
                to={item.href}
                className="block px-2 py-3 font-bold text-[11px] tracking-widest uppercase"
                style={{ color: 'rgba(4,35,30,0.80)', borderBottom: '1px solid rgba(4,35,30,0.06)' }}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-2 pb-1">
            <Link
              to="/book"
              className="block w-full font-bold py-3 px-6 rounded-full text-[11px] tracking-widest uppercase text-white text-center cursor-pointer"
              style={{ backgroundColor: C.forestGreen }}
              onClick={() => setIsOpen(false)}
            >
              BOOK CONSULTATION
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
