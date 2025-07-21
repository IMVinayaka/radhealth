'use client';

import { useState } from 'react';
import ResumeUploader from './ResumeUploader';
import ResumeForm from './ResumeForm';
import { parseResumeWithGemini } from './geminiParser';

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
}

export default function ResumeParserPage({jobTitle, jobId}: {jobTitle?: string, jobId?: string}) {
  const [parsedData, setParsedData] = useState<Partial<FormData> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState<File | null>(null);




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
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      // In a real app, you would send this data to your backend
      console.log('Submitting form data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert('Application submitted successfully!');
      
      // Reset form
      setParsedData(null);
      setFile(null);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit application. Please try again.');
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
                  summary: ''
                }}
                onSubmit={handleSubmit} 
                onCancel={() => setParsedData(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
