import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, Question } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzePersonality = async (
  questions: Question[],
  answers: Record<number, string>,
  userName: string
): Promise<AnalysisResult> => {
  const ai = getClient();
  
  // Construct a clear transcript of the Q&A for the model
  const interviewTranscript = questions.map(q => {
    const answer = answers[q.id] || "No answer provided";
    // If the answer maps to a specific predefined value option, we could look it up, 
    // but the ID/value itself usually carries enough semantic meaning, 
    // or the 'Custom Answer' string covers it.
    // To be safe, let's map value to label if it's a standard option.
    const selectedOption = q.options.find(o => o.value === answer);
    const answerText = selectedOption ? selectedOption.label : answer;
    
    return `Question: ${q.text}\nAnswer: ${answerText}`;
  }).join('\n\n');

  const prompt = `
    Act as an expert psychologist and pop-culture analyst with a relaxed, modern vibe.
    I will provide a transcript of a personality interview for a user named "${userName}".
    
    Your task:
    1. Analyze the psychological profile based on these answers.
    2. Match this profile to a famous movie character that fits best.
    3. Identify "Green Flags" (strengths) and "Red Flags" (weaknesses).
    4. Write a "Psychological Report" that is concise (approx 150 words) but psychoanalytically detailed. 
       CRITICAL: Use relaxed, contemporary language. Be insightful but chill. Avoid cringey slang or overly formal academic text.
       Address the user directly by name.
    5. Suggest 3 specific career paths or roles. For each, provide a short, punchy reason why it fits this personality (keep it punchy and cool).
    6. Determine what specific FOOD DISH this personality would be. Provide the name and a short, fun reason why (e.g., "Spicy Ramen because you're hot headed but comforting").
    
    Interview Transcript:
    ${interviewTranscript}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          characterName: { type: Type.STRING },
          movieTitle: { type: Type.STRING },
          personalityType: { type: Type.STRING, description: "e.g. INTJ - The Architect" },
          greenFlags: { 
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Positive traits (Strengths)"
          },
          redFlags: { 
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Negative traits (Weaknesses)"
          },
          detailedReport: { type: Type.STRING, description: "Concise deep analysis using relaxed, modern language (max 150 words)" },
          careerPath: { 
            type: Type.ARRAY,
            description: "List of 3 suitable career options",
            items: {
              type: Type.OBJECT,
              properties: {
                role: { type: Type.STRING },
                reason: { type: Type.STRING }
              }
            }
          },
          foodMatch: { type: Type.STRING, description: "Name of the food dish" },
          foodReason: { type: Type.STRING, description: "Why this food fits the personality" }
        },
        required: ["characterName", "movieTitle", "personalityType", "greenFlags", "redFlags", "detailedReport", "careerPath", "foodMatch", "foodReason"]
      }
    }
  });

  if (!response.text) {
    throw new Error("Failed to generate analysis");
  }

  return JSON.parse(response.text) as AnalysisResult;
};

export const generateCharacterImage = async (characterName: string, movieTitle: string): Promise<string> => {
  const ai = getClient();
  
  const prompt = `A cinematic, high-quality digital art portrait of ${characterName} from the movie ${movieTitle}. 
  Dark, moody, atmospheric lighting. 8k resolution, highly detailed.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: prompt,
  });

  const candidates = response.candidates;
  if (candidates && candidates.length > 0) {
    const parts = candidates[0].content.parts;
    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
  }

  throw new Error("No image generated");
};

export const generateFoodImage = async (foodName: string): Promise<string> => {
  const ai = getClient();
  
  const prompt = `A professional, high-end food photography shot of ${foodName}. 
  Dark moody restaurant lighting, steam rising, delicious, appetizing, cinematic composition, 8k resolution.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: prompt,
  });

  const candidates = response.candidates;
  if (candidates && candidates.length > 0) {
    const parts = candidates[0].content.parts;
    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
  }

  throw new Error("No food image generated");
};