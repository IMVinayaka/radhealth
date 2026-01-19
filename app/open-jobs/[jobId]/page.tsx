'use client'

import { useEffect, useState } from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import ResumeParserPage from '../../resume-parser/page'
import { useParams } from 'next/navigation'

// Define the Job interface
interface Job {
  JobID: number
  JobTitle: string
  location: string
  description: string
  salary: string
  JobPosted: string
  Zip: string
  City: string
  State: string
}

const JobDetailsPage = () => {
  const { jobId } = useParams()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (jobId) {
      // In a real application, you would fetch the job details from an API
      // For now, we'll use a placeholder and you can replace it with actual data fetching
      const fetchJobDetails = async () => {
        try {
          // This is where you would fetch job data by ID
          // For demonstration, we'll use a timeout to simulate a network request
          setTimeout(() => {
            const jobs: Job[] = JSON.parse(localStorage.getItem('jobs') || '[]')
            const selectedJob = jobs.find((j) => j.JobID.toString() === jobId)
            if (selectedJob) {
              setJob(selectedJob)
            } else {
              setError('Job not found')
            }
            setLoading(false)
          }, 1000)
        } catch (err) {
          setError('Failed to fetch job details')
          setLoading(false)
        }
      }

      fetchJobDetails()
    }
  }, [jobId])

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

              <p className="mt-1 text-primary-extraLight">{job.location}</p>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                {job.salary && (
                  <div>
                    <p className="text-sm text-gray-500">Salary</p>
                    <p className="font-medium">{job.salary}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Posted</p>
                  <p className="font-medium">
                    {new Date(job.JobPosted).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Job Description</h3>
                <div
                  className="text-gray-700 prose max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: job.description || 'No description available',
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

export default JobDetailsPage
