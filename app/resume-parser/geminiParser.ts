import { GenerateContentResult, GoogleGenerativeAI } from "@google/generative-ai";
import * as mammoth from 'mammoth';

// Assuming IResume is defined elsewhere in your project
interface IResume {
    name: { first: string, middle: string, last: string };
    email: string;
    telephone: string;
    homePhone: string;
    address: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    gender: string;
    skills: string[];
    employmentBasis: string;
    authorization: boolean;
    experience: number;
    workStatus: string;
    resumeCategory: string;
    resumeText: string;
    experienceDetails?: Array<{ title: string, company: string, startDate: string, endDate: string, description: string }>;
    educationDetails?: Array<{ degree: string, field: string, institution: string, year: string }>;
    summary?: string;
}

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'YOUR_DEFAULT_API_KEY'); // Use a placeholder or secure default


async function extractTextFromFile(file: File): Promise<string> {
    if (file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        return result.value;
    } else {
        return await file.text();
    }
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function callGeminiWithRetry(
    model: any,
    promptParts: (string | any)[], // Changed to promptParts to accept both string and Part objects
    maxRetries = 3,
    initialDelay = 1000
): Promise<string> {
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await model.generateContent({ contents: [{ parts: promptParts }] }); // Use the new structure for parts
            const response = await result.response;
            return response.candidates?.[0]?.content?.parts?.[0]?.text || '';
        } catch (error: any) {
            lastError = error;
            if (error.message?.includes('503') && attempt < maxRetries) {
                const delayMs = initialDelay * Math.pow(2, attempt - 1);
                console.warn(`Attempt ${attempt} failed with 503. Retrying in ${delayMs}ms...`);
                await delay(delayMs);
            } else {
                throw error;
            }
        }
    }
    throw lastError;
}



export async function parseResumeWithGemini(file: File, maxRetries = 3, availableSkills: string[]): Promise<Partial<IResume>> {
    try {
        let contentToProcess: string | ArrayBuffer;
        let fileParts: (string | any)[]; // To hold the prompt and file content parts

        // Prepare the content based on file type
        if (file.type === 'application/pdf') {
            contentToProcess = await file.arrayBuffer();
            fileParts = [
                { text: `Extract the following information from the PDF resume in JSON format.` },
                {
                    inlineData: {
                        data: Buffer.from(contentToProcess as ArrayBuffer).toString('base64'),
                        mimeType: 'application/pdf',
                    },
                },
            ];
        } else {
            contentToProcess = await extractTextFromFile(file);
            fileParts = [
                { text: `Extract the following information from the resume text in JSON format.` },
                { text: contentToProcess as string },
            ];
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

        const commonPromptInstructions = 
       `If a field is not found or is not applicable, return an empty string, false, or an empty array as appropriate for its type.
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
        - resumeText: string (extract the entire resume text in HTML format, ensuring proper HTML tags like <p>, <strong>, <em>, <ul>, <li>, <br> are used where appropriate for structure and formatting.)
        IF ZIP CODE PRESENT GIVE ME THE STATE CITY.
        IF YOU FIND THE STATE WITH SHORT FORM GIVE ME FULL NAME.

        Additional sections (extract if available):
        - experienceDetails: Array<{title: string, company: string, startDate: string, endDate: string, description: string}>
        - educationDetails: Array<{degree: string, field: string, institution: string, year: string}>
        - summary: string

        Return ONLY the JSON object. Do not include any extra text, markdown formatting, or conversational elements.
        The JSON object must be complete and valid.
        `;

        // Prepend the common instructions to the file-specific parts
        fileParts[0].text += commonPromptInstructions;

        let rawGeminiResponse: string;
        try {
            rawGeminiResponse = await callGeminiWithRetry(model, fileParts, maxRetries);
            console.log('Raw text from API:', rawGeminiResponse);
        } catch (error: any) {
            console.error('Error calling Gemini API:', error);
            if (error.message?.includes('503')) {
                throw new Error('The service is currently unavailable. Please try again later.');
            }
            throw error;
        }

        let jsonString = rawGeminiResponse;

     
        try {
            // Step 1: Attempt to extract JSON from a markdown code block (```json ... ```)
            // This is the most common and preferred format from LLMs.
            let jsonMatch = jsonString.match(/```json\n([\s\S]*?)\n```/);
            if (!jsonMatch) {
                // If not found with '```json', try generic '```'
                jsonMatch = jsonString.match(/```(?:\w+)?\n([\s\S]*?)\n```/);
            }

            if (jsonMatch && jsonMatch[1]) {
                jsonString = jsonMatch[1].trim();
            } else {
                // Step 2: If no markdown block, try to find the outermost JSON object/array
                // This handles cases where the model directly outputs JSON without markdown.
                const firstBrace = jsonString.indexOf('{');
                const lastBrace = jsonString.lastIndexOf('}');
                const firstBracket = jsonString.indexOf('[');
                const lastBracket = jsonString.lastIndexOf(']');

                let startIndex = -1;
                let endIndex = -1;

                if (firstBrace !== -1 && lastBrace !== -1 && firstBrace < lastBrace) {
                    startIndex = firstBrace;
                    endIndex = lastBrace + 1;
                } else if (firstBracket !== -1 && lastBracket !== -1 && firstBracket < lastBracket) {
                    startIndex = firstBracket;
                    endIndex = lastBracket + 1;
                }

                if (startIndex !== -1 && endIndex !== -1) {
                    jsonString = jsonString.substring(startIndex, endIndex).trim();
                } else {
                    // Fallback: If no clear JSON structure is found, assume the whole string *might* be JSON
                    // This is less reliable but a last resort.
                    console.warn("No clear JSON markdown or object/array found. Attempting to parse raw response as JSON.");
                }
            }

            // Step 3: Attempt to parse the cleaned string
            const parsedResult = JSON.parse(jsonString) as Partial<IResume>;

            // Step 4: Validate and default missing fields
            // Ensure all required fields have default empty values if missing after parsing
            const defaultResume: Partial<IResume> = {
                name: { first: '', middle: '', last: '' },
                email: '',
                telephone: '',
                homePhone: '',
                address: { street: '', city: '', state: '', zip: '', country: '' },
                gender: '',
                skills: [],
                employmentBasis: '',
                authorization: false,
                experience: 0,
                workStatus: '',
                resumeCategory: '',
                resumeText: '',
                experienceDetails: [],
                educationDetails: [],
                summary: '',
            };

            // Merge parsed result with defaults to ensure all fields are present
            const finalResume: Partial<IResume> = {
                ...defaultResume,
                ...parsedResult,
                name: { ...defaultResume.name, ...(parsedResult.name || {}) },
                address: { ...defaultResume.address, ...(parsedResult.address || {}) },
                skills: parsedResult.skills || [],
                experienceDetails: parsedResult.experienceDetails || [],
                educationDetails: parsedResult.educationDetails || [],
            };

            // Additional validation/correction for specific fields if needed
            if (finalResume.experience < 0) finalResume.experience = 0; // Ensure experience is non-negative
            if (typeof finalResume.authorization !== 'boolean') finalResume.authorization = false; // Ensure boolean

            return finalResume;

        } catch (parseError: any) {
            console.error('JSON Parse Error:', parseError);
            console.error('Problematic JSON text (after extraction attempts):', jsonString);
            throw new Error(`Failed to parse resume: ${parseError.message}. Problematic JSON: ${jsonString.substring(0, 500)}...`);
        }

    } catch (error) {
        console.error('Error in parseResumeWithGemini:', error);
        throw error;
    }
}