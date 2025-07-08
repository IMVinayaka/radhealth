'use client';

import { useState, useEffect } from 'react';

export function useParallax(threshold = 0.2) {
  const [scrollY, setScrollY] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const element = document.getElementById('approach');
      if (!element) return;

      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const elementHeight = element.offsetHeight;
      const scrollPosition = currentScrollY + window.innerHeight;
      const elementStart = elementTop - (window.innerHeight * (1 - threshold));

      setScrollY(currentScrollY);
      setIsActive(scrollPosition > elementStart + (elementHeight * threshold));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { scrollY, isActive };
}