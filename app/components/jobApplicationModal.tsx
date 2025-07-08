// app/components/JobApplicationModal.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitJobApplication, submitCertification } from '../services/jobService';

const CERT_OPTIONS = [
  "ABOR", "ACLR", "BLS", "LPN", "NBSTSA", 
  "NIHSS", "PALS", "RN", "Others"
];

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  jobId: string;
}

interface Certification {
  id: number;
  name: string;
  file: File | null;
}

export default function JobApplicationModal({ 
  isOpen, 
  onClose,
  jobTitle,
  jobId
}: JobApplicationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
    resume: null as File | null,
  });
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      mobile: '',
      message: '',
      resume: null,
    });
    setCertifications([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const addCertification = () => {
    if (certifications.length >= 5) {
      setSubmitStatus({
        type: 'error',
        message: 'You can only add up to 5 certifications.'
      });
      return;
    }

    setCertifications(prev => [
      ...prev,
      { id: Date.now(), name: '', file: null }
    ]);
  };

  const removeCertification = (id: number) => {
    setCertifications(prev => prev.filter(cert => cert.id !== id));
  };

  const handleCertificationChange = (id: number, field: 'name' | 'file', value: string | File | null) => {
    setCertifications(prev => 
      prev.map(cert => 
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.mobile || !formData.resume) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all required fields and upload your resume.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    
    try {
      // Prepare main application form data
      const formDataToSend = new FormData();
      formDataToSend.append('FullName', formData.name);
      formDataToSend.append('emailID', formData.email);
      formDataToSend.append('MobileNumber', formData.mobile);
      formDataToSend.append('Message', formData.message || '');
      formDataToSend.append('JobID', jobId);
      
      if (formData.resume) {
        formDataToSend.append('FILE', formData.resume);
      }

      // Submit main application
      const appResponse = await submitJobApplication(formDataToSend);

      if (!appResponse.success) {
        throw new Error(appResponse.message || 'Failed to submit application');
      }

      // Submit certifications if any
      if (certifications.length > 0) {
        const certPromises = certifications
          .filter(cert => cert.name && cert.file)
          .map(async (cert) => {
            const certFormData = new FormData();
            certFormData.append('emailID', formData.email);
            certFormData.append('JobID', jobId);
            certFormData.append('CertificateName', cert.name);
            certFormData.append('FILE', cert.file as Blob);
            
            return submitCertification(certFormData);
          });

        const certResults = await Promise.all(certPromises);
        const failedCerts = certResults.filter(result => !result.success);
        
        if (failedCerts.length > 0) {
          console.warn('Some certifications failed to upload:', failedCerts);
        }
      }

      // Show success message
      setSubmitStatus({
        type: 'success',
        message: 'Application submitted successfully!',
      });

      // Reset form and close modal after delay
      resetForm();
      setTimeout(() => {
        onClose();
        setSubmitStatus({ type: null, message: '' });
      }, 2000);

    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'An error occurred while submitting your application.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Apply for {jobTitle}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={isSubmitting}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {submitStatus.type && (
            <div className={`mb-4 p-3 rounded-md ${
              submitStatus.type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/70"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/70"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/70"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                  Resume <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded-md transition-colors"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">PDF, DOC, DOCX (Max 5MB)</p>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Cover Letter (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/70"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Certifications (Optional)
                </label>
                <button
                  type="button"
                  onClick={addCertification}
                  className="text-sm text-primary hover:text-primary-dark font-medium flex items-center"
                  disabled={isSubmitting || certifications.length >= 5}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Certification
                </button>
              </div>
              
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex items-start space-x-2 bg-gray-50 p-3 rounded-md">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                      <select
                        value={cert.name}
                        onChange={(e) => handleCertificationChange(cert.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/70 text-sm bg-white"
                        disabled={isSubmitting}
                      >
                        <option value="">Select certification</option>
                        {CERT_OPTIONS.map((certType) => (
                          <option key={certType} value={certType}>
                            {certType}
                          </option>
                        ))}
                      </select>
                      
                      <div className="relative">
                        <input
                          type="file"
                          onChange={(e) => 
                            handleCertificationChange(
                              cert.id, 
                              'file', 
                              e.target.files && e.target.files[0] ? e.target.files[0] : null
                            )
                          }
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1 rounded-md transition-colors"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => removeCertification(cert.id)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                      disabled={isSubmitting}
                      aria-label="Remove certification"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2.5 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Application'
                )}
              </button>
              
              <p className="mt-3 text-xs text-gray-500 text-center">
                By submitting this application, you agree to our{' '}
                <a href="/privacy-policy" className="text-primary hover:underline">privacy policy</a> and{' '}
                <a href="/terms" className="text-primary hover:underline">terms of service</a>.
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}