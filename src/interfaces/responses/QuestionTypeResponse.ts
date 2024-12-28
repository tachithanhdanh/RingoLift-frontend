// QuestionTypeResponse.ts
import { BaseResponse } from "./BaseResponse";

export interface QuestionTypeResponse extends BaseResponse {
  id: number;
  quesType: string;
  createdAt: string;
  updatedAt: string;
}
