'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '../utils/animations';
import Link from 'next/link';
// import Link from 'next/link';

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={'/hero.mp4'} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light/20 to-primary-extraLight/90"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto text-center relative z-10 px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-5xl mx-auto"
        >
          <motion.h1 
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-primary mb-6"
            variants={fadeUp}
          >
            Your Partner in Healthcare Workforce Excellence
          </motion.h1>
          
          <motion.div 
            className="mt-48 flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeUp}
          >
            <Link 
              href="/about-us" 
              className="px-8 py-3 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
 
          </motion.div>
          

        </motion.div>
      </div>
    </section>
  );
}
