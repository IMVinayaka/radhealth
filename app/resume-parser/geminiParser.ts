import { GenerateContentResult, GoogleGenerativeAI } from "@google/generative-ai";
import * as mammoth from 'mammoth';



// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyDp83vZVzbLZ6hh7Jr35ICC_HYxsL-wR9Y');




async function extractTextFromFile(file: File): Promise<string> {
    if (file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
      // Handle Word documents
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value;
    } else {
      // For plain text files
      return await file.text();
    }
  }

// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Function to make the API call with retry logic
async function callGeminiWithRetry(
  model: any, 
  prompt: string | (string | any)[], 
  maxRetries = 3, 
  initialDelay = 1000
): Promise<string> {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } catch (error: any) {
      lastError = error;
      
      // Check if it's a 503 error and we should retry
      if (error.message?.includes('503') && attempt < maxRetries) {
        const delayMs = initialDelay * Math.pow(2, attempt - 1);
        console.log(`Attempt ${attempt} failed with 503. Retrying in ${delayMs}ms...`);
        await delay(delayMs);
      } else {
        // If it's not a 503 or we've reached max retries, rethrow the error
        throw error;
      }
    }
  }
  
  // If we've exhausted all retries, throw the last error
  throw lastError;
}



export async function parseResumeWithGemini(file: File, maxRetries = 3,availableSkills: string[]): Promise<Partial<IResume>> {
  try {
    let contentToProcess: string | ArrayBuffer;
    
    if (file.type === 'application/pdf') {
      // For PDFs, read the file as ArrayBuffer
      contentToProcess = await file.arrayBuffer();
    } else {
      // For other files, extract text as before
      contentToProcess = await extractTextFromFile(file);
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite-preview-06-17",
      generationConfig: {
        temperature: 0.2,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
      },
    });

    const prompt = `Extract the following information from the ${file.type === 'application/pdf' ? 'PDF resume' : 'resume text'} in JSON format.
    If a field is not found or is not applicable, return an empty string, false, or an empty array as appropriate for its type.
    Ensure all fields listed below are present in the final JSON object, even if empty.

    Required fields:
    - name: { first: string, middle: string, last: string } (extract from the top of the resume)
    - email: string (primary contact email)
    - telephone: string (primary phone number)
    - homePhone: string (home phone number if available, otherwise empty string)
    - address: {
        street: string,
        city: string,
        state: string,
        zip: string,
        country: string
      }
    - gender: string (extract if explicitly mentioned, otherwise empty string)
    - skills: string[] (extract all technical and soft skills matching the skills sets provided. Here are the available skills: ${availableSkills.join(', ')})
    - employmentBasis: string (e.g., 'Full-Time', 'Part-Time', 'Contract')
    - authorization: boolean (work authorization status)
    - experience: number (total years of professional work experience)
    - workStatus: string (e.g., 'Citizen', 'Permanent Resident', 'Work Visa')
    - resumeCategory: string (e.g., 'Health Care', 'IT', 'Engineering', 'Marketing')
    -resumeText: string (extract the entire resume text) it should be in HTML format 
    IF ZIP CODE PRESENT GIVE ME THE STATE CITY 
    IF YOU FIND THE STATE WITH SHORT FORM GIVE ME FULL NAME

    

    Additional sections (extract if available):
    - experienceDetails: Array<{title, company, startDate, endDate, description}>
    - educationDetails: Array<{degree, field, institution, year}>
    - summary: string

    Return ONLY the JSON object. Do not include any extra text, markdown formatting, or conversational elements.`;


    let text: string;
    
    try {
      if (file.type === 'application/pdf') {
        // For PDFs, use the file data directly
        const pdfPart = {
          inlineData: {
            data: Buffer.from(contentToProcess as ArrayBuffer).toString('base64'),
            mimeType: 'application/pdf',
          },
        };
        
        // Use the retry logic for PDFs
        text = await callGeminiWithRetry(model, [prompt, pdfPart], maxRetries);
      } else {
        // For text content, use as string
        text = await callGeminiWithRetry(model, [prompt, contentToProcess as string], maxRetries);
      }
      
      console.log('Raw text from API:', text);
      
      // Try to extract JSON from markdown code blocks first
      const jsonMatch = text.match(/```(?:json)?\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        text = jsonMatch[1];
      } else {
        // If no code blocks, try to find JSON object/array directly
        const jsonObjMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
        if (jsonObjMatch) {
          text = jsonObjMatch[0];
        }
      }
      
      // Clean up the text
      text = text.trim();
    } catch (error: any) {
      console.error('Error calling Gemini API:', error);
      if (error.message?.includes('503')) {
        throw new Error('The service is currently unavailable. Please try again later.');
      }
      throw error;
    }
    
    try {
      // Handle markdown code blocks if present
      const jsonStart = text.indexOf('```json') >= 0 ? text.indexOf('```json') + 7 : 0;
      const firstBrace = text.indexOf('{');
      const startIndex = Math.max(jsonStart, firstBrace);
      
      // Find the end of the JSON (last closing brace)
      let jsonEnd = text.lastIndexOf('}') + 1;
      if (jsonEnd <= 0) {
        throw new Error('No valid JSON object found in the response');
      }
      
      // Extract the JSON part
      const jsonContent = text.substring(startIndex, jsonEnd).trim();
      
      // Parse and return the JSON
      return JSON.parse(jsonContent) as Partial<IResume>;
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Problematic JSON text:', text);
      throw new Error(`Failed to parse resume: ${parseError.message}`);
    }
    
  } catch (error) {
    console.error('Error in parseResumeWithGemini:', error);
    // Re-throw or handle the error appropriately for your application
    throw error; // Or return a default empty object based on your needs
  }
}
