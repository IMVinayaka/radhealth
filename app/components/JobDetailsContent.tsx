'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { XCircleIcon } from '@heroicons/react/24/outline'
import ResumeParserPage from '../resume-parser/page'
import { Job, getJobDetails } from '../services/jobService'

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

interface JobWithDescription extends Job {
  description: string;
}


export default function JobDetailsContent() {
  const searchParams = useSearchParams()
  const [job, setJob] = useState<JobWithDescription | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
  const jobId = searchParams.get('jobId')
  if (jobId) {
    const fetchDetails = async () => {
      setLoading(true)
      const details = await getJobDetails(jobId)
      if (details) {
        // Create a new object with the description property
        const jobWithDescription = {
          ...details,
          description: (details.JobDescription || 'No description available').replace(/@@Paycomp/g, details.Salary || 'Competitive'),
        }
        setJob(jobWithDescription) // Use the new object
      } else {
        setError('Job not found.')
      }
      setLoading(false)
    }
    fetchDetails()
  } else {
    setError('No job ID provided.')
    setLoading(false)
  }
}, [searchParams])

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>
  }

  if (!job) {
    return null
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto p-4 md:p-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white flex flex-col">
              <h2 className="text-2xl font-bold">{job.JobTitle}</h2>
              <p className="mt-1 text-primary-extraLight">{`${job.City}, ${job.State}`}</p>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                {job.Salary && (
                  <div>
                    <p className="text-sm text-gray-500">Salary</p>
                    <p className="font-medium">{job.Salary}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Posted</p>
                  <p className="font-medium">
                    {formatDate(job.JobPosted)}
                  </p>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">
                              Job Description
                            </h3>
                            <div
                              className="text-gray-700 prose max-w-none"
                              dangerouslySetInnerHTML={{
                                __html: job.description, // Use the 'description' property
                              }}
                            />
                          </div>

              

              <div className="space-y-4 mt-6">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[110] max-h-[100vh] lg:w-[50%] bg-white/50 min-w-[100vw] h-full">
          <div className="w-[95vw] h-[100vh] flex items-center justify-center bg-blur">
            <ResumeParserPage
              jobTitle={job?.JobTitle || ''}
              jobID={job?.JobID?.toString() || ''}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  )
}
