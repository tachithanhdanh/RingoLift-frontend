import { FeedbackRequest } from "../interfaces/requests/FeedbackRequest";
import { FeedbackResponse } from "../interfaces/responses/FeedbackResponse";
import { ResponseObject } from "../interfaces/responses/ResponseObject";
import api from "./api";

// Tạo một feedback mới
export const createFeedback = async (
    feedbackRequest: FeedbackRequest
): Promise<FeedbackResponse> => {
    try {
        const response = await api.post<ResponseObject<FeedbackResponse>>(
            "/feedbacks",
            feedbackRequest
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

// Lấy feedback theo id
export const getFeedback = async (
    feedbackId: number
): Promise<FeedbackResponse> => {
    try {
        const response = await api.get<ResponseObject<FeedbackResponse>>(
            `/feedbacks/${feedbackId}`
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

// Lấy danh sách feedback theo user id và lession id
export const getFeedbacksByUserAndLesson = async (
    userId: number,
    lessonId: number
): Promise<FeedbackResponse> => {
    try {
        const response = await api.get<ResponseObject<FeedbackResponse>>(
            `/feedbacks/user/${userId}/lesson/${lessonId}`
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

// Cập nhật feedback
export const updateFeedback = async (
    feedbackId: number,
    feedbackRequest: FeedbackRequest
): Promise<FeedbackResponse> => {
    try {
        const response = await api.put<ResponseObject<FeedbackResponse>>(
            `/feedbacks/${feedbackId}`,
            feedbackRequest
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

// Xoá feedback theo id
export const deleteFeedback = async (
    feedbackId: number,
    userId: number,
    lessonId: number
): Promise<FeedbackResponse> => {
    try {
        const response = await api.delete<ResponseObject<FeedbackResponse>>(
            `/feedbacks/${feedbackId}/user/${userId}/lesson/${lessonId}`,
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
}