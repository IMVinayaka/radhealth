export interface ContactFormData {
  is_interested: 'Yes' | 'No';
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  message: string;
  consent: boolean;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  error?: string;
}

export const submitContactForm = async (data: ContactFormData): Promise<ContactFormResponse> => {
  const API_BASE_URL = 'https://intranet.radgov.com/RadgovWebsiteAPI/API';
  const response = await fetch(`${API_BASE_URL}/ContactForm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
