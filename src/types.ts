export interface AnalysisResult {
  substance_score: number;
  fluff_percentage: number;
  weaknesses?: string[];
  improved_answer: string;
}

export interface OverallReport {
  average_score: number;
  total_fluff_average: number;
  strength: string;
  major_gap: string;
  improvement_prediction: string;
  hiring_probability: number;
  steps_to_improve: string[];
}

export interface InterviewSession {
  id: string;
  timestamp: number;
  role: string;
  level: string;
  overall: OverallReport;
  questions: string[];
  answers: string[];
  results: AnalysisResult[];
}
