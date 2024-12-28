// /src/interfaces/responses/QuizQuestionResponse.ts
import { AnswerResponse } from "./AnswerResponse";

export interface QuestionResponse {
  id: number;
  content: string;
  audioUrl?: string;
  hint?: string;
  typeId: number; // 1: MULTIPLE_CHOICE, 2: FILL_IN_THE_BLANK
  correctAnswer: string;
  createdAt: string;
  updatedAt: string;
}
