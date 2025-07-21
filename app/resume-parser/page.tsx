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
}

export default function ResumeParserPage() {
  const [parsedData, setParsedData] = useState<Partial<FormData> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState<File | null>(null);




  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError('');
    setFile(file);
    
    try {
      // For demo purposes, we'll simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Extract text from the resume file

      
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Application Form</h1>
          <p className="text-lg text-gray-600">
            {file ? 'Please review and update your details' : 'Upload your resume to auto-fill the application form'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!parsedData ? (
          <ResumeUploader onFileUpload={handleFileUpload} isLoading={isLoading} />
        ) : (
          <>
            <div className="mb-6 p-4 bg-blue-50 rounded-lg flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  {file ? (
                    <>Resume uploaded: <span className="font-medium">{file.name}</span>. Please verify and update the information below.</>
                  ) : (
                    'No resume uploaded. Please fill in the form manually.'
                  )}
                </p>
              </div>
            </div>
            
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
                homePhone: '',
                address: {
                  address: parsedData.address?.address || '',
                  state: parsedData.address?.state || '',
                  city: parsedData.address?.city || '',
                  zip: parsedData.address?.zip || '',
                  street: parsedData.address?.street || '',
                  country: parsedData.address?.country || ''
                },
                skills: parsedData.skills || [],
                employmentBasis: 'Full-Time',
                authorization: false,
                experience: parsedData.experience ? parsedData.experience : 0,
                workStatus: 'Citizen',
                resumeCategory: 'Health Care'
              }}
              onSubmit={handleSubmit} 
            />
            
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>By submitting this form, you agree to our terms and conditions.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
