const API_BASE_URL = 'https://intranet.radgov.com/RadgovWebsiteAPI/API';

export interface Job {
  JobID: string;
  JobTitle: string;
  JobDescription: string;
  JobPosted: string;
  JobType: string;
  Salary?: string;
  Zip?: string;
  City?: string;
  State?: string;
}

interface SubmitApplicationResponse {
  success: boolean;
  message: string;
  error?: string;
}

export const searchJobs = async (keyword: string = '', state: string = '', zipcode: string = '', miles: string = '') => {
  try {
    // Create URLSearchParams and only append non-empty parameters
    const params = new URLSearchParams();
    
    if (keyword?.trim()) params.append('Searchkeywords', keyword.trim());
    if (state?.trim()) params.append('state', state.trim());
    if (zipcode?.trim()) params.append('Zipcode', zipcode.trim());
    if (miles?.trim()) params.append('WithinMiles', miles.trim());
    params.append('country', 'USA');
    
    // Always include the Group parameter
    params.append('Group', 'IV - Health Care');
    
    const response = await fetch(`${API_BASE_URL}/SearchJobsOnFilters?${params.toString()}`);
    
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
