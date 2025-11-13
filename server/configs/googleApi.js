// server/configs/googleApi.js
import { GoogleGenAI } from "@google/genai";

// Make sure process.env.GOOGLE_API_KEY is loaded via dotenv in server.js
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY
});

async function main(prompt) {
  try {
    // The API expects contents as an array of objects
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ type: "text", text: prompt }],
      config: {
        thinkingConfig: {
          thinkingBudget: 0 // disables extra thinking
        }
      }
    });



    // Return only the generated text
    return response?.text || "";
  } catch (error) {
    console.error("GoogleGenAI error:", error);
    throw error; // let the caller handle it
  }
}

export default main;
