import { GoalRequest } from "../interfaces/requests/GoalRequest";
import { GoalResponse } from "../interfaces/responses/GoalResponse";
import { ResponseObject } from "../interfaces/responses/ResponseObject";
import api from "./api";

// Tạo một goal mới
export const createGoal = async (
    goalRequest: GoalRequest
): Promise<GoalResponse> => {
    try {
        const response = await api.post<ResponseObject<GoalResponse>>(
            "/goals",
            goalRequest
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

// Lấy danh sách goals
export const getGoals = async (
): Promise<GoalResponse> => {
    try {
        const response = await api.get<ResponseObject<GoalResponse>>(
            `/goals`
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

// Lấy goal theo id
export const getGoal = async (
    goalId: number
): Promise<GoalResponse> => {
    try {
        const response = await api.get<ResponseObject<GoalResponse>>(
            `/goals/${goalId}`
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

// Cập nhật goal theo id
export const updateGoal = async (
    goalId: number,
    goalRequest: GoalRequest
): Promise<GoalResponse> => {
    try {
        const response = await api.put<ResponseObject<GoalResponse>>(
            `/goals/${goalId}`,
            goalRequest
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

// Xoá goal theo id
export const deleteGoal = async (
    goalId: number
): Promise<GoalResponse> => {
    try {
        const response = await api.put<ResponseObject<GoalResponse>>(
            `/goals/${goalId}`
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
};
