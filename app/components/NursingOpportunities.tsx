'use client';

import { motion } from 'framer-motion';
import { fadeUp, slideIn } from '../utils/animations';

export default function WhyChooseUs() {
  const benefits = [
    {
      title: 'Backed by RadGov’s Legacy',
      description: 'Leveraging years of government contracting excellence'
    },
    {
      title: 'Comprehensive Staffing Solutions',
      description: 'Clinical, allied health, and support staffing under one roof'
    },
    {
      title: 'Rapid Response',
      description: 'Quick deployment, even in crisis situations'
    },
    {
      title: 'Nationwide Coverage',
      description: 'Local insight with national reach'
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock recruiting and client support'
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
            Why Choose RadHealth<sup>+</sup>
          </h2>
          <div className="h-1.5 w-20 bg-highlight mx-auto mb-8"></div>
          <p className="text-lg text-text-muted max-w-3xl mx-auto">
            We're not just staffing shifts—we're sustaining healthcare delivery with excellence and reliability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={index * 0.1}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-dark mb-2">{benefit.title}</h3>
                  <p className="text-text-muted">{benefit.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="inline-grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary">100+</div>
              <div className="text-text-muted">Specialties Staffed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-text-muted">Response Capability</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-text-muted">Credentialing Compliance</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-text-muted">U.S. States Covered</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
