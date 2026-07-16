import { useCallback, useRef } from 'react';

export default function RippleButton({ children, onClick, className = '', variant = 'primary', size = 'md', ...props }) {
  const btnRef = useRef(null);

  const baseStyles = 'relative overflow-hidden inline-flex items-center justify-center font-medium transition-all duration-300 cursor-pointer';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-gold to-[#c9a87c] text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'bg-white/10 text-white border border-white/20 hover:bg-white/20 active:scale-[0.98]',
    ghost: 'text-gold hover:bg-gold/10 active:scale-[0.98]',
    dark: 'bg-forest-green text-white hover:bg-[#062e27] active:scale-[0.98]',
    outline: 'border-2 border-gold text-gold hover:bg-gold hover:text-white active:scale-[0.98]',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-sm rounded-xl',
    lg: 'px-8 py-4 text-base rounded-xl',
  };

  const createRipple = useCallback((e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    const diameter = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${e.clientX - rect.left - diameter / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - diameter / 2}px`;
    ripple.className = 'absolute rounded-full bg-white/30 pointer-events-none';
    ripple.style.animation = 'ripple-expand 0.6s ease-out forwards';
    
    const existingRipple = btn.querySelector('.ripple-effect');
    if (existingRipple) existingRipple.remove();
    ripple.classList.add('ripple-effect');
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    if (onClick) onClick(e);
  }, [onClick]);

  return (
    <button
      ref={btnRef}
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.md} ${className}`}
      onClick={createRipple}
      {...props}
    >
      {children}
    </button>
  );
}
