import { useState, useEffect } from 'react';

// Definimos los breakpoints estándar de la industria (puedes ajustarlos)
const breakpoints = {
  isMobile: '(max-width: 767px)',
  isTablet: '(min-min-width: 768px) and (max-width: 1023px)',
  isDesktop: '(min-width: 1024px) and (max-width: 1919px)',
  isLargeDesktop: '(min-width: 1920px) and (max-width: 2559px)',
  isTV: '(min-width: 2560px)',
};

const useBreakpoint = () => {
  const [device, setDevice] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
    isTV: false,
    current: 'desktop', // fallback semántico
  });

  useEffect(() => {
    const handlers = Object.entries(breakpoints).map(([key, query]) => {
      const mql = window.matchMedia(query);

      const handler = (e: MediaQueryListEvent | MediaQueryList) => {
        if (e.matches) {
          setDevice((prev) => ({
            ...prev,
            // Ponemos todos en false y solo el activo en true
            isMobile: false,
            isTablet: false,
            isDesktop: false,
            isLargeDesktop: false,
            isTV: false,
            [key]: true,
            current: key.replace('is', '').toLowerCase(),
          }));
        }
      };

      // Registro inicial
      handler(mql);

      // Suscripción al cambio de media query
      mql.addEventListener('change', handler);

      return { mql, handler };
    });

    // Limpieza de memoria (Senior tip: siempre limpiar listeners)
    return () => {
      handlers.forEach(({ mql, handler }) => {
        mql.removeEventListener('change', handler);
      });
    };
  }, []);

  return device;
};

export default useBreakpoint;