'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Opportunities', href: '#opportunities' },
  { name: 'Leadership', href: '#leadership' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-extrabold text-primary">
         <Image src="/rad-health-logo-v1.png" alt="Logo" width={150} height={10} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href}
              className={`font-medium hover:text-primary transition-colors ${
                pathname === link.href ? 'text-primary' : 'text-text-dark'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="#contact"
            className="ml-4 px-4 py-2 border-2 border-primary text-primary font-medium rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            Get in touch
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-text-dark"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col space-y-1.5">
            <span className={`block h-0.5 bg-text-dark transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-0.5 bg-text-dark ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block h-0.5 bg-text-dark transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="px-4 py-2 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#contact"
                className="block w-full text-center py-2 border-2 border-primary text-primary font-medium rounded-full hover:bg-primary hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Get in touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
