import { GoogleGenerativeAI } from "@google/generative-ai";
import Tesseract from "tesseract.js";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyDp83vZVzbLZ6hh7Jr35ICC_HYxsL-wR9Y'
);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function extractTextFromImage(file: File): Promise<string> {
  const image = await file.arrayBuffer();
  const {
    data: { text },
  } = await Tesseract.recognize(Buffer.from(image), "eng");

  // Sanitize OCR output
  return text
    .replace(/\s{2,}/g, " ")
    .replace(/[^\x00-\x7F]/g, "")
    .trim();
}

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
      return response.candidates?.[0]?.content?.parts?.[0]?.text || "";
    } catch (error: any) {
      lastError = error;
      if (error.message?.includes("503") && attempt < maxRetries) {
        const delayMs = initialDelay * Math.pow(2, attempt - 1);
        console.log(`Attempt ${attempt} failed. Retrying in ${delayMs}ms...`);
        await delay(delayMs);
      } else {
        throw error;
      }
    }
  }
  throw lastError;
}

export async function parseCertificateWithGemini(
  file: File,
  maxRetries = 3
): Promise<any> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite-preview-06-17",
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 2048,
      },
    });

    let content: string;

    if (file.type.startsWith("image/")) {
      content = await extractTextFromImage(file);
    } else if (file.type === "application/pdf") {
      const arrayBuffer = await file.arrayBuffer();
      const pdfPart = {
        inlineData: {
          data: Buffer.from(arrayBuffer).toString("base64"),
          mimeType: "application/pdf",
        },
      };

      const prompt = `
Extract the following fields from this certificate and return them in a valid JSON object:
- certificateType
- certificateFullName
- nameOnLicense
- issuedNo
- issuedDate (look for labels like "Issued on", "Date of Issue", etc., and return in YYYY-MM-DD format)
- expiryDate (look for "Valid until", "Expiry", etc., and return in YYYY-MM-DD format)
- issuedCenter

Use empty strings for missing values. Do not include any extra text. Return ONLY the JSON object.
`;

      const text = await callGeminiWithRetry(
        model,
        [prompt, pdfPart],
        maxRetries
      );
      console.log("Gemini PDF response:", text);

      const jsonMatch = text.match(/\{[\s\S]*?\}/);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);

      throw new Error("Invalid response format.");
    } else {
      throw new Error("Unsupported file type.");
    }

    // For image text, send Gemini a structured prompt
    const prompt = `
    Extract the following fields from this certificate and return them in a valid JSON object:
    
    - certificateFullName: Return the SHORT form of the certificate name ONLY, based on this list:
      BLS - Basic Life Support
      LPN - Licensed Practical Nurse
      ABOR - AAB Board Of Registry
      ACLR - ADVANCED CARDIO VASCULAR LIFE SUPPORT
      NBSTSA - NATIONAL BOARD OF SURGICAL TECHNOLOGY AND SURGICAL ASSISTING
      NIHSS - NATIONAL INSTITUTE OF HEALTH STROKE SCALE EXAM
      PALS - Pediatric Advanced Life Support
      RN - Registered Nurse
    
    If the full name found in the certificate matches any name in the list above, return the corresponding SHORT form here.
    
    - certificateType: Return the full name of the certificate exactly as found.
    
    - nameOnLicense (Name on the license/certificate)
    - issuedNo (Certificate or license number, unique ID or code of the certificate)
    - issuedDate (e.g., "Issued on", "Date of Issue", etc., return in YYYY-MM-DD format)
    - expiryDate (e.g., "Valid until", "Expiry", etc., return in YYYY-MM-DD format)
    - issuedCenter (Organization or center that issued the certificate)
    
    If any field is missing, return an empty string for it. Respond with ONLY the JSON object without any extra text.
    `
    
    

    const text = await callGeminiWithRetry(model, prompt, maxRetries);
    console.log("Gemini Image response:", text);

    const jsonMatch = text.match(/\{[\s\S]*?\}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);

    throw new Error("Invalid response format.");
  } catch (error) {
    console.error("Error parsing certificate:", error);
    throw error;
  }
}
