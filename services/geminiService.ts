
import { GoogleGenAI, Type } from "@google/genai";
import { GeminiSlideResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchSlideContent = async (): Promise<GeminiSlideResponse[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate exactly 8 inspirational travel destinations. Each should have a catchy heading, a brief descriptive text (max 15 words), and a 1-word keyword for finding a beautiful related image.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              heading: { type: Type.STRING },
              text: { type: Type.STRING },
              keyword: { type: Type.STRING },
            },
            required: ["heading", "text", "keyword"],
          },
        },
      },
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text);
  } catch (error) {
    console.error("Error fetching from Gemini:", error);
    return [];
  }
};
