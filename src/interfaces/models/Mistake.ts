export interface Mistake {
    id: number;                 // ID của lỗi
    user_id: number;           // ID của người dùng
    lesson_id: number;         // ID của bài học
    question_id: number;       // ID của câu hỏi
    your_answer: string;       // Câu trả lời của người dùng
    correct_answer: string;    // Câu trả lời đúng
    active: boolean;           // Trạng thái hoạt động
    created_at: string;        // Thời gian tạo
    updated_at: string;        // Thời gian cập nhật
}