// src/interfaces/requests/MistakeRequest.ts

export interface MistakeRequest {
    user_id: number;            // ID của người dùng
    lesson_id: number;          // ID của bài học
    question_id: number;        // ID của câu hỏi
    your_answer: string;        // Câu trả lời của người dùng
    correct_answer: string;     // Câu trả lời đúng
    active: boolean;            // Trạng thái (đã được xem/chưa được xem)
}