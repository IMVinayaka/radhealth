// app/careers/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import JobApplicationModal from '../components/jobApplicationModal';

// Mock data - replace with your API data
const mockJobs = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    postedDate: '2024-07-01',
    jobId: 'TECH-001',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    description: 'We are looking for an experienced software engineer to join our team...'
  },
  {
    id: 2,
    title: 'Product Manager',
    postedDate: '2024-07-05',
    jobId: 'PM-002',
    location: 'Remote',
    type: 'Full-time',
    salary: '$110,000 - $140,000',
    description: 'Lead product development and work with cross-functional teams...'
  },
  {
    id: 3,
    title: 'UX/UI Designer',
    postedDate: '2024-06-28',
    jobId: 'DESIGN-003',
    location: 'New York, NY',
    type: 'Contract',
    salary: '$90 - $120/hr',
    description: 'Create beautiful and intuitive user experiences for our products...'
  }
];

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = location === '' || job.location.toLowerCase().includes(location.toLowerCase());
    const matchesType = jobType === 'all' || job.type === jobType;
    
    return matchesSearch && matchesLocation && matchesType;
  });

    // Fetch job details based on params.jobId
    const jobDetails = {
        id:'34798237',
        title: "Job Title",
        // ... other job details
      };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      


      {/* Search Section */}
      <section className="py-12 mt-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 -mt-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Search Jobs</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/70"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="City, state, or zip"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/70"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/70"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                >
                  <option value="all">All Job Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
              </h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                <select className="border-0 bg-transparent text-primary font-medium focus:ring-0 focus:ring-offset-0">
                  <option>Most Recent</option>
                  <option>Relevance</option>
                  <option>Location</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Job List */}
              <div className="lg:col-span-2 space-y-6">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <motion.div
                      key={job.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedJob(job)}
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                            <p className="text-primary font-medium mb-3">{job.location}</p>
                          </div>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                            {job.type}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <div className="flex items-center mr-6">
                            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Posted {new Date(job.postedDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {job.salary}
                          </div>
                        </div>
                        
                        <p className="text-gray-600 line-clamp-2 mb-4">{job.description}</p>
                        
                        <button className="text-primary font-medium hover:text-primary-dark transition-colors">
                          View Details &rarr;
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="bg-white rounded-xl shadow-md p-8 text-center">
                    <svg className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                  </div>
                )}
              </div>

              {/* Job Details */}
              <div className="lg:col-span-1">
                {selectedJob ? (
                  <div className="sticky top-6 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white">
                      <h2 className="text-2xl font-bold mb-2">{selectedJob.title}</h2>
                      <p className="text-primary-extraLight">{selectedJob.location}</p>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <p className="text-sm text-gray-500">Job Type</p>
                          <p className="font-medium">{selectedJob.type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Salary</p>
                          <p className="font-medium">{selectedJob.salary}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Posted</p>
                          <p className="font-medium">
                            {new Date(selectedJob.postedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-lg font-bold mb-3">Job Description</h3>
                        <p className="text-gray-700 mb-4">{selectedJob.description}</p>
                        <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-lg font-bold mb-3">Requirements</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          <li>3+ years of experience in a similar role</li>
                          <li>Bachelor's degree in a related field</li>
                          <li>Strong communication and teamwork skills</li>
                          <li>Ability to work in a fast-paced environment</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-4">
                        <button onClick={() => setIsModalOpen(true)} className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors">
                          Apply Now
                        </button>
                  
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-md p-8 text-center h-full flex items-center justify-center">
                    <div>
                      <svg className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Select a job</h3>
                      <p className="text-gray-500">Click on a job listing to view details</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-xl text-primary-extraLight/90 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our team. Send us your resume and we'll contact you when a matching position becomes available.
          </p>
          <button className="bg-white text-primary hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors">
            Submit Your Resume
          </button>
        </div>
      </section>

      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobTitle={jobDetails.title}
        jobId={jobDetails.id}
      />
    </div>
  );
}