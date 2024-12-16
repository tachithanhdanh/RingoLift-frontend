import { BaseResponse } from "./BaseResponse";

export interface FeedbackResponse extends BaseResponse {
    id: number;
    userId: number;
    lessonId: number;
    content: string;
}