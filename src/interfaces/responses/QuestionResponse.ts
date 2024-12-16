import { BaseResponse } from "./BaseResponse";
import { QuestionTypeResponse } from "./QuestionTypeResponse";

export interface QuestionResponse extends BaseResponse {
  id: number;
  content: string;
  audioUrl?: string;
  hint?: string;
  type: QuestionTypeResponse;
}
