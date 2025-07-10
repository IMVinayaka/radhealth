'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import AutoScrollSections from '../components/AutoScrollSections';



import radhealth2 from '../assets/images/radhealth2.png';
import radhealth3 from '../assets/images/radhealth3.png';

const healthcareRoles = [
  { title: 'RN', description: 'Registered Nurse Medical Surgical/Tele/OR/ER/PCU/ICU' },
  { title: 'CNA', description: 'Certified Nursing Assistant' },
  { title: 'LVN', description: 'Licensed Vocational Nurse' },
  { title: 'ST', description: 'Surgical Technologists' },
];


const sectionIds = ['about-mission'];

export default function AboutUsPage() {
  // Parallax effects
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start']
  });



  return (
    <div className="min-h-screen ">
    
      <AutoScrollSections sectionIds={sectionIds} delay={2500} scrollOffset={80} />
      


      {/* Intro Section */}
      <section id="about-mission" className=" md:py-20 px-4 py-20  backdrop-blur-sm bg-white/50">
        <div className="container mx-auto section ">
          <div className="grid md:grid-cols-2 gap-12 items-center   ">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Healthcare Professional Services
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
                className="object-contain"
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
                  <h3 className="text-2xl font-bold text-primary mb-2">{role.title}</h3>
                  <p className="text-gray-700">{role.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      {/* <section className="py-16 bg-primary-extraLight">
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
      </section> */}
    </div>
  );
}
