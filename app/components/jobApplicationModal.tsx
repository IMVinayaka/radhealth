// app/components/JobApplicationModal.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('mobile', formData.mobile);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('jobId', jobId);
      
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume);
      }

      certifications.forEach((cert, index) => {
        formDataToSend.append(`certifications[${index}][name]`, cert.name);
        if (cert.file) {
          formDataToSend.append(`certifications[${index}][file]`, cert.file);
        }
      });

      // Replace with your API endpoint
      const response = await fetch('/api/job-application', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Application submitted successfully!'
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          mobile: '',
          message: '',
          resume: null,
        });
        setCertifications([]);
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
          setSubmitStatus({ type: null, message: '' });
        }, 2000);
      } else {
        throw new Error(result.message || 'Failed to submit application');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'An error occurred'
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
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {submitStatus.type && (
            <div className={`mb-4 p-3 rounded-md ${
              submitStatus.type === 'success' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary/70"
                  required
                  minLength={2}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary/70"
                  required
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary/70"
                  required
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resume <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="resume"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-primary/10 file:text-primary
                    hover:file:bg-primary/20"
                  accept=".pdf,.doc,.docx,.txt"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Accepted formats: .pdf, .doc, .docx, .txt</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Certifications (Max 5)
                </label>
                <button
                  type="button"
                  onClick={addCertification}
                  className="text-sm text-primary hover:text-primary-dark font-medium"
                >
                  + Add Certification
                </button>
              </div>

              <div className="space-y-3" id="certification-container">
                {certifications.map((cert) => (
                  <div key={cert.id} className="border border-gray-200 rounded-md p-3 relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <select
                          value={cert.name}
                          onChange={(e) => handleCertificationChange(cert.id, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary/70"
                          required
                        >
                          <option value="">Select Certification</option>
                          {CERT_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          onChange={(e) => 
                            handleCertificationChange(
                              cert.id, 
                              'file', 
                              e.target.files && e.target.files[0] ? e.target.files[0] : null
                            )
                          }
                          className="flex-1 text-sm text-gray-500
                            file:mr-2 file:py-1.5 file:px-3
                            file:rounded-md file:border-0
                            file:text-xs file:font-medium
                            file:bg-gray-100 file:text-gray-700
                            hover:file:bg-gray-200"
                          accept=".pdf,.doc,.docx,.jpg,.png,.jpeg"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => removeCertification(cert.id)}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Remove certification"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary/70"
                required
                minLength={5}
                placeholder="Tell us why you're a good fit for this position"
              ></textarea>
            </div>

            <p className="text-xs text-gray-500">
              We'll never share your details with anyone else.
            </p>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 disabled:opacity-50 flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}