import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ResumeUploaderProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
}

export default function ResumeUploader({ onFileUpload, isLoading }: ResumeUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  return (
    <div className="bg-white shadow rounded-lg p-8">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary-extraLight' : 'border-gray-300 hover:border-primary'
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {isDragActive ? 'Drop your resume here' : 'Drag and drop your resume here'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              or click to select a file
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Supported formats: PDF, DOC, DOCX (Max 5MB)
            </p>
          </div>
        </div>
      </div>
      
      {isLoading && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center px-4 py-2 text-sm font-medium leading-6 text-primary-dark bg-primary-extraLight rounded-lg">
            <svg className="w-5 h-5 mr-3 -ml-1 text-primary animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing your resume...
          </div>
        </div>
      )}
      
      <div className="mt-8 bg-primary-extraLight rounded-lg p-4 border border-primary-100">
        <h4 className="text-sm font-medium text-primary-dark mb-2">How it works:</h4>
        <ul className="text-sm text-primary-dark space-y-1 list-disc pl-5">
          <li>Upload your resume in PDF or Word format</li>
          <li>We'll extract your information automatically</li>
          <li>Review and edit the pre-filled form</li>
          <li>Submit your application with one click</li>
        </ul>
      </div>
    </div>
  );
}
