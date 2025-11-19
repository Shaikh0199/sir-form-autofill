import { GoogleGenAI, Type } from "@google/genai";
import { UploadedImage, SirFormData } from "../types";

export const extractFormData = async (images: UploadedImage[]): Promise<SirFormData> => {
  if (images.length === 0) {
    throw new Error("No images provided");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Prepare image parts for the model
  const imageParts = images.map(img => {
    // Extract base64 data (remove data:image/xxx;base64, prefix)
    const base64Data = img.data.split(',')[1];
    return {
      inlineData: {
        mimeType: 'image/jpeg', // Assuming standard image uploads
        data: base64Data
      }
    };
  });

  const prompt = `
    Analyze these images. They consist of Indian Identity Documents (like Aadhaar, Voter ID/EPIC) and potentially a SIR BLO Form.
    
    Your task is to extract the personal information to fill a standard SIR (Special Summary Revision) or Voter Verification form.
    
    Extract the following fields precisely. If a field is not found, leave it as an empty string.
    
    1. Full Name (Prefer English if available, otherwise transliterate)
    2. Relative Name (Father or Husband's name)
    3. Relation Type (Father, Husband, Mother, Wife, Other)
    4. Date of Birth (DD/MM/YYYY format)
    5. Age (Calculate if DOB is available, or extract if listed)
    6. Gender (Male, Female, Other)
    7. EPIC Number (Voter ID Number - usually alphanumeric e.g., ABC1234567)
    8. Aadhaar Number (12 digits)
    9. Mobile Number (10 digits, if visible)
    10. House Number
    11. Address (Full address text)
    12. Family Members Count (If visible on a card like Ration card, otherwise 0)

    Prioritize accuracy from the Identity Cards (Aadhaar/Voter ID) over handwritten text on the form if unclear.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [...imageParts, { text: prompt }]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fullName: { type: Type.STRING },
            relativeName: { type: Type.STRING },
            relationType: { type: Type.STRING },
            dob: { type: Type.STRING },
            age: { type: Type.STRING },
            gender: { type: Type.STRING },
            epicNumber: { type: Type.STRING },
            aadhaarNumber: { type: Type.STRING },
            mobileNumber: { type: Type.STRING },
            houseNumber: { type: Type.STRING },
            address: { type: Type.STRING },
            familyMembersCount: { type: Type.STRING },
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as SirFormData;
    } else {
      throw new Error("No text response from AI");
    }
  } catch (error) {
    console.error("Gemini Extraction Error:", error);
    throw error;
  }
};
