interface IExperienceDetail {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  [key: string]: any; 
}

interface IEducationDetail {
  degree: string;
  field: string;
  institution: string;
  year: string;
  [key: string]: any;
}

interface ICertificate {
  id: number;
  name: string;
  file: File | null;
  [key: string]: any;
}

interface IResume {
  name: {
    first: string;
    middle: string;
    last: string;
  };
  email: string;
  telephone: string;
  homePhone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    address: string;
  };
  gender: string;
  skills: string[];
  employmentBasis: string;
  authorization: boolean;
  experience: number;
  workStatus: string;
  resumeCategory: string;
  experienceDetails?: IExperienceDetail[];
  educationDetails?: IEducationDetail[];
  certificates?: ICertificate[];
  coverLetter?: string;
  summary?: string;
  [key: string]: any; 
}