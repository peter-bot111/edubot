import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message, StudentProfile } from "../types";

// Initialize the client.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to generate personalized system instructions
const getPersonalizedSystemInstruction = (
  baseRole: string, 
  profile: StudentProfile, 
  language: string
): string => {
  const isTamil = language === 'Tamil';
  const style = profile.learningStyle;
  
  let styleInstruction = "";
  switch (style) {
    case 'VISUAL':
      styleInstruction = "The student is a VISUAL learner. ALWAYS include text-based diagrams (ASCII art), flowcharts using arrows (->), and vivid visual descriptions. Use spatial metaphors.";
      break;
    case 'AUDITORY':
      styleInstruction = "The student is an AUDITORY learner. Write in a conversational, podcast-like style. Use rhymes, mnemonics, and sound-based analogies. Encourage them to read the answer aloud.";
      break;
    case 'INTERACTIVE':
      styleInstruction = "The student is an INTERACTIVE learner. Gamify the content. Use 'Try this' challenges, ask questions back to them, and break concepts into steps they can act on.";
      break;
    case 'READING':
      styleInstruction = "The student prefers READING/WRITING. Use structured lists, clear definitions, and detailed text explanations. Suggest note-taking strategies.";
      break;
  }

  let culturalInstruction = "";
  if (isTamil || profile.region === 'Tamil Nadu') {
    culturalInstruction = "CULTURAL CONTEXT: Tamil Nadu, India. Use local examples (e.g., Chennai, Madurai, Kaveri river), references to Thirukkural if relevant, and local food/names (Idli, Dosa, Raja, Priya) to make examples relatable.";
  } else {
    culturalInstruction = "CULTURAL CONTEXT: General Indian context. Use relatable examples for an Indian student.";
  }

  let accessibilityInstruction = "";
  if (profile.accessibility.dyslexiaFriendly) {
    accessibilityInstruction = "ACCESSIBILITY: The student uses Dyslexia-friendly mode. Use short, clear sentences. Avoid dense paragraphs. Use bullet points and extra spacing. Avoid complex sentence structures.";
  }

  return `${baseRole}
  
  STUDENT PROFILE:
  - Name: ${profile.name}
  - Class: ${profile.classNumber}
  - Learning Style: ${style}
  - Pace: ${profile.learningPace}

  ADAPTATION INSTRUCTIONS:
  1. ${styleInstruction}
  2. ${culturalInstruction}
  3. ${accessibilityInstruction}
  
  Response Language: ${language}.
  ${isTamil ? 'IMPORTANT: Provide the response in Tamil. However, keep technical terms, scientific names, and key concepts in English (or English with Tamil explanation). Example: "Photosynthesis (ஒளிச்சேர்க்கை)".' : 'Respond in English.'}
  
  Formatting: Use Markdown. Be concise but thorough.`;
};

export const generateEducationResponse = async (
  promptText: string, 
  profile: StudentProfile,
  language: string = 'English',
  modelName: string = 'gemini-3-flash-preview'
): Promise<string> => {
  try {
    const systemInstruction = getPersonalizedSystemInstruction(
      "You are EduBot, a helpful, encouraging, and safe AI tutor for students K-12.",
      profile,
      language
    );

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: promptText,
      config: {
        systemInstruction: systemInstruction,
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });

    return response.text || "I apologize, but I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`;
  }
};

export const generateChatResponse = async (
  history: Message[],
  newMessage: string,
  profile: StudentProfile,
  language: string = 'English'
): Promise<string> => {
  try {
    const systemInstruction = getPersonalizedSystemInstruction(
      `You are EduBot, a personalized AI Tutor for ${profile.name}. Be conversational and Socratic.`,
      profile,
      language
    );

    // Map internal Message type to Gemini Content type
    const formattedHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: systemInstruction,
      },
      history: formattedHistory
    });

    const response: GenerateContentResponse = await chat.sendMessage({
      message: newMessage
    });

    return response.text || "I'm having trouble thinking of a response.";
  } catch (error) {
     console.error("Gemini Chat API Error:", error);
     return "Sorry, I lost my train of thought. Can you say that again?";
  }
};

export const hydratePrompt = (template: string, variables: Record<string, string>): string => {
  let hydrated = template;
  for (const [key, value] of Object.entries(variables)) {
    // Replace all occurrences of {KEY}
    const regex = new RegExp(`{${key}}`, 'g');
    hydrated = hydrated.replace(regex, value);
  }
  return hydrated;
};