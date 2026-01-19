import { Suspense } from 'react'
import JobDetailsContent from '../../components/JobDetailsContent'

export default function JobDetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobDetailsContent />
    </Suspense>
  )
}
