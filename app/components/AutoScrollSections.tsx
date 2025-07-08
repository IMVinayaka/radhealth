'use client';

import { useEffect, useRef, useCallback } from 'react';

interface AutoScrollSectionsProps {
  sectionIds: string[];
  delay?: number;
  scrollOffset?: number;
}

export const AutoScrollSections = ({
  sectionIds,
  delay = 5000,
  scrollOffset = 0,
}: AutoScrollSectionsProps) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentSectionIndex = useRef(0);
  const isUserScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const scrollToSection = useCallback((index: number) => {
    if (sectionIds.length === 0) return;
    
    if (index >= sectionIds.length) {
      currentSectionIndex.current = 0;
    } else if (index < 0) {
      currentSectionIndex.current = sectionIds.length - 1;
    }

    const sectionId = sectionIds[currentSectionIndex.current];
    const element = document.getElementById(sectionId);
    
    if (element) {
      const yOffset = -scrollOffset;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ 
        top: y, 
        behavior: 'smooth' 
      });
      
      currentSectionIndex.current = (currentSectionIndex.current + 1) % sectionIds.length;
    }
  }, [sectionIds, scrollOffset]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    isUserScrolling.current = true;
    
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    scrollTimeout.current = setTimeout(() => {
      isUserScrolling.current = false;
    }, 1000);
    
    timerRef.current = setTimeout(() => {
      if (!isUserScrolling.current) {
        scrollToSection(currentSectionIndex.current);
      }
    }, delay);
  }, [delay, scrollToSection]);

  useEffect(() => {
    resetTimer();

    const handleUserInteraction = () => {
      resetTimer();
    };

    window.addEventListener('wheel', handleUserInteraction);
    window.addEventListener('touchmove', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);
    window.addEventListener('mousedown', handleUserInteraction);
    window.addEventListener('resize', handleUserInteraction);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      window.removeEventListener('wheel', handleUserInteraction);
      window.removeEventListener('touchmove', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      window.removeEventListener('mousedown', handleUserInteraction);
      window.removeEventListener('resize', handleUserInteraction);
    };
  }, [resetTimer]);

  return null;
};

export default AutoScrollSections;
