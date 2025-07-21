import { GenerateContentResult, GoogleGenerativeAI } from "@google/generative-ai";
import * as mammoth from 'mammoth';
import * as pdfjs from 'pdfjs-dist';
import { GlobalWorkerOptions } from 'pdfjs-dist';

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyDp83vZVzbLZ6hh7Jr35ICC_HYxsL-wR9Y');



// Set the worker source for PDF.js
const pdfjsLib = pdfjs;

async function extractTextFromFile(file: File): Promise<string> {
    if (file.type === 'application/pdf') {
      // Handle PDF files
      // Set the worker source
      GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      let text = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map(item => 'str' in item ? item.str : '');
        text += strings.join(' ') + '\n';
      }
      
      return text;
    } else if (file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
      // Handle Word documents
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value;
    } else {
      // For plain text files
      return await file.text();
    }
  }

export async function parseResumeWithGemini(file: File): Promise<Partial<IResume>> {
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
      model: "gemini-1.5-flash",
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
    - skills: string[] (extract all technical and soft skills)
    - employmentBasis: string (e.g., 'Full-Time', 'Part-Time', 'Contract')
    - authorization: boolean (work authorization status)
    - experience: number (total years of professional work experience)
    - workStatus: string (e.g., 'Citizen', 'Permanent Resident', 'Work Visa')
    - resumeCategory: string (e.g., 'Health Care', 'IT', 'Engineering', 'Marketing')
    IF ZIP CODE PRESENT GIVE ME THE STATE CITY 
    IF YOU FIND THE STATE WITH SHORT FORM GIVE ME FULL NAME

    

    Additional sections (extract if available):
    - experienceDetails: Array<{title, company, startDate, endDate, description}>
    - educationDetails: Array<{degree, field, institution, year}>
    - summary: string

    Return ONLY the JSON object. Do not include any extra text, markdown formatting, or conversational elements.`;


    let result: GenerateContentResult;
    
    if (file.type === 'application/pdf') {
      // For PDFs, use the file data directly
      const pdfPart = {
        inlineData: {
          data: Buffer.from(contentToProcess as ArrayBuffer).toString('base64'),
          mimeType: 'application/pdf',
        },
      };
      
      result = await model.generateContent([prompt, pdfPart]);
    } else {
      // For text content, use as string
      result = await model.generateContent([prompt, contentToProcess as string]);
    }
    
    const response = await result.response;
    console.log('Raw response:', response);
    
    // Get the text from the response
    let text = response.candidates[0]?.content?.parts?.[0]?.text || '';
    console.log('Raw text:', text);
    
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
    
    // Remove any trailing characters after the JSON ends
    const jsonEnd = text.lastIndexOf('}') + 1;
    if (jsonEnd > 0) {
      text = text.substring(0, jsonEnd);
    }
    
    console.log('Processed text:', text);
    
    try {
      // Parse and return the JSON
      return JSON.parse(text) as Partial<IResume>;
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
