import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToAnchor() {
  const { pathname, hash } = useLocation();

  // Always scroll to top when the route path changes (no hash navigation)
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  // Scroll to anchor element when a hash is present
  // Retries up to 10 times in case the page hasn't rendered the element yet
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (attempts < 10) {
          setTimeout(() => tryScroll(attempts + 1), 80);
        }
      };
      setTimeout(() => tryScroll(), 100);
    }
  }, [pathname, hash]);

  return null;
}
