
import { GoogleGenAI, Type } from "@google/genai";
import { Ingredient, Recipe } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const detectIngredients = async (base64Image: string): Promise<Ingredient[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image,
          },
        },
        {
          text: "Identify all the food ingredients and vegetables visible in this pantry or fridge photo. Return them as a JSON array of objects with 'name' and 'category' (e.g., vegetable, fruit, dairy, protein, pantry staple). Be as specific as possible.",
        },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            category: { type: Type.STRING },
          },
          required: ["name", "category"],
        },
      },
    },
  });

  const raw = response.text;
  if (!raw) return [];
  const parsed = JSON.parse(raw);
  return parsed.map((item: any, index: number) => ({
    ...item,
    id: `ing-${index}-${Date.now()}`,
  }));
};

export const generateRecipes = async (ingredients: string[]): Promise<Recipe[]> => {
  const prompt = `Based on these ingredients: ${ingredients.join(', ')}, suggest 3 creative, quick, and healthy recipes. 
  Focus on reducing food waste by using as many of the provided ingredients as possible. 
  Provide structured JSON output with title, description, time (e.g. "20 mins"), difficulty, ingredients, instructions, and a specific 'wasteReductionTip' for one of the main ingredients used.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            time: { type: Type.STRING },
            difficulty: { type: Type.STRING, enum: ['Easy', 'Medium', 'Hard'] },
            ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
            instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
            wasteReductionTip: { type: Type.STRING },
            calories: { type: Type.NUMBER },
          },
          required: ["title", "description", "time", "difficulty", "ingredients", "instructions", "wasteReductionTip"],
        },
      },
    },
  });

  const raw = response.text;
  if (!raw) return [];
  const parsed = JSON.parse(raw);
  return parsed.map((item: any, index: number) => ({
    ...item,
    id: `recipe-${index}-${Date.now()}`,
  }));
};
