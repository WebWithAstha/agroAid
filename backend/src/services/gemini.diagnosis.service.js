import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../config/config.js";

const apiKey = config.geminiApiKey;
const genai = new GoogleGenerativeAI(apiKey);

const systemInstruction = `
You are a crop disease detail provider. 
Given the name, scientific name, and language, return a JSON object containing:
1. A short description of the disease.
2. An array of 4-5 key symptoms in sentence format.
3. An array of 4-5 prevention methods.
4. A treatment object with:
   - organic: an array of 4-5 organic treatment options
   - chemical: an array of 4-5 chemical treatment options

Respond in the requested language. 
If the disease name or scientific name is invalid or unknown, return:
{ "error": "Invalid disease or crop name provided." }
`;

export const getDiseaseDetailByGemini = async ({ name, scientificName, lan="english" }) => {
  try {
    const model = genai.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction,
    });

    // Building user query
    const userQuery = `
Provide information about the crop disease:
- Name: ${name}
- Scientific Name: ${scientificName}
- Language: ${lan}

Format the output as a JSON object with these fields:
{
  "description": "short summary...",
  "symptoms": ["symptom 1", "symptom 2", ...],
  "preventions": ["prevention 1", ...],
  "treatment": {
    "organic": ["treatment 1", ...],
    "chemical": ["treatment 1", ...]
  }
}
`;

    const response = await model.generateContent(userQuery);
    let result = await response.response.text();

    if (!result) {
      console.error("Empty or undefined response text:", response);
      return { error: "Invalid response from Gemini API." };
    }

    // Try parsing to JSON
    try {
      const parsed = JSON.parse(result);
      return parsed;
    } catch (parseError) {
      console.error("Failed to parse Gemini response as JSON:", result);
      return { error: "Failed to parse response. Response may not be in correct format." };
    }
  } catch (err) {
    console.error("Gemini API error:", err);
    return { error: "Something went wrong while fetching disease details." };
  }
};
