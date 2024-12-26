import api from "./api";
import { AnswerResponse } from "../interfaces/responses/AnswerResponse";
import { ResponseObject } from "../interfaces/responses/ResponseObject";
import { handleApiError } from "../utils/errorHandler";

// Fetch correct answers by question ID
export const getCorrectAnswersByQuestionId = async (
  questionId: number
): Promise<AnswerResponse[]> => {
  if (questionId === undefined || questionId === null) {
    console.warn('Invalid question ID:', questionId);
    return []; // Return an empty array if the question ID is invalid
  }

  try {
    const response = await api.get<ResponseObject<AnswerResponse[]>>(
      `/answers/${questionId}/True`
    );
    return response.data.data || [];
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Fetch all answers by question ID
export const getAnswersByQuestionId = async (questionId: number): Promise<AnswerResponse[]> => {
  if (questionId === undefined || questionId === null) {
    console.warn('Invalid question ID:', questionId);
    return [];
  }

  try {
    const response = await api.get<ResponseObject<AnswerResponse[]>>(
      `/answers/${questionId}`
    );
    return response.data.data || [];
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Fetch answers by question ID and correctness status
export const getAnswersByQuestionIdAndStatus = async (
  questionId: number,
  isCorrect: boolean
): Promise<AnswerResponse[]> => {
  if (questionId === undefined || questionId === null) {
    console.warn('Invalid question ID:', questionId);
    return [];
  }

  try {
    const response = await api.get<ResponseObject<AnswerResponse[]>>(
      `/answers/${questionId}/${isCorrect}`
    );
    return response.data.data || [];
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Create a new answer
export const createAnswer = async (request: AnswerRequest): Promise<AnswerResponse> => {
  try {
    const response = await api.post<ResponseObject<AnswerResponse>>(
      `/answers`,
      request
    );
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Update an existing answer
export const updateAnswer = async (
  answerId: number,
  request: AnswerRequest
): Promise<AnswerResponse> => {
  try {
    const response = await api.put<ResponseObject<AnswerResponse>>(
      `/answers/${answerId}`,
      request
    );
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Delete an answer
export const deleteAnswer = async (questionId: number, answerId: number): Promise<void> => {
  try {
    await api.delete(`/answers/${questionId}/${answerId}`);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};