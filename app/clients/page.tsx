'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '../components/Navigation';
import AutoScrollSections from '../components/AutoScrollSections';

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
      <div className="p-3 sm:p-6 relative z-10 h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-md font-[500] text-gray-900 dark:text-white">
              {name}
            </h3>
            
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
  const sectionIds = [ 'clients-featured'];
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
   
    { name: "Cedars-Sinai Medical Center", delay: 0.4 },
    { name: "Cross Country Healthcare", delay: 0.45 },
    { name: "Evangelical Lutheran Good Samaritan Society", delay: 0.5 },
    { name: "Genesis HealthCare", delay: 0.55 },
    { name: "John Muir Health", delay: 0.6 },
  
    { name: "Lehigh Valley Health Network", delay: 0.7 },

    { name: "Novant Health", delay: 0.8 },
    { name: "Ohio State University", delay: 0.85 },

    { name: "PIH Health", delay: 0.95 },
    { name: "Providence Medical Center", delay: 1 },

    { name: "Summa Health", delay: 1.1 },
    { name: "Valleywise Health Medical Center", delay: 1.15 },
    { name: "Wake Forest University Baptist Medical Center", delay: 1.2 }
  ];

  return (
    <div className="min-h-screen  section bg-white/50 backdrop-blur-sm py-20" >
      <AutoScrollSections sectionIds={sectionIds} delay={2500} scrollOffset={80} />
      


      <section id="clients-featured" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-semibold text-center mb-12 text-[#0a3951]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Valued Clients
            <div className="h-1.5 max-w-[10rem] bg-highlight mt-3 mx-auto mb-8"></div>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {clients.map((client, index) => (
              <ClientCard 
                key={client.name} 
                name={client.name} 
                delay={index * 0.05} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </section>



    </div>
  );
}
