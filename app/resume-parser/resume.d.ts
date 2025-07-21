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
}