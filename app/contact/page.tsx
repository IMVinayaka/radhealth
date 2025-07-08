// app/contact/page.tsx
'use client';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';

type FormData = {
  is_interested: 'Yes' | 'No';
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  message: string;
  consent: boolean;
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success: boolean; message: string} | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    defaultValues: {
      is_interested: 'Yes',
      consent: false
    }
  });

  const onSubmit = async (data: FormData) => {
    if (!data.consent) {
      setSubmitStatus({
        success: false,
        message: 'Please agree to the terms and conditions'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post('/api/contact', data);
      if (response.data.success) {
        setSubmitStatus({
          success: true,
          message: 'Thank you for your message! We will get back to you soon.'
        });
        reset();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: 'An error occurred while submitting the form. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
  

      {/* Locations Grid */}
      <section className="py-16 bg-white mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Locations</h2>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Registered Office */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-48 bg-gradient-to-r from-primary/10 to-primary/5 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl text-primary/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <h3 className="text-xl font-semibold text-white">Registered Office</h3>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <span className="text-gray-700">6750 N. Andrews Ave., Suite 200<br/>Fort Lauderdale, FL 33309</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <a href="tel:9549382800" className="text-gray-700 hover:text-primary transition-colors">954.938.2800</a>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <a href="mailto:info@radgov.com" className="text-gray-700 hover:text-primary transition-colors">info@radgov.com</a>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Operating From */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="h-48 bg-gradient-to-r from-primary/10 to-primary/5 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl text-primary/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <h3 className="text-xl font-semibold text-white">Operating From</h3>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <span className="text-gray-700">101 Morgan Lane, Suite # 304<br/>Plainsboro, NJ 08536</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <a href="tel:9549382800" className="text-gray-700 hover:text-primary transition-colors">954.938.2800</a>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <a href="mailto:info@radgov.com" className="text-gray-700 hover:text-primary transition-colors">info@radgov.com</a>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Form Image */}
              <div className="hidden lg:block relative bg-gradient-to-br from-primary/10 to-primary/5">
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="text-center">
                    <div className="text-6xl text-primary/20 mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">How can we help?</h3>
                    <p className="text-gray-600">Fill out the form and our team will get back to you within 24 hours.</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="p-8 md:p-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h3>
                <p className="text-gray-600 mb-8">We're here to help and answer any questions you might have.</p>
                
                {submitStatus && (
                  <div className={`mb-6 p-4 rounded-lg ${submitStatus.success ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {submitStatus.message}
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="is_interested">
                      Are you interested in our services?
                    </label>
                    <div className="flex space-x-6 mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                          value="Yes"
                          {...register('is_interested')}
                        />
                        <span className="ml-2 text-gray-700">Yes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                          value="No"
                          {...register('is_interested')}
                        />
                        <span className="ml-2 text-gray-700">No</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="first_name">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/70 ${
                          errors.first_name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        {...register('first_name', { required: 'First name is required' })}
                      />
                      {errors.first_name && (
                        <p className="mt-1 text-sm text-red-600">{errors.first_name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="last_name">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/70 ${
                          errors.last_name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        {...register('last_name', { required: 'Last name is required' })}
                      />
                      {errors.last_name && (
                        <p className="mt-1 text-sm text-red-600">{errors.last_name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone_number">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone_number"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/70 ${
                          errors.phone_number ? 'border-red-500' : 'border-gray-300'
                        }`}
                        {...register('phone_number', { 
                          required: 'Phone number is required',
                          pattern: {
                            value: /^[0-9\-\+\(\)\s]+$/,
                            message: 'Please enter a valid phone number'
                          }
                        })}
                      />
                      {errors.phone_number && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone_number.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/70 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Please enter a valid email address'
                          }
                        })}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/70 ${
                          errors.message ? 'border-red-500' : 'border-gray-300'
                        }`}
                        {...register('message', { required: 'Message is required' })}
                      ></textarea>
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <div className="flex items-start">
                        <div className="flex items-center h-5 mt-0.5">
                          <input
                            id="consent"
                            type="checkbox"
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            {...register('consent', { 
                              required: 'You must agree to the terms and conditions'
                            })}
                          />
                        </div>
                        <div className="ml-3">
                          <label htmlFor="consent" className="text-sm text-gray-600">
                            I Consent To Receive SMS Messages From radgov. Related To Job-Related Offers.
                            Message And Data Rates May Apply. Message Frequency Varies. Reply HELP For Help Or STOP To
                            Cancel. By Signing Up, I Agree To The Privacy Policy
                            Located At radgov.com/privacy-policy.
                            <span className="text-red-500">*</span>
                          </label>
                          {errors.consent && (
                            <p className="mt-1 text-sm text-red-600">{errors.consent.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex justify-center items-center px-6 py-3.5 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
          
          <p className="text-sm text-gray-500 text-center mt-8 max-w-3xl mx-auto">
            By providing a telephone number and submitting this form you are consenting to be
            contacted by SMS text message. Message & data rates may apply. You can reply STOP to opt-out
            of further messaging.
          </p>
        </div>
      </section>
    </div>
  );
}