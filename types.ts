export interface Question {
  id: number;
  text: string;
  imageKeyword: string;
  options: {
    value: string;
    label: string;
    reaction: string;
  }[];
}

export interface CareerSuggestion {
  role: string;
  reason: string;
}

export interface AnalysisResult {
  characterName: string;
  movieTitle: string;
  personalityType: string;
  greenFlags: string[];
  redFlags: string[];
  detailedReport: string;
  careerPath: CareerSuggestion[];
  foodMatch: string;
  foodReason: string;
}

export interface QuizState {
  currentStep: 'welcome' | 'quiz' | 'analyzing' | 'result';
  userName: string;
  answers: Record<number, string>;
  result: AnalysisResult | null;
  characterImageUrl: string | null;
  foodImageUrl: string | null;
}

export enum ComparisonStatus {
  IDLE = 'IDLE',
  COMPARING = 'COMPARING',
  DONE = 'DONE'
}