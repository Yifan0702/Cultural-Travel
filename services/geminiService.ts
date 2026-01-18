
import { GoogleGenAI, Type } from "@google/genai";
import { Museum } from "../types";

/**
 * Fetches recommended museums for a specific province using Gemini.
 * Uses gemini-3-flash-preview for efficient text generation and structured JSON output.
 */
export const fetchMuseumsForProvince = async (province: string): Promise<Museum[]> => {
  try {
    // Initializing GoogleGenAI directly with process.env.API_KEY as per guidelines.
    // Creating a new instance ensures it uses the correct API key context.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      请列出中国${province}最著名、最值得一去的3到5个博物馆。
      对于每个博物馆，请提供以下信息：
      1. 博物馆名称 (name)
      2. 所在城市 (city)
      3. 简短介绍 (description) - 约50-80字，富有文化底蕴
      4. 镇馆之宝或核心看点 (highlight)
      5. 2-3个代表性标签 (tags)
      
      请确保数据准确，语言优美。
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { 
                type: Type.STRING,
                description: "Name of the museum"
              },
              city: { 
                type: Type.STRING,
                description: "City where the museum is located"
              },
              description: { 
                type: Type.STRING,
                description: "A short elegant description of the museum"
              },
              highlight: { 
                type: Type.STRING,
                description: "The most famous item or highlight of the museum"
              },
              tags: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "2-3 representative tags"
              }
            },
            required: ["name", "city", "description", "highlight", "tags"],
            propertyOrdering: ["name", "city", "description", "highlight", "tags"]
          }
        }
      }
    });

    // Accessing .text property directly as it returns the string output (do not call as a function).
    const jsonStr = response.text?.trim();
    if (!jsonStr) {
      throw new Error("AI returned an empty response.");
    }

    const data = JSON.parse(jsonStr) as Museum[];
    return data;

  } catch (error) {
    console.error("Error fetching museums from Gemini:", error);
    throw error;
  }
};
