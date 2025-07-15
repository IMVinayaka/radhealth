'use client';

import React, { useRef } from 'react'
import { motion, useScroll } from 'framer-motion';

// Import all icons
const cathLabIcon = '/rad_health_icons/cath_lab.svg';
const cotaIcon = '/rad_health_icons/COTA.svg';
const clsIcon = '/rad_health_icons/CLS.svg';
const ctTechIcon = '/rad_health_icons/CT_Tech.svg';
const echoTechIcon = '/rad_health_icons/Echo_Tech.svg';
const irIcon = '/rad_health_icons/IR.svg';
const mltIcon = '/rad_health_icons/MLT.svg';
const mtIcon = '/rad_health_icons/MT.svg';
const mammographyTechIcon = '/rad_health_icons/Mammography_Tech.svg';
const mriTechIcon = '/rad_health_icons/MRI_Tech.svg';
const nuclearMedTechIcon = '/rad_health_icons/Nuclear_MedTech.svg';
const occupationalTherapistIcon = '/rad_health_icons/Occupational_Therapist.svg';
const pharmacistPharmacyTechIcon = '/rad_health_icons/Pharmacist_PharmacyTech.svg';
const phlebotomistsIcon = '/rad_health_icons/Phlebotomists.svg';
const ptIcon = '/rad_health_icons/PT.svg';
const ptaIcon = '/rad_health_icons/PTA.svg';
const radiationTherapistIcon = '/rad_health_icons/Radiation_Therapist.svg';
const radiologyTechnicianIcon = '/rad_health_icons/Radiology_Technician.svg';
const rrtIcon = '/rad_health_icons/RRT.svg';
const ultrasoundTechIcon = '/rad_health_icons/Ultrasound_Tech.svg';
import Image from 'next/image';
import Link from 'next/link';


const CareersPage = () => {
    // Parallax effects
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ['start start', 'end start']
    });
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
    // { icon: slpIcon, title: 'Speech Language Pathologist (SLP)' },
    { icon: ultrasoundTechIcon, title: 'Ultrasound Tech / Sonographer & Vascular Tech' },
  ];

  return (

    <section id="about-values" className="min-h-screen  section bg-white/50 backdrop-blur-sm py-20 mt-24">

      <div   className='flex items-end justify-end mx-24' >
        <Link className="max-w-max  bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors" href="/open-jobs">Open Jobs</Link>
      </div>
      <div className="container mx-auto px-4">
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
  )
}

export default CareersPage