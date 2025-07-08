'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navigation from '../components/Navigation';

export default function ClientsPage() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start']
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  const clients = [
    { name: "AHSA - Trio", delay: 0.1 },
    { name: "ARMC - Arrowhead Regional Medical Center", delay: 0.15 },
    { name: "Atrium Health", delay: 0.2 },
    { name: "BrightSpring Health Services", delay: 0.25 },
    { name: "Care New England Health System", delay: 0.3 },
    { name: "Carpenter Technology", delay: 0.35 },
    { name: "Cedars-Sinai Medical Center", delay: 0.4 },
    { name: "Cross Country Healthcare", delay: 0.45 },
    { name: "Evangelical Lutheran Good Samaritan Society", delay: 0.5 },
    { name: "Genesis HealthCare", delay: 0.55 },
    { name: "John Muir Health", delay: 0.6 },
    { name: "KPC Health", delay: 0.65 },
    { name: "Lehigh Valley Health Network", delay: 0.7 },
    { name: "Medefis", delay: 0.75 },
    { name: "Novant Health", delay: 0.8 },
    { name: "Ohio State University", delay: 0.85 },
    { name: "Parkview Health", delay: 0.9 },
    { name: "PIH Health", delay: 0.95 },
    { name: "Providence Medical Center", delay: 1 },
    { name: "Sanford Health", delay: 1.05 },
    { name: "Summa Health", delay: 1.1 },
    { name: "Valleywise Health Medical Center", delay: 1.15 },
    { name: "Wake Forest University Baptist Medical Center", delay: 1.2 }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navigation />
      
      {/* Parallax Hero Section */}
      <motion.section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ perspective: '1px' }}
        ref={targetRef}
      >
        {/* Background layer with parallax effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark"
          style={{ 
            scale,
            y: yBg,
            opacity
          }}
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Valued Clients
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Trusted by leading healthcare institutions nationwide
          </motion.p>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="w-8 h-12 border-2 border-white/50 rounded-2xl flex justify-center p-1">
              <motion.div 
                className="w-1 h-2 bg-white rounded-full"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Clients Content */}
      <section className="relative py-20 bg-white">
        {/* Floating elements for parallax effect */}
        <motion.div 
          className="absolute top-1/4 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-20 w-60 h-60 bg-secondary/10 rounded-full blur-3xl"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-6">Building Lasting Partnerships</h2>
            <p className="text-lg text-gray-700">
              Having successfully completed over 150 projects with 50+ ongoing engagements, we've established ourselves as a trusted partner for healthcare institutions, government agencies, and commercial organizations nationwide. Our commitment to excellence and client satisfaction drives everything we do.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {clients.map((client, index) => (
              <motion.div 
                key={client.name}
                variants={item}
                className="p-6 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="flex items-center h-full">
                  <div className="w-3 h-3 rounded-full bg-primary mr-4 flex-shrink-0"></div>
                  <p className="text-lg font-medium text-text-dark">{client.name}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="mt-24 bg-gradient-to-r from-primary to-primary-dark rounded-2xl mx-4 md:mx-8 p-8 md:p-12 text-center text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to join our growing list of satisfied clients?</h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto text-white/90">
              Let's discuss how we can help your organization achieve its goals with our tailored solutions.
            </p>
            <a 
              href="#contact" 
              className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
      </section>

      <footer className="bg-text-dark text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p> 2024 RadHealth+. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#contact" className="hover:text-primary transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
