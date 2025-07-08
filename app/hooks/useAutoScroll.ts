'use client';

import { useEffect, useRef, useCallback } from 'react';

export const useAutoScroll = (sectionIds: string[], delay: number = 5000) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentSectionIndex = useRef(0);
  const isUserScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const scrollToSection = useCallback((index: number) => {
    if (index >= sectionIds.length) {
      currentSectionIndex.current = 0;
    } else if (index < 0) {
      currentSectionIndex.current = sectionIds.length - 1;
    }

    const sectionId = sectionIds[currentSectionIndex.current];
    const element = document.getElementById(sectionId);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      currentSectionIndex.current = (currentSectionIndex.current + 1) % sectionIds.length;
    }
  }, [sectionIds]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Set a flag that user is actively scrolling
    isUserScrolling.current = true;
    
    // Clear any existing scroll timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    // Set a timeout to reset the scrolling flag after scrolling stops
    scrollTimeout.current = setTimeout(() => {
      isUserScrolling.current = false;
    }, 1000); // 1 second after last scroll event
    
    // Reset the auto-scroll timer
    timerRef.current = setTimeout(() => {
      if (!isUserScrolling.current) {
        scrollToSection(currentSectionIndex.current);
      }
    }, delay);
  }, [delay, scrollToSection]);

  useEffect(() => {
    // Initial setup
    resetTimer();

    // Add event listeners
    window.addEventListener('wheel', resetTimer);
    window.addEventListener('touchmove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('mousedown', resetTimer);

    // Cleanup
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      window.removeEventListener('wheel', resetTimer);
      window.removeEventListener('touchmove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('mousedown', resetTimer);
    };
  }, [resetTimer]);

  return { scrollToSection };
};
