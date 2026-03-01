import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getFinancialAdvice(transactions: Transaction[]) {
  const model = "gemini-3-flash-preview";
  
  const summary = transactions.map(t => `${t.date}: ${t.type === 'income' ? '+' : '-'} R$${t.amount} (${t.category} - ${t.description})`).join('\n');
  
  const prompt = `
    Você é um consultor financeiro pessoal experiente. 
    Analise as seguintes transações e forneça 3 dicas práticas e personalizadas para melhorar a saúde financeira do usuário.
    Seja conciso, motivador e use um tom profissional mas amigável.
    
    Transações:
    ${summary}
    
    Responda em formato JSON com a seguinte estrutura:
    {
      "insights": [
        { "title": "Título curto", "description": "Explicação detalhada" }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    return JSON.parse(response.text || '{"insights": []}');
  } catch (error) {
    console.error("Gemini Error:", error);
    return { insights: [] };
  }
}
