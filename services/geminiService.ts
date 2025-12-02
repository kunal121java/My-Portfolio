import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Initialize Gemini Client
// Note: In a production environment, API keys should be handled via a backend proxy to avoid exposure.
// For this demo, we assume strictly it comes from process.env as per instructions.
const apiKey = process.env.API_KEY || ''; 

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (!apiKey) {
    console.warn("API Key is missing. AI features will not work.");
    // We return a dummy object or handle this gracefully in UI
  }

  const ai = new GoogleGenAI({ apiKey });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      maxOutputTokens: 200, // Keep responses concise for a chat widget
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<AsyncIterable<string>> => {
  if (!chatSession) {
    chatSession = initializeChat();
  }

  try {
    const result = await chatSession.sendMessageStream({ message });
    
    // Generator to yield text chunks
    async function* streamGenerator() {
      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          yield c.text;
        }
      }
    }

    return streamGenerator();

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
