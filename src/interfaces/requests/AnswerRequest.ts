// /src/interfaces/requests/AnswerRequest.ts
export interface AnswerRequest {
  questionId: number;
  content: string;
  isCorrect: boolean;
}
  