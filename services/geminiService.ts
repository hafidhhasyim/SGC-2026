import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

const getAIClient = () => {
  if (!ai) {
    // Initialize lazily to prevent top-level crashes if environment isn't ready
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }
  return ai;
};

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[],
  systemInstruction: string
): Promise<string> => {
  try {
    const client = getAIClient();
    const chat = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
      history: history,
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Maaf, saya tidak dapat memproses permintaan Anda saat ini.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return a graceful error message instead of crashing
    return "Maaf, saya sedang mengalami gangguan koneksi. Mohon coba lagi beberapa saat lagi.";
  }
};