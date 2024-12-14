import { BaseResponse } from "./BaseResponse";

// LessonResponse Interface
export interface LessonResponse extends BaseResponse {
  id: number;
  title: string;
  description?: string;
  chapterId: number;
  chapterName: string;
}
