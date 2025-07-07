'use client';

import { motion } from 'framer-motion';
import { fadeUp, float } from '../utils/animations';

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
          <source src="https://v.ftcdn.net/12/76/07/32/700_F_1276073215_VtqPBvqMUxgbKmTUBTstOo17ewrYrAkM_ST.mp4" type="video/mp4" />
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
          {/* <motion.p 
            className="text-lg sm:text-xl font-medium bg-white/10 text-justify  tracking-wide max-w-4xl mx-auto mb-8"
            variants={fadeUp}
          >
            RadHealth+ empowers hospitals, health systems, and government healthcare programs with top-tier clinical and non-clinical professionals—rapidly deployed, fully credentialed, and ready to make an impact.
          </motion.p> */}
          
          <motion.div 
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeUp}
          >
            <a 
              href="#contact" 
              className="px-8 py-3 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-colors"
            >
              Get Started
            </a>
            <a 
              href="#services" 
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors"
            >
              Our Services
            </a>
          </motion.div>
          
          <motion.div 
            className="mt-16"
            variants={float}
            initial="initial"
            animate="animate"
          >
            <svg 
              className="w-8 h-8 mx-auto text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
