// QuestionRequest.ts
export interface QuestionRequest {
  content: string;
  audioUrl?: string;
  hint?: string;
  typeId: number;
  correctAnswer: string;
}
