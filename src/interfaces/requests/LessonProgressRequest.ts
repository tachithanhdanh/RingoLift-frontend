// LessonProgressRequest
export interface LessonProgressRequest {
  correctCount: number;
  incorrectCount: number;
  timeSpent: number;
  lessonId?: number;
  userId?: number;
}
