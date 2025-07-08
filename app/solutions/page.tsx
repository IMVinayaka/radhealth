'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import AutoScrollSections from '../components/AutoScrollSections';
import { FaCheck } from 'react-icons/fa';
import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

// Import images
import serviceHero from '../assets/images/radhealth2.png';

const ServiceSection = () => {
  // Section IDs for auto-scrolling
  const sectionIds = ['solutions-main'];

  // Add parallax ref and scroll controls
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start']
  });

  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const services = {
    clinical: [
      "Registered Nurses (ICU, Med-Surg, OR, ER, Psych, Tele, etc.)",
      "Advanced Practice Providers (NPs, PAs, CRNAs)",
      "Physicians (MD/DO)",
      "Certified Nursing Assistants & LPNs",
      "Allied Health Professionals (PT, OT, RT, Lab Techs, Radiology, etc.)",
      "Travel Nurses & Rapid Response Teams"
    ],
    nonClinical: [
      "Medical Coders & Billers",
      "Patient Access & Scheduling",
      "HIM & Front Office Support",
      "Revenue Cycle & Claims Specialists",
      "EHR Support Staff"
    ],
    allied: [
      "Speech & Language Pathologists (SLPs)",
      "Occupational Therapists (OTs)",
      "Physical Therapists (PTs)",
      "Respiratory Therapists",
      "Radiologic and MRI Techs",
      "LCSWs, Therapists, Counselors"
    ]
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen">
     
      <AutoScrollSections sectionIds={sectionIds} delay={5000} scrollOffset={80} />
      
      {/* Enhanced Hero Section with Parallax */}
      <section 
        id="solutions-hero"
        ref={targetRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark"
          style={{ 
            scale,
            y: yBg,
            opacity,
          }}
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          
          {/* Floating Elements */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm"
            animate={{
              y: [0, -20, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm"
            animate={{
              y: [0, 30, 0],
              x: [0, -20, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </motion.div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            style={{ y: yText }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span 
                className="inline-block text-primary-extraLight text-lg md:text-xl mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Our Expertise
              </motion.span>
              <motion.h1 
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Healthcare Staffing Services
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-primary-extraLight/90 max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Delivering exceptional healthcare professionals when and where you need them
              </motion.p>

            </motion.div>
          </motion.div>
        </div>

        {/* Animated Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-white text-sm mb-2">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section 
        id="solutions-main"
        className="py-16 md:py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                End-to-End Healthcare Workforce 
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                We offer comprehensive healthcare staffing services designed to meet your clinical, 
                operational, and compliance needs—no matter how complex or urgent.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">What We Offer:</h3>
                <ul className="space-y-3">
                  {[
                    "Clinical Staffing",
                    "Allied & Behavioral Health Staffing",
                    "Non-Clinical & Administrative Support",
                    "Government & Public Health Staffing",
                    "Customized Workforce"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheck className="text-primary mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div 
              className="lg:w-1/2 relative h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Image 
                src={serviceHero} 
                alt="Healthcare Solutions"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>

          {/* Service Categories */}
          <div className="mt-20">
            <motion.h3 
              className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Detailed Service Categories
            </motion.h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Clinical Staffing */}
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-semibold text-primary mb-4">Clinical Staffing</h4>
                <ul className="space-y-3">
                  {services.clinical.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Non-Clinical */}
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-semibold text-primary mb-4">Non-Clinical & Admin</h4>
                <ul className="space-y-3">
                  {services.nonClinical.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Allied Health */}
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 md:col-span-2 lg:col-span-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-semibold text-primary mb-4">Allied & Behavioral Health</h4>
                <ul className="space-y-3">
                  {services.allied.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ServiceSection;
