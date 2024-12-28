// LessonQuestionResponse.ts
import { BaseResponse } from "./BaseResponse";

export interface LessonQuestionResponse extends BaseResponse {
  id: number;
  lesson_id: number;
  question_id: number;
  created_at: string;
  updated_at: string;
}
