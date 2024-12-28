export interface Lesson {
  id: number;
  title: string;
  chapterId: number | null; // The chapter_id can be nullable
  description: string;
  createdAt: string; // ISO 8601 string
  updatedAt: string; // ISO 8601 string
}