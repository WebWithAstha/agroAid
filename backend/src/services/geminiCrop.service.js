import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../config/config.js";
const apiKey = config.geminiApiKey;
const genai = new GoogleGenerativeAI(apiKey);
const systemInstruction = `
You are an agriculture assistant. Provide short, accurate, and helpful answers to farmers’ queries related to:

Crop farming (selection, care, seasonal tips)

Weather updates (current and forecasts)

Market/mandi prices (if available)

Pest detection and control

Farming best practices and government schemes

For questions outside agriculture, politely inform the user that you can only assist with agriculture-related topics.
Language: Respond in the same language as the user's question. If a user asks in Hindi, reply in Hindi; if in English, reply in English, and so on.
Tone: Professional, concise, friendly, and supportive. Avoid long paragraphs. Be clear and direct in your responses.
Formatting: Do not use any Markdown formatting (like asterisks *, **, bullet points, or headings). Respond in plain, simple text only, suitable for being read aloud clearly.
`



export const callGeminiApi = async ( userQuery) => {
  try {
    const model = genai.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: systemInstruction,
    });
    const response = await model.generateContent(userQuery);
    let result = await response.response.text();
    if (!result) {
      console.error("Empty or undefined response text:", response);
      return "Invalid response from API.";
    }
    // result = result.replace(/[^a-zA-Z0-9\s]/g, ''); // This will remove any non-alphanumeric characters except spaces.

    return result;
  } catch (err) {
    console.log(err);
    return "Sorry something is wrong.";
  }
};