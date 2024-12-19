import { BaseResponse } from "./BaseResponse";

// ChapterResponse Interface
export interface ChapterResponse extends BaseResponse {
  id: number;
  name: string;
  coverImage?: string;
  description?: string;
}
