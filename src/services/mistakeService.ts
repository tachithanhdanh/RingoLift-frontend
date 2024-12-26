import api from "./api"; // Import API configuration
import { MistakeRequest } from "../interfaces/requests/MistakeRequest";
import { MistakeResponse } from "../interfaces/responses/MistakeResponse";
import { ResponseObject } from "../interfaces/responses/ResponseObject";
import { handleApiError } from "../utils/errorHandler";

// Create a new mistake
export const createMistake = async (
  request: MistakeRequest
): Promise<ResponseObject<MistakeResponse>> => {
  try {
    const response = await api.post<ResponseObject<MistakeResponse>>(
      "/mistakes",
      request
    );
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Update an existing mistake
export const updateMistake = async (
  id: number,
  request: MistakeRequest
): Promise<ResponseObject<MistakeResponse>> => {
  try {
    const response = await api.put<ResponseObject<MistakeResponse>>(
      `/mistakes/${id}`,
      request
    );
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Fetch all mistakes
export const getAllMistakes = async (): Promise<MistakeResponse[]> => {
  try {
    const response = await api.get<ResponseObject<MistakeResponse[]>>(
      "/mistakes"
    );
    return response.data.data || [];  // Ensure fallback if data is undefined
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Fetch a mistake by ID
export const getMistakeById = async (
  userId: number,
  lessonId: number,
  questionId: number,
  id: number
): Promise<MistakeResponse> => {
  try {
    const response = await api.get<ResponseObject<MistakeResponse>>(
      `/mistakes/${userId}/${lessonId}/${questionId}/${id}`
    );
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Delete a mistake
export const deleteMistake = async (
  userId: number,
  lessonId: number,
  questionId: number,
  id: number
): Promise<void> => {
  try {
    await api.delete<ResponseObject<void>>(
      `/mistakes/${userId}/${lessonId}/${questionId}/${id}`
    );
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
