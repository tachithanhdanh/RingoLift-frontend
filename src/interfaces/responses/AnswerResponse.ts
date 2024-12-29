// /src/interfaces/responses/AnswerResponse.ts
import { BaseResponse } from "./BaseResponse";

export interface AnswerResponse extends BaseResponse {
  id: number;
  questionId: number;
  content: string;
}