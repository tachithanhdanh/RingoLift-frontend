import { BaseResponse } from "./BaseResponse";

// LessonProgressResponse Interface
export interface LessonProgressResponse extends BaseResponse {
  id: number;
  correctCount: number;
  incorrectCount: number;
  timeSpent: number;
  userId: number;
  lessonId: number;
}
