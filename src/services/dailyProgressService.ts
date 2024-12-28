import { DailyProgressRequest } from "../interfaces/requests/DailyProgressRequest";
import { DailyProgressResponse } from "../interfaces/responses/DailyProgressResponse";
import { ResponseObject } from "../interfaces/responses/ResponseObject";
import api from "./api";

// Tạo một daily progress mới
export const createDailyProgress = async (
    dailyProgressRequest: DailyProgressRequest
): Promise<DailyProgressResponse> => {
    try {
        const response = await api.post<ResponseObject<DailyProgressResponse>>(
            "daily-progresses",
            dailyProgressRequest
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

// Lấy danh sách daily progress
export const getDailyProgress = async (
): Promise<DailyProgressResponse> => {
    try {
        const response = await api.get<ResponseObject<DailyProgressResponse>>(
            "daily-progresses",
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

// Lấy một daily progress theo id
export const getDailyProgressById = async (
    dailyProgressId: number
): Promise<DailyProgressResponse> => {
    try {
        const response = await api.get<ResponseObject<DailyProgressResponse>>(
            `daily-progresses/${dailyProgressId}`,
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

// Lấy một daily progress theo userId và createdAt
export const getDailyProgressByUserIdAndCreatedAt = async (
    userId: number,
    createdAt: string
): Promise<DailyProgressResponse> => {
    try {
        const response = await api.get<ResponseObject<DailyProgressResponse>>(
            `daily-progresses?user_id=${userId}&created_at=${createdAt}`, // example: user_id=20&created_at=2024-12-28
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

// Cập nhật daily progress
export const updateDailyProgress = async (
    dailyProgressId: number,
    dailyProgressRequest: DailyProgressRequest
): Promise<DailyProgressResponse> => {
    try {
        const response = await api.put<ResponseObject<DailyProgressResponse>>(
            `daily-progresses/${dailyProgressId}`,
            dailyProgressRequest
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

// Xoá một daily progress theo id
export const deleteDailyProgress = async (
    dailyProgressId: number,
): Promise<DailyProgressResponse> => {
    try {
        const response = await api.delete<ResponseObject<DailyProgressResponse>>(
            `daily-progresses/${dailyProgressId}`
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
};