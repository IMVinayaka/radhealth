'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import JobApplicationModal from '../components/jobApplicationModal';
import { searchJobs, Job } from '../services/jobService';
import AutoScrollSections from '../components/AutoScrollSections';
import { getStatesByCountry } from '../services/commonServices';

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
  Zip: string;
  City: string;
  State: string;
}

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [selectedJob, setSelectedJob] = useState<MockJob | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Inside the CareersPage component, add these state variables
  const [states, setStates] = useState<{State: string}[]>([]);
  const [selectedState, setSelectedState] = useState('');
const [miles, setMiles] = useState('');

  // Parallax effect setup
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start']
  });

  // Add this useEffect to fetch states when component mounts
useEffect(() => {
  const fetchStates = async () => {
    try {
      const statesData = await getStatesByCountry();
      setStates(statesData);
    } catch (error) {
      console.error('Error loading states:', error);
    }
  };
  fetchStates();
}, []);

  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Convert API jobs to mock job format
  const mockJobs: MockJob[] = jobs.map((job, index) => ({
    id: index + 1,
    title: job.JobTitle,
    postedDate: job.JobPosted,
    jobId: job.JobID,
    location: job.City && job.JobState ? `${job.City}, ${job.JobState}` : 'Various Locations',
    type: job.JobType,
    salary: job.Salary,
    description: job.JobDescription || 'Job description not available. Please apply for more details.',
    Zip: job.Zip,
    City: job.City,
    State: job.State
  }));

  useEffect(() => {
    // Initial load of jobs
    const fetchInitialJobs = async () => {
      try {
        setLoading(true);
        const data = await searchJobs('', '', '');
        setJobs(data);
      } catch (err) {
        console.error('Error fetching initial jobs:', err);
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    fetchInitialJobs();
  }, []);

// Update the handleSearch function
const handleSearch = async () => {
  setSearchPerformed(true);
  
  // First try to filter existing jobs
  const localResults = mockJobs.filter(job => {
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesLocation = location === '' || 
      job.Zip.includes(location) || 
      job.City.toLowerCase().includes(location.toLowerCase()) || 
      job.location.toLowerCase().includes(location.toLowerCase());
      
    const matchesState = selectedState === '' || 
      job.State.toLowerCase() === selectedState.toLowerCase();

    return matchesSearch && matchesLocation && matchesState;
  });

  // If no local results found or using location/state/miles filter, try API search
  if ((localResults.length === 0 || location || selectedState || miles) && 
      (searchTerm || location || selectedState || miles)) {
    try {
      setLoading(true);
      const data = await searchJobs(searchTerm, selectedState, location, miles);
      setJobs(data);
    } catch (err) {
      console.error('Error searching jobs:', err);
    } finally {
      setLoading(false);
    }
  }
};
  const filteredJobs = mockJobs.filter(job => {
    if (!searchPerformed && !initialLoad) return false;
    
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesLocation = location === '' || 
      job.State.toLowerCase().includes(location.toLowerCase()) || 
      job.Zip.includes(location) || 
      job.City.toLowerCase().includes(location.toLowerCase()) || 
      job.location.toLowerCase().includes(location.toLowerCase());
      
    return matchesSearch && matchesLocation;
  });

  const sectionIds = ['careers-search'];
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AutoScrollSections sectionIds={sectionIds} delay={2500} scrollOffset={80} />
      {/* Hero Section */}
      <section id="careers-hero" className="relative h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8" ref={targetRef}>
        {/* Background with parallax effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark"
          style={{
            scale,
            y: yBg,
            opacity,
          }}
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

          {/* Floating Elements */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm"
            animate={{
              y: [0, -20, 0],
              x: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm"
            animate={{
              y: [0, 30, 0],
              x: [0, -20, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </motion.div>

        {/* Content */}
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
            style={{ y: yText }}
          >
            Open Jobs
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8"
            style={{ y: yText }}
          >
            Build your future with us and be part of something extraordinary
          </motion.p>
        </div>
      </section>

      {/* Search Section */}
      <section id='careers-search' className="py-12 mt-20">
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
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />
    </div>
  </div>
  
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Location (City or Zip)</label>
    <input
      type="text"
      placeholder="City or zip code"
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/70"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
    />
  </div>
  
  <div className="flex items-end">
    <button
      onClick={handleSearch}
      className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors"
    >
      Search Jobs
    </button>
  </div>
  
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
    <select
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/70"
  value={selectedState}
  onChange={(e) => setSelectedState(e.target.value)}
>
  <option value="">All States</option>
  {states.map((state, index) => (
    <option key={index} value={state.State}>
      {state.State}
    </option>
  ))}
</select>
  </div>
  
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Within</label>
    <select
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/70"
      value={miles}
      onChange={(e) => setMiles(e.target.value)}
    >
      <option value="">All</option>
      <option value="5">5 mi</option>
      <option value="10">10 mi</option>
      <option value="15">15 mi</option>
      <option value="20">20 mi</option>
      <option value="25">25 mi</option>
      <option value="30">30 mi</option>
    </select>
  </div>
</div>
           
          </div>
        </div>
      </section>

      {loading ? (
        <div className="min-h-[20vh] bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
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
                        className={`bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 cursor-pointer ${selectedJob?.id === job.id ? 'border-primary bg-primary-light/20' : ''
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
                            {/* <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                      {job.type}
                    </span> */}
                          </div>

                          <div className="flex items-center text-sm text-gray-500 mb-4">
                            <div className="flex items-center mr-6">
                              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              Posted {new Date(job.postedDate).toLocaleDateString()}
                            </div>
                            {job.salary && (
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
                          {/* <div>
                    <p className="text-sm text-gray-500">Job Type</p>
                    <p className="font-medium">{selectedJob.type}</p>
                  </div> */}
                          {selectedJob.salary && (
                            <div>
                              <p className="text-sm text-gray-500">Salary</p>
                              <p className="font-medium">{selectedJob.salary}</p>
                            </div>
                          )}
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
      )}



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