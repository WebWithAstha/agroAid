import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../config/config.js";

const apiKey = config.geminiApiKey;
const genai = new GoogleGenerativeAI(apiKey);

const systemInstruction = `
You are a knowledgeable assistant for farmers, focused on providing information about Indian government schemes.

Respond only with properly structured JSON data in plain text, depending on the user's request:

1. If the user asks for a **list of farmer schemes**, respond with a JSON array of up to 20 items. Each item must include:
  {
    "name": "Name of the scheme",
    "short_description": "1-2 line summary of the scheme",
    "type": "Type of scheme (e.g., subsidy, insurance, training, credit)",
    "start_date": "YYYY-MM-DD (if known)",
  }

2. If the user asks about a **specific scheme**, respond with detailed JSON containing:
  {
    "name": "Full name of the scheme",
    "objective": "Purpose or aim of the scheme",
    "benefits": "Benefits provided to farmers",
    "eligibility": "Who is eligible to apply",
    "application_process": "Steps to apply",
    "start_date": "YYYY-MM-DD (if known)",
    "end_date": "YYYY-MM-DD (if applicable or null)",
    "number_of_applicants": "Total applicants so far (if known, else null)",
    "official_link": "URL to official website or contact info (if available)"
  }

Language: Match the language of the user's input (e.g., respond in Hindi if the question is in Hindi).

Do not include explanations, greetings, or additional text — only output the valid JSON response as specified.
`;

export const getSchemeList = async (language = "en") => {
  try {
    const model = genai.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction,
    });

    const promptMap = {
      hi: "किसानों के लिए 20 नवीनतम भारतीय सरकारी योजनाओं की सूची प्रदान करें जिनमें नाम, संक्षिप्त विवरण, योजना का प्रकार, प्रारंभ तिथि और समाप्ति तिथि शामिल हो।",
      en: "List 20 latest Indian government schemes for farmers with name, short description, type of scheme, start date, and end date.",
    };

    const prompt = promptMap[language] || promptMap["en"];

    const result = await model.generateContent(prompt);
    let text = result.response.text();

    if (!text) {
      console.error("Empty or undefined response text:", result);
      return null;
    }
    text = text.trim().replace(/^```json\s*|```$/g, '').trim();
    const parsed = JSON.parse(text);
    return parsed;
  } catch (err) {
    console.error("Error fetching schemes:", err);
    return null;
  }
};

export const getSchemeDetails = async (schemeName, language = "en") => {
  try {
    const model = genai.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction,
    });

    const promptMap = {
      hi: `कृपया "${schemeName}" नामक भारतीय सरकारी योजना के बारे में विस्तृत जानकारी प्रदान करें जिसमें निम्नलिखित JSON स्वरूप में उत्तर दें: नाम, उद्देश्य, लाभ, पात्रता, आवेदन प्रक्रिया, प्रारंभ तिथि, समाप्ति तिथि, अब तक के आवेदकों की संख्या (यदि उपलब्ध हो), और आधिकारिक वेबसाइट या संपर्क लिंक।`,
      en: `Provide detailed information about the Indian government scheme named "${schemeName}" in the following JSON format: name, objective, benefits, eligibility, application_process, start_date, end_date, number_of_applicants (if available), and official_link.`,
    };

    const prompt = promptMap[language] || promptMap["en"];

    const result = await model.generateContent(prompt);
    let text = result.response.text();

    if (!text) {
      console.error("Empty or undefined response text:", result);
      return null;
    }

    text = text.trim().replace(/^```json\s*|```$/g, '').trim();
    const parsed = JSON.parse(text);
    return parsed;
  } catch (err) {
    console.error("Error fetching scheme details:", err);
    return null;
  }
};
