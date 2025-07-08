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
  const hasScrolled = useRef(false);
  const isUserActive = useRef(true);
  const activityTimer = useRef<NodeJS.Timeout | null>(null);
  const lastScrollPosition = useRef(0);
  const scrollCheckInterval = useRef<NodeJS.Timeout | null>(null);

  // Check if user has scrolled manually
  const checkUserScroll = useCallback(() => {
    const currentPosition = window.pageYOffset;
    // If user scrolled manually (more than 5px difference)
    if (Math.abs(currentPosition - lastScrollPosition.current) > 5) {
      hasScrolled.current = true;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
    lastScrollPosition.current = currentPosition;
  }, []);

  const scrollToNextSection = useCallback(() => {
    if (sectionIds.length === 0 || hasScrolled.current) return;
    
    // Find the first section that's below the current scroll position
    const currentScroll = window.scrollY;
    let nextSection = null;
    
    for (const sectionId of sectionIds) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.pageYOffset;
        
        // If element is below current scroll position
        if (elementTop > currentScroll + 100) { // 100px threshold
          nextSection = element;
          break;
        }
      }
    }

    // If we found a section to scroll to
    if (nextSection) {
      const yOffset = -scrollOffset;
      const y = nextSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ 
        top: y, 
        behavior: 'smooth' 
      });
      
      // Mark as scrolled to prevent further auto-scrolling
      hasScrolled.current = true;
    }
  }, [sectionIds, scrollOffset]);

  const handleUserActivity = useCallback(() => {
    // Reset the activity timer on any user interaction
    if (activityTimer.current) {
      clearTimeout(activityTimer.current);
    }
    
    isUserActive.current = true;
    
    // Set a timeout to consider user inactive after 5 seconds
    activityTimer.current = setTimeout(() => {
      isUserActive.current = false;
    }, 5000);
    
    // If user is active and we haven't scrolled yet, trigger scroll
    if (isUserActive.current && !hasScrolled.current) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(scrollToNextSection, delay);
    }
  }, [delay, scrollToNextSection]);

  useEffect(() => {
    // Start checking for user scroll
    scrollCheckInterval.current = setInterval(checkUserScroll, 100);
    
    // Set up event listeners for user activity
    const events = ['mousemove', 'keydown', 'touchstart', 'click', 'scroll'];
    events.forEach(event => {
      window.addEventListener(event, handleUserActivity, { passive: true });
    });

    // Initial setup
    handleUserActivity();

    return () => {
      // Clean up
      if (timerRef.current) clearTimeout(timerRef.current);
      if (activityTimer.current) clearTimeout(activityTimer.current);
      if (scrollCheckInterval.current) clearInterval(scrollCheckInterval.current);
      
      events.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [handleUserActivity, checkUserScroll]);

  return null;
};

export default AutoScrollSections;
