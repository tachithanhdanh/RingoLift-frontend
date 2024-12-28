// src/interfaces/responses/MistakeResponse.ts

export interface MistakeResponse {
                                     id: number;                 // ID của lỗi
                                     userId: number;           // ID của người dùng
                                     lessonId: number;         // ID của bài học
                                     questionId: number;       // ID của câu hỏi
                                     yourAnswer: string;       // Câu trả lời của người dùng
                                     correctAnswer: string;    // Câu trả lời đúng
                                     active: boolean;           // Trạng thái hoạt động
                                     createdAt: string;        // Thời gian tạo
                                     updatedAt: string;        // Thời gian cập nhật
                                 }