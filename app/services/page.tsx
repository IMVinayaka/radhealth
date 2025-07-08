'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Navigation from '../components/Navigation';

const healthcareRoles = [
  { title: 'RN', description: 'Registered Nurse Medical Surgical/Tele/OR/ER/PCU/ICU' },
  { title: 'CNA', description: 'Certified Nursing Assistant' },
  { title: 'LVN', description: 'Licensed Vocational Nurse' },
  { title: 'ST', description: 'Surgical Technologists' },
];

const alliedHealthRoles = [
  { icon: '/icons/cath_lab.svg', title: 'Cath Lab Tech' },
  { icon: '/icons/COTA.svg', title: 'Certified Occupational Therapy Assistant (COTA)' },
  { icon: '/icons/CLS.svg', title: 'Clinical Lab Scientist (CLS)' },
  { icon: '/icons/CT_Tech.svg', title: 'CT Tech' },
  { icon: '/icons/Echo_Tech.svg', title: 'Echo Tech' },
  { icon: '/icons/IR.svg', title: 'Interventional Radiology (IR) / Special Procedures' },
  { icon: '/icons/MLT.svg', title: 'Medical Lab Technologist (MLT)' },
  { icon: '/icons/MT.svg', title: 'Medical Technologist (MT)' },
  { icon: '/icons/Mammography_Tech.svg', title: 'Mammography Tech' },
  { icon: '/icons/MRI_Tech.svg', title: 'MRI Tech' },
  { icon: '/icons/Nuclear_MedTech.svg', title: 'Nuclear Med Tech' },
  { icon: '/icons/Occupational_Therapist.svg', title: 'Occupational Therapist' },
  { icon: '/icons/Pharmacist_PharmacyTech.svg', title: 'Pharmacist / Pharmacy Tech' },
  { icon: '/icons/Phlebotomists.svg', title: 'Phlebotomists' },
  { icon: '/icons/PT.svg', title: 'Physical Therapist (PT)' },
  { icon: '/icons/PTA.svg', title: 'Physical Therapy Assistant (PTA)' },
  { icon: '/icons/Radiation_Therapist.svg', title: 'Radiation Therapist' },
  { icon: '/icons/Radiology_Technician.svg', title: 'Radiology Technician' },
  { icon: '/icons/RRT.svg', title: 'Registered Respiratory Therapist (RRT)' },
  { icon: '/icons/SLP.svg', title: 'Speech Language Pathologist (SLP)' },
  { icon: '/icons/Ultrasound_Tech.svg', title: 'Ultrasound Tech / Sonographer & Vascular Tech' },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Banner */}
      <section className="relative bg-primary text-white">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/images/radhealth_bg.png" 
            alt="Healthcare Professionals"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 py-24 md:py-32 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Healthcare Professional Services
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-primary-extraLight max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Connecting healthcare professionals with rewarding career opportunities
            </motion.p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 md:py-20 px-4">
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
                src="/images/radhealth2.png" 
                alt="Healthcare Team"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nursing Opportunities */}
      <section className="py-12 md:py-20 bg-gray-50">
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
                src="/images/radhealth3.png" 
                alt="Nursing Team"
                fill
                className="object-cover"
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
      <section className="py-12 md:py-20 bg-gray-50">
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
