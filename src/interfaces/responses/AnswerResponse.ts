// /src/interfaces/responses/AnswerResponse.ts
export interface AnswerResponse {
  id: number;
  questionId: number;
  content: string;
  isCorrect: boolean;
  createdAt: string;
  updatedAt: string;
}
