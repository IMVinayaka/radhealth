'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import AutoScrollSections from '../components/AutoScrollSections';
import { FaCheck } from 'react-icons/fa';
import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

// Import images
import serviceHero from '../assets/images/radhealth2.png';
import Approach from '../components/Approach';

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
    <div className="min-h-screen mt-6">
     
      <AutoScrollSections sectionIds={sectionIds} delay={2500} scrollOffset={80} />
      <Approach/>


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
