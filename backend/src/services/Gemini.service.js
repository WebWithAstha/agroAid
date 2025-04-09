import { config } from "../config/config.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Generative AI client
const genAI = new GoogleGenerativeAI(config.geminiApiKey);


// System instruction for the AI model
const systemInstruction = `

`;

// Set up text model
const textModel = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction
});

const textConfig = {
  temperature: 0.9,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};
