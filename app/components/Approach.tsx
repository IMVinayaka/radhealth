'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../utils/animations';
import Image from 'next/image';

export default function Approach() {
  const approachItems = [
    {
      title: 'Talent Acquisition',
      description: 'We source and vet top healthcare professionals across all specialties, ensuring only the most qualified candidates join your team.',
      image: 'https://t3.ftcdn.net/jpg/13/31/61/44/240_F_1331614422_fnsLmQQoNWqwjThpaBYXtCR6H5B389ba.jpg',
      alt: 'Healthcare professionals team'
    },

    {
      title: '24/7 Support',
      description: 'Our dedicated team is always available to address your staffing needs, day or night.',
      image: 'https://t3.ftcdn.net/jpg/15/18/62/48/240_F_1518624811_haFrldwrki82XEkWRx9lcSgggad3wf7e.jpg',
      alt: '24/7 support team'
    }
  ];

  return (
    <section id="approach" className="section bg-white/50 backdrop-blur-sm py-20">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="max-w-6xl mx-auto text-center"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-text-dark mb-6"
            variants={fadeUp}
          >
            RadHealth<sup>+</sup>'s Comprehensive
            <span className="block text-primary mt-2">Healthcare Staffing Solutions</span>
          </motion.h2>
          
          <motion.div 
            className="h-1.5 w-20 bg-highlight mx-auto mb-12"
            variants={fadeUp}
          />
          
          <motion.p 
            className="text-lg text-text-muted max-w-4xl mx-auto mb-16"
            variants={fadeUp}
          >
            At RadHealth<sup>+</sup>, we're redefining healthcare staffing by connecting exceptional 
            talent with healthcare organizations that need them most. Our approach combines 
            cutting-edge technology with personalized service to deliver staffing solutions 
            that make a real difference.
          </motion.p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {approachItems.map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeUp}
                className="flex flex-col"
              >
                <div className="relative h-[20rem] w-full overflow-hidden rounded-t-xl">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  />
                </div>
                <div className="bg-white p-6 rounded-b-xl shadow-md hover:shadow-lg transition-shadow flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-text-dark mb-4">{item.title}</h3>
                  <p className="text-text-muted mb-6 flex-1">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-16"
            variants={fadeUp}
          >
            <a 
              href="#contact" 
              className="inline-flex items-center px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors"
            >
              Get Started with RadHealth<sup>+</sup>
              <svg 
                className="ml-2 w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
