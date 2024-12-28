// userAnswerService.ts
import api from "./api";
import { UserAnswerRequest } from "../interfaces/requests/UserAnswerRequest";
import { UserAnswerResponse } from "../interfaces/responses/UserAnswerResponse";
import { ResponseObject } from "../interfaces/responses/ResponseObject";
import { handleApiError } from "../utils/errorHandler";

// Create a new UserAnswer
export const createUserAnswer = async (
  userAnswerRequest: UserAnswerRequest
): Promise<UserAnswerResponse> => {
  try {
    const response = await api.post<ResponseObject<UserAnswerResponse>>(
      "/user-answers",
      userAnswerRequest
    );
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Update an existing UserAnswer by ID
export const updateUserAnswer = async (
  id: number,
  userAnswerRequest: UserAnswerRequest
): Promise<UserAnswerResponse> => {
  try {
    const response = await api.put<ResponseObject<UserAnswerResponse>>(
      `/user-answers/${id}`,
      userAnswerRequest
    );
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Get UserAnswer by ID
export const getUserAnswerById = async (id: number): Promise<UserAnswerResponse> => {
  try {
    const response = await api.get<ResponseObject<UserAnswerResponse>>(`/user-answers/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Get all UserAnswers by User ID
export const getUserAnswersByUserId = async (userId: number): Promise<UserAnswerResponse[]> => {
  try {
    const response = await api.get<ResponseObject<UserAnswerResponse[]>>(`/user-answers/user/${userId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Get all UserAnswers by Question ID
export const getUserAnswersByQuestionId = async (questionId: number): Promise<UserAnswerResponse[]> => {
  try {
    const response = await api.get<ResponseObject<UserAnswerResponse[]>>(`/user-answers/question/${questionId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Delete UserAnswer by ID
export const deleteUserAnswer = async (id: number): Promise<void> => {
  try {
    await api.delete<ResponseObject<void>>(`/user-answers/${id}`);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const checkUserAnswer = async (id: number): Promise<boolean> => {
  try {
    const response = await api.post<ResponseObject<boolean>>(`/user-answers/${id}/check`);
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
