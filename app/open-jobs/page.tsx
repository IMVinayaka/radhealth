'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { searchJobs, Job } from '../services/jobService';
import AutoScrollSections from '../components/AutoScrollSections';
import { getStatesByCountry } from '../services/commonServices';
import ResumeParserPage from '../resume-parser/page';
import { XCircleIcon } from 'lucide-react';

// Mock data structure to match the original design
interface MockJob {
  JobID: number;
  JobTitle: string;
  JobPosted: string;
  location: string;
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
  const [selectedPeriod, setSelectedPeriod] = useState('');

  // Inside the CareersPage component, add these state variables
  const [states, setStates] = useState<{ State: string }[]>([]);
  const [selectedState, setSelectedState] = useState('');
  const [miles, setMiles] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const formatToDDMMYYYY = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };


  const formatDate = (dateString: string) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [month, day] = dateString?.split('/')?.map(Number);
    const monthName = months[month - 1];
    return `${monthName}-${day}`;
  };

  const [from, setFrom] = useState('01-01-2025');
  const [to, setTo] = useState(formatToDDMMYYYY(new Date()));

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



  useEffect(() => {
    const today = new Date();

    switch (selectedPeriod) {
      case 'Last 7 days': {
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        setFrom(formatToDDMMYYYY(sevenDaysAgo));
        setTo(formatToDDMMYYYY(today));
        break;
      }
      case 'Last 14 days': {
        const fourteenDaysAgo = new Date(today);
        fourteenDaysAgo.setDate(today.getDate() - 14);
        setFrom(formatToDDMMYYYY(fourteenDaysAgo));
        setTo(formatToDDMMYYYY(today));
        break;
      }
      case 'Last 30 days': {
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        setFrom(formatToDDMMYYYY(thirtyDaysAgo));
        setTo(formatToDDMMYYYY(today));
        break;
      }
      default:
        // Reset to default or handle other cases
        setFrom('01-01-2025');
        setTo(formatToDDMMYYYY(today));
        break;
    }
  }, [selectedPeriod]);

  // Convert API jobs to mock job format
  const mockJobs: MockJob[] = jobs.map((job, index) => ({
    JobID: Number(job.JobID),  // Convert string to number
    JobTitle: job.JobTitle,
    JobPosted: job.JobPosted,
    jobId: job.JobID,  // This can remain as string if needed
    location: `${job.City}, ${job.State}`,
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
        const data = await searchJobs('', '', '', '', 'All', from, to);
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
    try {
      setLoading(true);
      const data = await searchJobs(searchTerm, selectedState, location, miles, selectedCategory, from, to);
      setJobs(data);
    } catch (err) {
      console.error('Error searching jobs:', err);
    } finally {
      setLoading(false);
    }

    setSelectedJob(null);
  };

  // Sort jobs by most recent post date (newest first)
  const sortedJobs = [...mockJobs].sort((a, b) => {
    const dateA = new Date(a.JobPosted).getTime();
    const dateB = new Date(b.JobPosted).getTime();
    return dateB - dateA; // For descending order (newest first)
  });

  const filteredJobs = sortedJobs.filter(job => {

    return job;
  });

  const sectionIds = ['careers-search'];
  return (
    <>
      <div className="min-h-screen  section bg-white/50 backdrop-blur-sm py-12">
        <AutoScrollSections sectionIds={sectionIds} delay={2500} scrollOffset={80} />


        {/* Search Section */}
        <section id='careers-search' className="py-12 mt-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6 -mt-12 relative z-10">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/70"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="Allied Healthcare Others">Allied Healthcare Others</option>
                    <option value="Nursing">Nursing</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Therapy">Therapy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/70"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                  >
                    <option value="">All </option>
                    <option value="Last 7 days">Last 7 days </option>
                    <option value="Last 14 days">Last 14 days </option>
                    <option value="Last 30 days">Last 30 days </option>

                  </select>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input
                    type="text"
                    placeholder="Zip code"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/70"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
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
                <div className="flex items-end">
                  <button
                    onClick={handleSearch}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Search Jobs
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {loading ? (
          <div className="min-h-[20vh]  flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <section className="py-6 ">
            <div className="container mx-auto px-4">
              <div className="container mx-auto">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
                  </h2>
                  {/* <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                    <select className="border-0 bg-transparent text-primary font-medium focus:ring-0 focus:ring-offset-0">
                      <option>Most Recent</option>
                      <option>Relevance</option>
                      <option>Location</option>
                    </select>
                  </div> */}
                </div>

                <div className="grid sm:grid-cols-1 grid-cols-3  xl:grid-cols-3 lg:grid-cols-3 gap-6 2xl:gap-8">
                  {/* Job List */}
                  <div className="col-span-1  space-y-4 lg:max-h-[calc(100vh-20rem)] overflow-y-auto pr-2">
                    {filteredJobs.length > 0 ? (
                      filteredJobs.map((job) => (
                        <motion.div
                          key={job.JobID}
                          className={`bg-white m-2 rounded-xl shadow-md  border border-gray-100 hover:shadow-lg transition-shadow duration-300 cursor-pointer ${selectedJob?.JobID === job.JobID ? 'border-primary bg-primary-light/20' : ''
                            }`}
                          whileHover={{ y: -5 }}
                          onClick={() => {
                            setSelectedJob(job);
                            setTimeout(() => {
                              document.getElementById('job_details')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            }, 10)
                          }}
                        >
                          <div className="py-3  px-3">
                            <div className="flex justify-between items-start overflow-hidden truncate ellipsis">
                              <div className='flex items-center justify-start gap-1'>
                                <h3 title={job.JobTitle} className="text-md max-w-max ellipsis truncate font-[500] text-gray-900 ">{job.JobTitle},</h3>

                                <h5 className='text-xs font-[400] text-primary'>

                                  Posted {formatDate(job?.JobPosted)}
                                </h5>

                              </div>
                            </div>

                            <h4 title={job.location} className="text-primary ellipsis truncate text-sm font-[400] ">{job.location}</h4>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="bg-white rounded-xl shadow-md p-8 text-center">
                        <svg className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                          <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>


                        </div>
                        {/* <div className="flex flex-col items-center gap-2 py-3 mt-16">
                          <p>No current openings match your profile?</p>
                          <p>We still want to hear from you. Please upload your resume and we will consider your application for future opportunities.</p>
                          <p onClick={() => { setIsModalOpen(true); setSelectedJob({ JobTitle: '', JobID: 0, location: '', description: '', salary: '', JobPosted: '', Zip: '', City: '', State: '' }) }} className="text-primary font-medium cursor-pointer">📎 [Upload Resume]</p>
                        </div> */}
                      </div>
                    )}
                  </div>

                  {/* Job Details */}
                  <div id='job_details' className="col-span-2 md:col-span-2">
                    {selectedJob && selectedJob.JobID !== 0 ? (
                      <div className="sticky top-6 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                        <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white flex justify-between items-center">
                          <div>
                            <h2 className="text-2xl font-bold mb-2">{selectedJob?.JobTitle}</h2>
                            <p className="text-primary-extraLight">{selectedJob?.location}</p>
                          </div>
                          <div>
                            <XCircleIcon className="cursor-pointer text-primary" onClick={() => setSelectedJob(null)} />
                          </div>

                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-center mb-6">

                            {selectedJob.salary && (
                              <div>
                                <p className="text-sm text-gray-500">Salary</p>
                                <p className="font-medium">{selectedJob.salary}</p>
                              </div>
                            )}
                            <div>
                              <p className="text-sm text-gray-500">Posted</p>
                              <p className="font-medium">
                                {new Date(selectedJob.JobPosted).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          <div className="mb-6 lg:max-h-[calc(100vh-38.9rem)] overflow-y-auto pr-2">
                            <h3 className="text-lg font-bold mb-3">Job Description</h3>
                            <div
                              className="text-gray-700 mb-4 truncate prose max-w-none"
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
                      <div className="bg-white rounded-xl shadow-md p-8 text-center h-full flex flex-col items-center justify-center">
                        <div>
                          <svg className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a job</h3>
                          <p className="text-gray-500">Click on a job listing to view details</p>

                        </div>
                        <div className="flex flex-col items-center gap-2 py-3 mt-16">
                          <p>No current openings match your profile?</p>
                          <p>We still want to hear from you. Please upload your resume and we will consider your application for future opportunities.</p>
                          <p onClick={() => { setIsModalOpen(true); setSelectedJob({ JobTitle: '', JobID: 0, location: '', description: '', salary: '', JobPosted: '', Zip: '', City: '', State: '' }) }} className="text-primary font-medium cursor-pointer">📎 [Upload Resume]</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}




      </div>
      {/* Job Application Modal */}
      {isModalOpen && (
        <div className='fixed  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-h-[100vh]  lg:w-[50%] bg-white/50 min-w-[100vw] h-full'>
          <div className='w-[95vw] h-[100vh] flex items-center justify-center bg-blur'>
            <ResumeParserPage
              jobTitle={selectedJob?.JobTitle || ''}
              jobID={selectedJob?.JobID?.toString() || ''}
              onClose={() => setIsModalOpen(false)}
            />
          </div>

        </div>
      )}
    </>
  );
}