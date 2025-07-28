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



export async function parseResumeWithGemini(file: File, maxRetries = 3, availableSkills: { Skill: string }[]): Promise<Partial<IResume>> {
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
        maxOutputTokens: 65536,
      },
    });
    const prompt = `YOU ARE AN EXPERT RESUME EXTRACTOR. Extract the following information from the ${file.type === 'application/pdf' ? 'PDF resume' : 'resume text'} in JSON format.

If a field is not found or not applicable, return an empty string, false, zero, or an empty array as appropriate for its type.

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
- gender: string (extract only if explicitly mentioned, otherwise empty string)
- skills: string[] (
  You are an expert at extracting skills from resumes.

  Given this dynamic list of allowed skills:
  ${availableSkills.map(skill => `- ${skill?.Skill}`).join('\n')}

  Each skill may be:
  - a single word or phrase (e.g., "Triage")
  - or a grouped skill with multiple terms separated by "or" (e.g., "Rehabilitation or Long Term Care").

  Task:
  From the entire resume text, identify all skills mentioned.

  Rules:
  1. For single skills, if the exact phrase appears anywhere (case-insensitive), include it.
  2. For grouped skills, if any of the terms separated by "or" appears anywhere (case-insensitive), return the entire grouped skill phrase exactly as it appears in the list.
  3. Return only the matched skills, no extras.
  4. Output a JSON array of strings with the matched skill phrases, e.g.:
     ["Long Term Care", "Rehabilitation", "Triage"]
  5. If no skills are found, return an empty array: [].
  6. Ensure the skills are present in the available skills list.
)

- employmentBasis: string (e.g., 'Full-Time', 'Part-Time', 'Contract')
- authorization: boolean (work authorization status)
- experience: number (total years of professional experience)
- workStatus: string (e.g., 'Citizen', 'Permanent Resident', 'Work Visa')
- resumeCategory: string (e.g., 'Health Care', 'IT', 'Engineering', 'Marketing')
- resumeText: string (extract the entire resume text in HTML format)
- If a zip code is present, extract and return the corresponding city and full state name
- If a state abbreviation is found, convert and return the full state name

Additional sections (extract if available):
- experienceDetails: Array<{title: string, company: string, startDate: string, endDate: string, description: string}>
- educationDetails: Array<{degree: string, field: string, institution: string, year: string}>
- summary: string

Return ONLY the JSON object. No extra text, markdown formatting, or explanations.`;




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
