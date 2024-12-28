
export interface LessonQuestion {
  id: number;
  lessonId: number;
  questionId: number;
  createdAt: string; // ISO 8601 string
  updatedAt: string; // ISO 8601 string
}