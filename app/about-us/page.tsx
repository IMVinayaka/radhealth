'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Navigation from '../components/Navigation';
import AutoScrollSections from '../components/AutoScrollSections';

// Import all icons
import cathLabIcon from '../assets/images/rad_health_icons/cath_lab.svg';
import cotaIcon from '../assets/images/rad_health_icons/COTA.svg';
import clsIcon from '../assets/images/rad_health_icons/CLS.svg';
import ctTechIcon from '../assets/images/rad_health_icons/CT_Tech.svg';
import echoTechIcon from '../assets/images/rad_health_icons/Echo_Tech.svg';
import irIcon from '../assets/images/rad_health_icons/IR.svg';
import mltIcon from '../assets/images/rad_health_icons/MLT.svg';
import mtIcon from '../assets/images/rad_health_icons/MT.svg';
import mammographyTechIcon from '../assets/images/rad_health_icons/Mammography_Tech.svg';
import mriTechIcon from '../assets/images/rad_health_icons/MRI_Tech.svg';
import nuclearMedTechIcon from '../assets/images/rad_health_icons/Nuclear_MedTech.svg';
import occupationalTherapistIcon from '../assets/images/rad_health_icons/Occupational_Therapist.svg';
import pharmacistPharmacyTechIcon from '../assets/images/rad_health_icons/Pharmacist_PharmacyTech.svg';
import phlebotomistsIcon from '../assets/images/rad_health_icons/Phlebotomists.svg';
import ptIcon from '../assets/images/rad_health_icons/PT.svg';
import ptaIcon from '../assets/images/rad_health_icons/PTA.svg';
import radiationTherapistIcon from '../assets/images/rad_health_icons/Radiation_Therapist.svg';
import radiologyTechnicianIcon from '../assets/images/rad_health_icons/Radiology_Technician.svg';
import rrtIcon from '../assets/images/rad_health_icons/RRT.svg';
import slpIcon from '../assets/images/rad_health_icons/SLP.svg';
import ultrasoundTechIcon from '../assets/images/rad_health_icons/Ultrasound_Tech.svg';

import radhealth2 from '../assets/images/radhealth2.png';
import radhealth3 from '../assets/images/radhealth3.png';

const healthcareRoles = [
  { title: 'RN', description: 'Registered Nurse Medical Surgical/Tele/OR/ER/PCU/ICU' },
  { title: 'CNA', description: 'Certified Nursing Assistant' },
  { title: 'LVN', description: 'Licensed Vocational Nurse' },
  { title: 'ST', description: 'Surgical Technologists' },
];

const alliedHealthRoles = [
  { icon: cathLabIcon, title: 'Cath Lab Tech' },
  { icon: cotaIcon, title: 'Certified Occupational Therapy Assistant (COTA)' },
  { icon: clsIcon, title: 'Clinical Lab Scientist (CLS)' },
  { icon: ctTechIcon, title: 'CT Tech' },
  { icon: echoTechIcon, title: 'Echo Tech' },
  { icon: irIcon, title: 'Interventional Radiology (IR) / Special Procedures' },
  { icon: mltIcon, title: 'Medical Lab Technologist (MLT)' },
  { icon: mtIcon, title: 'Medical Technologist (MT)' },
  { icon: mammographyTechIcon, title: 'Mammography Tech' },
  { icon: mriTechIcon, title: 'MRI Tech' },
  { icon: nuclearMedTechIcon, title: 'Nuclear Med Tech' },
  { icon: occupationalTherapistIcon, title: 'Occupational Therapist' },
  { icon: pharmacistPharmacyTechIcon, title: 'Pharmacist / Pharmacy Tech' },
  { icon: phlebotomistsIcon, title: 'Phlebotomists' },
  { icon: ptIcon, title: 'Physical Therapist (PT)' },
  { icon: ptaIcon, title: 'Physical Therapy Assistant (PTA)' },
  { icon: radiationTherapistIcon, title: 'Radiation Therapist' },
  { icon: radiologyTechnicianIcon, title: 'Radiology Technician' },
  { icon: rrtIcon, title: 'Registered Respiratory Therapist (RRT)' },
  { icon: slpIcon, title: 'Speech Language Pathologist (SLP)' },
  { icon: ultrasoundTechIcon, title: 'Ultrasound Tech / Sonographer & Vascular Tech' },
];

const sectionIds = ['about-mission'];

export default function AboutUsPage() {
  // Parallax effects
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start']
  });

  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <AutoScrollSections sectionIds={sectionIds} delay={8000} scrollOffset={80} />
      
      {/* Hero Section with Parallax */}
      <section 
        id="about-hero"
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
                Who We Are
              </motion.span>
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                About <span className="text-primary-extraLight">Radiant Health Staffing</span>
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-primary-extraLight/90 max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Connecting healthcare professionals with rewarding career opportunities
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

      {/* Intro Section */}
      <section id="about-mission" className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Partnering with Healthcare Facilities Nationwide
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Our organization has established partnerships with healthcare facilities and practices
                  throughout the United States, providing a diverse range of candidates for healthcare
                  professionals including nurses and other allied health.
                </p>
                <p>
                  Our dedicated team possesses the expertise and clinical insight necessary to align the
                  unique skills with placements that will maximize the potential and ensure a positive work
                  environment at each location.
                </p>
                <p>
                  We are placing some of the most crucial healthcare roles that make a difference in the lives
                  of those in need. These roles are not just jobs, they are opportunities to make a real impact,
                  to offer comfort and healing, to be the guiding light in someone's darkest hour.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-xl"
            >
              <Image 
                src={radhealth2}
                alt="Healthcare Team"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nursing Opportunities */}
      <section id="about-team" className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Exceptional Individuals, Exceptional Care
            </h2>
            <p className="text-gray-700">
              Attention all Registered Nurses (RNs), Licensed Practical Nurses (LPNs), and Travel
              Nurses! If you are interested in exploring new opportunities to travel, enhance your
              professional growth, and positively impact patient care, we invite you to consider exploring
              the field of travel nursing.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center mt-16">
            <motion.div
              className="relative h-96 rounded-lg overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Image 
                src={radhealth3}
                alt="Nursing Team"
                fill
                className="object-contain"
              />
            </motion.div>

            <motion.div 
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
              viewport={{ once: true }}
            >
              {healthcareRoles.map((role, index) => (
                <motion.div 
                  key={role.title}
                  className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold text-red-600 mb-2">{role.title}</h3>
                  <p className="text-gray-700">{role.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Allied Health Section */}
      <section id="about-values" className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Exploring Opportunities in Allied Health Professions
            </h2>
            <p className="text-gray-700">
              We are fortunate to have strong connections with healthcare facilities and practices
              throughout the country, providing a diverse range of allied health job opportunities. Our
              dedicated team members have the expertise and clinical understanding to effectively align
              your skills with practices that will fully utilize your abilities.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {alliedHealthRoles.map((role, index) => (
              <motion.div 
                key={role.title}
                className="group relative h-48 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center transition-all duration-300 group-hover:opacity-0">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center">
                    <Image 
                      src={role.icon} 
                      alt={role.title}
                      width={64}
                      height={64}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900">{role.title}</h3>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-blue-600 p-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-medium text-center text-sm">{role.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-extraLight">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-text-dark mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Advance Your Healthcare Career?
          </motion.h2>
          <motion.p 
            className="text-xl text-text-muted mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Join our network of healthcare professionals and discover rewarding opportunities
            that match your skills and career goals.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <button className="bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors">
              Join Our Team
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
