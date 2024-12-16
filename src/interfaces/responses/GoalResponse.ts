import { BaseResponse } from "./BaseResponse";

export interface GoalResponse extends BaseResponse {
  id: number;
  timeSpent: number;
  lessonCount: number;
  wordCount: number;
}
