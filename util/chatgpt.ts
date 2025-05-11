import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Get the generative model (Gemini 2.0 Flash)
const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export default geminiModel;
