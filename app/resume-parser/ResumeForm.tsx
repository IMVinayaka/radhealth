import { useState } from 'react';

interface ResumeFormProps {
  initialData: IResume;
  onSubmit: (data: IResume) => void;
  onCancel?: () => void;
}
interface Certification {
  id: number;
  name: string;
  file: File | null;
}
const CERT_OPTIONS = [
  "ABOR", "ACLR", "BLS", "LPN", "NBSTSA", 
  "NIHSS", "PALS", "RN", "Others"
];


export default function ResumeForm({ initialData, onSubmit, onCancel }: ResumeFormProps) {
  const [formData, setFormData] = useState<IResume>(() => ({
    name: {
      first: initialData?.name?.first || '',
      middle: initialData?.name?.middle || '',
      last: initialData?.name?.last || ''
    },
    email: initialData?.email || '',
    telephone: initialData?.telephone || '',
    homePhone: initialData?.homePhone || '',
    address: {
      street: initialData?.address?.street || '',
      city: initialData?.address?.city || '',
      state: initialData?.address?.state || '',
      zip: initialData?.address?.zip || '',
      country: initialData?.address?.country || '',
      address: initialData?.address?.address || ''
    },
    gender: initialData?.gender || '',
    skills: initialData?.skills || [],
    employmentBasis: initialData?.employmentBasis || '',
    authorization: initialData?.authorization || false,
    experience: initialData?.experience || 0,
    workStatus: initialData?.workStatus || '',
    resumeCategory: initialData?.resumeCategory || 'Health Care',
    certificates: initialData?.certificates || [],
    coverLetter: initialData?.coverLetter || ''
  }));



  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skillsInput, setSkillsInput] = useState('');
  const [showCertificateForm, setShowCertificateForm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (name.startsWith('name.')) {
      const field = name.split('.')[1] as keyof IResume['name'];
      setFormData(prev => ({
        ...prev,
        name: {
          ...prev.name,
          [field]: value
        }
      }));
    } else if (name.startsWith('address.')) {
      const field = name.split('.')[1] as keyof IResume['address'];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else if (name === 'skills') {
      const skills = value.split(',').map(skill => skill.trim()).filter(Boolean);
      setFormData(prev => ({
        ...prev,
        skills
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked :
          type === 'number' ? parseFloat(value) || 0 : value
      }));
    }
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillsInput(e.target.value);
  };

  const addSkill = () => {
    if (skillsInput.trim() && !formData.skills.includes(skillsInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillsInput.trim()]
      }));
      setSkillsInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };




  const handleCoverLetterChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      coverLetter: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
    { value: 'Prefer not to say', label: 'Prefer not to say' }
  ];


  const stateOptions = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California",
    "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii",
    "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
    "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
    "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia",
    "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

    const [certifications, setCertifications] = useState<Certification[]>([]);

    const [submitStatus, setSubmitStatus] = useState<{
      type: 'success' | 'error' | null;
      message: string;
    }>({ type: null, message: '' });

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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-6">
          {/* Gender */}
          <div className="sm:col-span-2">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender *
            </label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              required
            >
              <option value="">Select Gender</option>
              {genderOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Name Fields */}
          <div className="sm:col-span-2">
            <label htmlFor="name.first" className="block text-sm font-medium text-gray-700">
              First Name *
            </label>
            <input
              type="text"
              name="name.first"
              id="name.first"
              value={formData.name.first}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              required
            />
          </div>

          <div className="sm:col-span-1">
            <label htmlFor="name.middle" className="block text-sm font-medium text-gray-700">
              Middle
            </label>
            <input
              type="text"
              name="name.middle"
              id="name.middle"
              value={formData.name.middle}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
          </div>

          <div className="sm:col-span-1">
            <label htmlFor="name.last" className="block text-sm font-medium text-gray-700">
              Last Name *
            </label>
            <input
              type="text"
              name="name.last"
              id="name.last"
              value={formData.name.last}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              required
            />
          </div>

          {/* Contact Information */}
          <div className="sm:col-span-3">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              required
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
              Telephone *
            </label>
            <input
              type="tel"
              name="telephone"
              id="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              required
            />
          </div>



          {/* Address */}
          <div className="sm:col-span-6 mt-4 pt-4 border-t border-gray-200">
            <h3 className="text-md font-medium text-gray-900 mb-4">Address</h3>
            <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label htmlFor="address.state" className="block text-sm font-medium text-gray-700">
                  State *
                </label>
                <select
                  name="address.state"
                  id="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  required
                >
                  <option value="">Select State</option>
                  {stateOptions.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address.city" className="block text-sm font-medium text-gray-700">
                  City *
                </label>
                <input
                  type="text"
                  name="address.city"
                  id="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address.zip" className="block text-sm font-medium text-gray-700">
                  ZIP Code 
                </label>
                <input
                  type="text"
                  name="address.zip"
                  id="address.zip"
                  value={formData.address.zip}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  required
                />
              </div>
              <div className="sm:col-span-6">
                <label htmlFor="address.address" className="block text-sm font-medium text-gray-700">Address line</label>
                <input
                  type="text"
                  name="address.address"
                  id="address.address"
                  value={formData.address.address}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  required
                />
              </div>
            </div>
          </div>
       
          <div className="sm:col-span-6 mt-4 pt-4 border-t border-gray-200">
          <h3 className="text-md font-medium text-gray-900 mb-4">Professional Information</h3>
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 ">
          <div className="sm:col-6 col-6">
            <label htmlFor="workStatus" className="block text-sm font-medium text-gray-700">
              Work Status *
            </label>
            <input
              type="text"
              name="workStatus"
              id="workStatus"
              value={formData.workStatus}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              required
            />
          </div>
          <div className="sm:col-6 col-6">
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
              Experience *
            </label>
            <input
              type="number"
              name="experience"
              id="experience"
              value={formData.experience}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              required
            />
          </div>
          </div>
        
             {/* Skills Section */}
          <div className="sm:col-span-6 my-4">
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
              Skills (comma separated)
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="skills"
                id="skills"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-lg border border-gray-300 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
                placeholder="e.g., JavaScript, React, Node.js"
              />
              <button
                type="button"
                onClick={addSkill}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                Add
              </button>
            </div>
            {formData.skills.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-extraLight text-primary-dark"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-primary hover:bg-primary-dark hover:text-white focus:outline-none focus:bg-primary-dark focus:text-white transition-colors"
                    >
                      <span className="sr-only">Remove {skill}</span>
                      <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                        <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          </div>
        </div>
      </div>




      {/* Certificates Section */}
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
                  <div key={cert.id} className="flex items-start space-x-2 p-3 rounded-md">
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

   

      <div className="flex justify-between mt-6">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="ml-auto px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>
  );
}
