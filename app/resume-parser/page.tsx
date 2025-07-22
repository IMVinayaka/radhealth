'use client';

import { useState } from 'react';
import ResumeUploader from './ResumeUploader';
import ResumeForm from './ResumeForm';
import { parseResumeWithGemini } from './geminiParser';
import { submitCertification, submitJobApplication } from '../services/jobService';

import DOMPurify from 'dompurify';

interface Name {
  first: string;
  middle: string;
  last: string;
}

interface Address {
  state: string;
  city: string;
  zip: string;
  address: string;
  street: string;
  country: string;
}

interface ExperienceDetail {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface EducationDetail {
  degree: string;
  field: string;
  institution: string;
  year: string;
}

interface FormData {
  gender: string;
  name: Name;
  email: string;
  telephone: string;
  homePhone: string;
  address: Address;
  skills: string[];
  employmentBasis: string;
  authorization: boolean;
  experience: number;
  workStatus: string;
  resumeCategory: string;
  experienceDetails: ExperienceDetail[];
  educationDetails: EducationDetail[];
  summary: string;
  resumeText: string;
}
interface Certification {
  id: number;
  name: string;
  file: File | null;
}

export default function   ResumeParserPage({jobTitle, jobID,onClose}: {jobTitle?: string, jobID?: string,onClose?: () => void}) {
  const [parsedData, setParsedData] = useState<Partial<FormData> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState<File | null>(null);


/**
 * Sanitize raw HTML text safely using DOMPurify.
 * Returns a sanitized string that can be stored or rendered.
 */
function extractAndSanitizeHtml(htmlText: string): string {
  return DOMPurify.sanitize(htmlText);
}

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError('');
    setFile(file);
    
    try {
      // Parse the extracted text
      const parsedData = await parseResumeWithGemini(file);
      
      // Create the form data with all required fields
      const formData: Partial<FormData> = {
        gender: '',
        name: {
          first: parsedData.name?.first || '',
          middle: parsedData.name?.middle || '',
          last: parsedData.name?.last || ''
        },
        email: parsedData.email || '',
        telephone: parsedData.telephone || '',
        homePhone: '',
        address: {
          state: parsedData.address?.state || '',
          city: parsedData.address?.city || '',
          zip: parsedData.address?.zip || '',
          address: parsedData.address?.address || '',
          street: parsedData.address?.street || '',
          country: parsedData.address?.country || ''
        },
        skills: parsedData.skills || [],
        employmentBasis: 'Full-Time',
        authorization: false,
        experience: parsedData.experience || 0,
        workStatus: 'Citizen',
        resumeCategory: 'Health Care',
        resumeText: extractAndSanitizeHtml(parsedData.resumeText) || '',
      };
      
      // Update state with the parsed data
      setParsedData(formData);
      
    } catch (err) {
      console.error('Error processing resume:', err);
      setError('Failed to process the resume. Please try again or enter the information manually.');
      
      // Initialize empty form if parsing fails
      setParsedData({
        gender: '',
        name: { first: '', middle: '', last: '' },
        email: '',
        telephone: '',
        homePhone: '',
        address: { state: '', city: '', zip: '' ,address:'',street:'',country:''},
        skills: [],
        employmentBasis: 'Full-Time',
        authorization: false,
        experience: 0,
        workStatus: 'Citizen',
        resumeCategory: 'Health Care',
        resumeText: '',
      });
    } finally {
      setIsLoading(false);
    }
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
      const [submitStatus, setSubmitStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
      }>({ type: null, message: '' });
// In ResumeForm.tsx
const handleSubmit = async (e: React.FormEvent,jobData:Partial<IResume>,certifications:Certification[]) => {
  e.preventDefault();

  try {
    // Prepare main application form data
    const formData = new FormData();
    
    // Add required fields
    formData.append('Gender', jobData.gender);
    formData.append('FirstName', jobData.name.first);
    formData.append('MiddleName', jobData.name.middle || '');
    formData.append('LastName', jobData.name.last);
    formData.append('EmailID',  jobData.email);
    formData.append('MobileNumber', jobData.telephone);
    formData.append('FullAddress', jobData.address.address);
    formData.append('State', jobData.address.state);
    formData.append('City', jobData.address.city);
    formData.append('Zip', jobData.address.zip);
    formData.append('WorkStatus', jobData.workStatus);
    formData.append('Experience', jobData.experience.toString());
    formData.append('Skills', jobData.skills.join(', '));
    formData.append('JobID', jobID || ''); // Make sure to pass jobId as a prop
    formData.append('ResumeContent','')
    
    // Add resume file if available
    if (file) {
      formData.append('FILE', file);
    }

    // Submit main application
    const result = await submitJobApplication(formData);

    if (result.success) {
      // If there are certificates, submit them
      if (certifications.length > 0) {
        const certFormData = new FormData();
        certFormData.append('EmailID', jobData.email);
        certFormData.append('JobID', jobID || '');
        
        // Add each certificate
        certifications.forEach((cert, index) => {
          if (cert.file) {
            certFormData.append(`CertificateName`, cert.name);
            certFormData.append(`CertificateFile`, cert.file);
          }
        });

        await submitCertification(certFormData);
      }

      // Show success message
      setSubmitStatus({
        type: 'success',
        message: 'Application submitted successfully!'
      });
      setTimeout(()=>{
        onClose?.();
      },2000)
      
    }
  } catch (error) {
    setSubmitStatus({
      type: 'error',
      message: error instanceof Error ? error.message : 'Failed to submit application'
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-primary-extraLight py-12 mt-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-3">{jobTitle}</h1>
          <p className="text-lg text-text-muted">
            {file ? 'Review and update your details' : 'Upload your resume to get started'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!parsedData ? (
          <ResumeUploader onFileUpload={handleFileUpload} isLoading={isLoading} />
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-extraLight p-2 rounded-full">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-text-dark">
                    {file ? (
                      <>
                        Resume uploaded: <span className="font-semibold text-primary">{file.name}</span>
                      </>
                    ) : (
                      'No resume uploaded. Please fill in the form manually.'
                    )}
                  </h3>
                  <p className="text-sm text-text-muted mt-1">
                    Please verify and update the information below
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <ResumeForm 
                initialData={{
                  gender: '',
                  name: {
                    first: parsedData.name?.first || '',
                    middle: parsedData.name?.middle || '',
                    last: parsedData.name?.last || ''
                  },
                  email: parsedData.email || '',
                  telephone: parsedData.telephone || '',
                  homePhone: parsedData.homePhone || '',
                  address: {
                    address: parsedData.address?.address || '',
                    state: parsedData.address?.state || '',
                    city: parsedData.address?.city || '',
                    zip: parsedData.address?.zip || '',
                    street: parsedData.address?.street || '',
                    country: parsedData.address?.country || ''
                  },
                  skills: parsedData.skills || [],
                  employmentBasis: parsedData.employmentBasis || 'Full-Time',
                  authorization: parsedData.authorization || false,
                  experience: parsedData.experience || 0,
                  workStatus: parsedData.workStatus || 'Citizen',
                  resumeCategory: parsedData.resumeCategory || 'Health Care',
                  experienceDetails: [],
                  educationDetails: [],
                  summary: '',
                  resumeText: parsedData.resumeText || ''
                }}
                onSubmit={(e,data,certifications)=>handleSubmit(e,data,certifications)} 
                onCancel={() => setParsedData(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
