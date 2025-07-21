import { useState } from 'react';

interface ResumeFormProps {
  initialData: IResume;
  onSubmit: (data: IResume) => void;
  onCancel?: () => void;
}

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
    resumeCategory: initialData?.resumeCategory || 'Health Care'
  }));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skillsInput, setSkillsInput] = useState('');

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




      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>
  );
}
