import { GoogleGenAI } from "@google/genai";
import { AnalysisResult, OverallReport } from "../types";

export const analyzeSession = async (role: string, sessions: { question: string; answer: string }[]) => {
  const apiKey = (process.env as any).GEMINI_API_KEY || (process.env as any).GEMINI_API_KEY1;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY or GEMINI_API_KEY1 is not defined.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are an expert, strict Technical Interviewer. Analyze a 5-question interview session.
    Role: ${role}
    
    Sessions:
    ${sessions.map((s, i) => `Q${i + 1}: ${s.question}\nA${i + 1}: ${s.answer}`).join('\n\n')}

    Task:
    1. Analyze each question-answer pair for substance (0-100), fluff (0-100), and specific weaknesses.
    2. Provide an overall summary, hiring probability, and a roadmap for improvement.

    Return ONLY a JSON response in this format:
    {
      "questionResults": [
        {
          "substance_score": number,
          "fluff_percentage": number,
          "weaknesses": string[],
          "improved_answer": "STAR format version"
        }
      ],
      "overall": {
        "average_score": number,
        "total_fluff_average": number,
        "strength": "string",
        "major_gap": "string",
        "improvement_prediction": "string",
        "hiring_probability": number,
        "steps_to_improve": ["string"]
      }
    }
  `;

  try {
    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = result.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};
