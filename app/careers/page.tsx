'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import JobApplicationModal from '../components/jobApplicationModal';
import { searchJobs, Job } from '../services/jobService';

// Mock data structure to match the original design
interface MockJob {
  id: number;
  title: string;
  postedDate: string;
  jobId: string;
  location: string;
  type: string;
  salary: string;
  description: string;
}

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('all');
  const [selectedJob, setSelectedJob] = useState<MockJob | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Convert API jobs to mock job format
  const mockJobs: MockJob[] = jobs.map((job, index) => ({
    id: index + 1,
    title: job.JobTitle || 'Healthcare Professional',
    postedDate: job.PostedDate || new Date().toISOString().split('T')[0],
    jobId: job.JobID || `JOB-${index + 1000}`,
    location: job.City && job.JobState ? `${job.City}, ${job.JobState}` : 'Various Locations',
    type: job.JobType || 'Full-time',
    salary: job.Salary || '',
    description: job.JobDescription || 'Job description not available. Please apply for more details.'
  }));

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const data = await searchJobs(searchTerm, '', location);
        setJobs(data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchJobs();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, location]);

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = location === '' || job.location.toLowerCase().includes(location.toLowerCase());
    const matchesType = jobType === 'all' || job.type === jobType;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
                      className={`bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 cursor-pointer ${
                        selectedJob?.id === job.id ? 'border-primary bg-primary-light/20' : ''
                      }`}
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
                          { job.salary && (
                            <div className="flex items-center">
                              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              {job.salary}
                            </div>
                          )}
                        </div>
                        
                        <div 
  className="text-gray-700 mb-4 prose max-w-none" 
dangerouslySetInnerHTML={{ __html: job.description || 'No description available' }}
/>
                        
                        <button 
                          className="text-primary font-medium hover:text-primary-dark transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedJob(job);
                            setIsModalOpen(true);
                          }}
                        >
                          Apply Now &rarr;
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
                        <div 
  className="text-gray-700 mb-4 prose max-w-none" 
dangerouslySetInnerHTML={{ __html: selectedJob.description || 'No description available' }}
/>
                      </div>
                      
                      <div className="space-y-4">
                        <button 
                          onClick={() => setIsModalOpen(true)}
                          className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors"
                        >
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

      {/* Job Application Modal */}
      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobTitle={selectedJob?.title || ''}
        jobId={selectedJob?.jobId || ''}
      />
    </div>
  );
}