'use client';

import { useEffect, useState } from 'react';
import ResumeUploader from './ResumeUploader';
import ResumeForm from './ResumeForm';
import { parseResumeWithGemini } from './geminiParser';
import { submitCertification, submitJobApplication } from '../services/jobService';

import DOMPurify from 'dompurify';
import { ShieldCloseIcon, XCircleIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { getSkills } from '../services/commonServices';

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

export default function ResumeParserPage({ jobTitle, jobID, onClose }: { jobTitle?: string, jobID?: string, onClose?: () => void }) {
  const [parsedData, setParsedData] = useState<Partial<FormData> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState<File | null>(null);
// Format dates to MM/dd/yyyy format
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

  /**
   * Sanitize raw HTML text safely using DOMPurify.
   * Returns a sanitized string that can be stored or rendered.
   */
  function extractAndSanitizeHtml(htmlText: string): string {
    return DOMPurify.sanitize(htmlText);
  }
  const [skills, setSkills] = useState<{ Skill: string }[] | null>(null);
  const getSkillsData = async () => {
    try {
      const resp = await getSkills();
      setSkills(resp);
    } catch (error) {
      console.error('Error fetching skills:', error);
      setSkills([]);
    }
  }
  useEffect(()=>{
    getSkillsData();
  },[])

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError('');
    setFile(file);

    try {
      // Parse the extracted text
      const parsedData = await parseResumeWithGemini(file, 3,skills?.map((skill) => skill.Skill) || []);

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
        address: { state: '', city: '', zip: '', address: '', street: '', country: '' },
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
  const handleSubmit = async (e: React.FormEvent, jobData: Partial<IResume>, certifications: any[]) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Prepare main application form data
      const formData = new FormData();

      // Add required fields
      formData.append('Gender', jobData.gender);
      formData.append('FirstName', jobData.name.first);
      formData.append('MiddleName', jobData.name.middle || '');
      formData.append('LastName', jobData.name.last);
      formData.append('EmailID', jobData.email);
      formData.append('MobileNumber', jobData.telephone);
      formData.append('FullAddress', jobData.address.address);
      formData.append('State', jobData.address.state);
      formData.append('City', jobData.address.city);
      formData.append('Zip', jobData.address.zip);
      formData.append('WorkStatus', jobData.workStatus);
      formData.append('Experience', jobData.experience.toString());
      formData.append('Skills', jobData.skills.join(', '));
      formData.append('JobID', jobID || '');
      formData.append('ResumeContent', '');

      // Add resume file if available
      if (file) {
        formData.append('FILE', file);
      }

      // Submit main application
      const response = await submitJobApplication(formData);

      // Check if the response indicates an error from the API
      if (response.error) {
        throw new Error(response.message || 'Failed to submit application');
      }

      // If there are certificates, submit them
      if (certifications.length > 0) {
        const certFormData = new FormData();
        certFormData.append('EmailID', jobData.email);
        certFormData.append('JobID', jobID || '');

        // Add each certificate
        certifications.forEach((cert) => {
          if (cert.file) {
            certFormData.append(`CertificateName`, cert.certificateFullName);
            certFormData.append(`NameOnLicense`, cert.nameOnLicense);
            certFormData.append(`IssuedNo`, cert.issuedNo);
            certFormData.append(`IssuedDate`, formatDate(cert.issuedDate));
            certFormData.append(`IssuedCenter`, cert.issuedCenter);
            certFormData.append(`ExpiryDate`, formatDate(cert.expiryDate));
          }
        });

        await submitCertification(certFormData);
      }

      // Show success message
      setSubmitStatus({
        type: 'success',
        message: response.message || 'Application submitted successfully!'
      });
      toast.success(response.message || 'Application submitted successfully!');

      // Close the form after a short delay
      setTimeout(() => {
        onClose?.();
      }, 2000);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit application';
      setSubmitStatus({
        type: 'error',
        message: errorMessage
      });
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" max-h-[90vh] overflow-auto bg-primary-extraLight py-12 mt-12 px-4 sm:px-6 lg:px-8 min-w-[90%] md:min-w-[60%] lg:min-w-[60%] xl:min-w-[60%]  max-w-7xl">
      <div className='flex items-center justify-end cursor-pointer'>
        <XCircleIcon onClick={onClose} />
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-3">{jobTitle}</h1>
          <p className="text-lg text-text-muted">
            {file ? 'Review and update your details' : 'Upload your resume to get started'}
          </p>
        </div>



        {!parsedData ? (
          <div className=" py-12 mt-12 px-4 sm:px-6 lg:px-8">
            <ResumeUploader onFileUpload={handleFileUpload} isLoading={isLoading} />

          </div>
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
                onSubmit={(e, data, certifications) => handleSubmit(e, data, certifications)}
                onCancel={() => setParsedData(null)}
              />
              {submitStatus?.type && (
                <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4">
                  <div className={`bg-${submitStatus.type === 'success' ? 'green' : 'red'}-50 z-50 p-4  min-h-0 flex items-center justify-center`}>
                    <p className="text-lg font-semibold mb-2">{submitStatus.type === 'success' ? 'Success' : 'Error'}</p>
                    <p className={`text-sm text-${submitStatus.type === 'success' ? 'green' : 'red'}`}>{submitStatus.message}</p>
                  </div>
                </div>
              )}
              {isSubmitting &&
                (
                  <div className="min-h-[20vh]  flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
