const API_BASE_URL = 'https://intranet.radgov.com/RadgovWebsiteAPI/API';

export interface Job {
  JobID: string;
  JobTitle: string;
  City: string;
  JobState: string;
  JobDescription: string;
  PostedDate: string;
  JobType: string;
  Salary?: string;
}

interface SubmitApplicationResponse {
  success: boolean;
  message: string;
  error?: string;
}

export const searchJobs = async (keyword: string = '', country: string = '', zipcode: string = '', miles: string = '') => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/SearchJobsOnFilters?Searchkeywords=${encodeURIComponent(keyword)}&country=${encodeURIComponent(country)}&Zipcode=${encodeURIComponent(zipcode)}&WithinMiles=${encodeURIComponent(miles)}&Group=IV - Health Care`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    
    const data = await response.json();
    return data === 'No Data Found' ? [] : data;
  } catch (error) {
    console.error('Error searching jobs:', error);
    return [];
  }
};

export const getJobDetails = async (jobId: string): Promise<Job | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ViewJobDetails?JobID=${encodeURIComponent(jobId)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch job details');
    }
    
    const data = await response.json();
    return data[0] || null;
  } catch (error) {
    console.error('Error fetching job details:', error);
    return null;
  }
};

export const submitJobApplication = async (formData: FormData): Promise<SubmitApplicationResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/QuickApplyJobs`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit application');
    }

    return {
      success: true,
      message: 'Application submitted successfully!'
    };
  } catch (error) {
    console.error('Error submitting application:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to submit application',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

export const submitCertification = async (formData: FormData): Promise<SubmitApplicationResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/QuickApplyCertificate`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit certification');
    }

    return {
      success: true,
      message: 'Certification submitted successfully!'
    };
  } catch (error) {
    console.error('Error submitting certification:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to submit certification',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
