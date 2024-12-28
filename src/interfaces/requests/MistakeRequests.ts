// src/interfaces/requests/MistakeRequest.ts

export interface MistakeRequest {
    userId: number;            // ID của người dùng
    lessonId: number;          // ID của bài học
    questionId: number;        // ID của câu hỏi
    yourAnswer: string;        // Câu trả lời của người dùng
    correctAnswer: string;     // Câu trả lời đúng
    active: boolean;            // Trạng thái (đã được xem/chưa được xem)
}