export interface FeedbackRequest {
    userId: number;
    lessonId: number;
    stars: number;
    comment?: string;
}