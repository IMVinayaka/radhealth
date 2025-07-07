'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../utils/animations';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',  
    message: ''
  });
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Replace with your form submission logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFormStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="section bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-text-dark"
              variants={fadeUp}
            >
              Get In Touch
            </motion.h2>
            <motion.div 
              className="h-1.5 w-20 bg-highlight mx-auto mb-8"
              variants={fadeUp}
            ></motion.div>
            <motion.p 
              className="text-lg text-text-muted max-w-2xl mx-auto"
              variants={fadeUp}
            >
              Have questions or ready to get started? Reach out to our team today.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div variants={fadeUp}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-dark mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-dark mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-dark mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-8 py-4 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  
                  {formStatus === 'success' && (
                    <p className="mt-4 text-green-600">
                      Thank you for your message! We'll get back to you soon.
                    </p>
                  )}
                  
                  {formStatus === 'error' && (
                    <p className="mt-4 text-red-600">
                      Something went wrong. Please try again later.
                    </p>
                  )}
                </div>
              </form>
            </motion.div>
            
            <motion.div 
              className="bg-primary-extraLight rounded-2xl p-8 md:p-12 h-full"
              variants={fadeUp}
            >
              <h3 className="text-2xl font-bold text-text-dark mb-8">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
                      Phone
                    </h4>
                    <a href="tel:+19549382800" className="block text-lg text-text-dark hover:text-primary transition-colors">
                      +1 (954) 938-2800
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
                      Email
                    </h4>
                    <a href="mailto:info@radhealth.com" className="block text-lg text-text-dark hover:text-primary transition-colors">
                      info@radhealth.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
                      Address
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <p className="font-semibold">Corporate Headquarters</p>
                        
                        <p>1500 W Cypress Creek Rd, Suite #415</p>
                        <p>Fort Lauderdale, FL 33309</p>
                        <a href="tel:+19549382800" className="text-primary hover:underline">+1 (954) 938-2800</a>
                      </div>
                      <div className="pt-2">
                        <p className="font-semibold">Northeast Operations Center</p>
                        <p>101 Morgan Lane, Suite 304</p>
                        <p>Plainsboro, NJ 08536</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">
                    Follow Us
                  </h4>
                  <div className="flex space-x-4">
                    {[
                      { 
                        name: 'LinkedIn', 
                        icon: 'M20 3H4a1 1 0 00-1 1v16a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1zM8 18H5v-8h3v8zM6.5 8.25a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zM19 18h-3v-4.5c0-1.1-.9-2-2-2s-2 .9-2 2V18h-3v-8h3v1.5s.7-1.5 2.5-1.5 3.5 1 3.5 3.5V18z',
                        url: 'https://www.linkedin.com/company/radhealth/?viewAsMember=true'
                      },
                      { 
                        name: 'Facebook', 
                        icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
                        url: 'https://www.facebook.com/radhealth/'
                      },
                      { 
                        name: 'Instagram', 
                        icon: 'M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.04 0 2.67.01 2.986.058 4.04.045.977.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.04.058 2.67 0 2.986-.01 4.04-.058.977-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.04 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.048-1.37-.059-4.04-.059zm0 3.18a4.62 4.62 0 110 9.24 4.62 4.62 0 010-9.24zm0 7.62a3 3 0 110-6 3 3 0 010 6zm7.5-12.3a1.08 1.08 0 110-2.16 1.08 1.08 0 010 2.16z',
                        url: 'https://www.instagram.com/radhealth_/?hl=en'
                      },
                      { 
                        name: 'Twitter', 
                        icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
                        url: 'https://x.com/RADHealth_'
                      },
                    ].map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-primary transition-colors"
                        aria-label={social.name}
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d={social.icon} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
