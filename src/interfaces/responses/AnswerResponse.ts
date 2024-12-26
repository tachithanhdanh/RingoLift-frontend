import { BaseResponse } from "./BaseResponse";
import { QuestionResponse } from "./QuestionResponse";

export interface AnswerResponse extends BaseResponse {
  id: number;
  content: string;
  isCorrect?: boolean;
  question: QuestionResponse;
}
