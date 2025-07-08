'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '../components/Navigation';

// Client Card Component
const ClientCard = ({ name, delay, index }: { name: string; delay: number; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  // Staggered animation based on index
  const staggeredDelay = 0.1 * (index % 3);
  
  return (
    <motion.div
      ref={ref}
      className="relative group overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.6, 
          delay: delay + staggeredDelay,
          ease: "easeOut"
        } 
      } : {}}
      whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(0, 140, 149, 0.2)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="p-6 sm:p-8 relative z-10 h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {name.split(' - ')[0]}
            </h3>
            {name.includes(' - ') && (
              <p className="mt-1 text-gray-600 dark:text-gray-300 text-sm">
                {name.split(' - ')[1]}
              </p>
            )}
          </div>
        </div>
        <motion.div 
          className="h-0.5 bg-gradient-to-r from-primary/0 via-primary to-primary/0 w-1/2 mx-auto mt-4"
          initial={{ width: 0 }}
          animate={isInView ? { 
            width: '50%',
            transition: { 
              duration: 0.8, 
              delay: delay + 0.2 + staggeredDelay,
              ease: "easeOut"
            } 
          } : {}}
        />
      </div>
    </motion.div>
  );
};

export default function ClientsPage() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start']
  });

  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        ref={targetRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
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

        {/* Hero Content */}
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
                Our Valued Partners
              </motion.span>
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Trusted by <span className="text-primary-extraLight">Healthcare Leaders</span>
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-primary-extraLight/90 max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Partnering with top healthcare facilities to deliver exceptional staffing solutions
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
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

      {/* Clients Grid Section */}
      <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        {/* Floating background elements */}
        <motion.div 
          className="absolute -top-40 -left-40 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 dark:opacity-30"
          animate={{
            y: [0, -30, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary/10 dark:bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20"
          animate={{
            y: [0, 30, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our <span className="text-primary">Valued</span> Clients
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              We're proud to partner with leading healthcare institutions across the nation
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {clients.map((client, index) => (
              <ClientCard 
                key={client.name} 
                name={client.name} 
                delay={index * 0.05} 
                index={index} 
              />
            ))}
          </div>

          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Interested in becoming a client?
            </p>
            <motion.a
              href="/contact"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary-dark transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
