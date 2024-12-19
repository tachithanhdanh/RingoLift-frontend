// LessonQuestionResponse.ts
import { BaseResponse } from "./BaseResponse";

export interface LessonQuestionResponse extends BaseResponse {
  id: number;
  lessonId: number;
  questionId: number;
}
