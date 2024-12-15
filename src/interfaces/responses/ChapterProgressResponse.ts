import { BaseResponse } from "./BaseResponse";

// ChapterProgressResponse
export interface ChapterProgressResponse extends BaseResponse {
  id: number;
  unlocked: boolean;
  chapterId: number;
  userId: number;
}
