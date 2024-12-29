import { BaseResponse } from "./BaseResponse";

export interface DailyProgressResponse extends BaseResponse {
    id: number;
    userId: number;
    timeSpent: number;
    lessonCount: number;
    wordCount: number;
}