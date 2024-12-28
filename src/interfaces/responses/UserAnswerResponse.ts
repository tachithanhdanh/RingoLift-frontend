// UserAnswerResponse.ts
import { BaseResponse } from "./BaseResponse";

export interface UserAnswerResponse extends BaseResponse {
  id: number;
  userId: number;
  questionId: number;
  answerText: string;
  createdAt: string;
  updatedAt: string;
}
