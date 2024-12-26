// src/services/answerService.ts
import api from "./api";
import { AnswerResponse } from "../interfaces/responses/AnswerResponse";
import { ResponseObject } from "../interfaces/responses/ResponseObject";
import { handleApiError } from "../utils/errorHandler";

// Fetch correct answers by question ID
export const getCorrectAnswersByQuestionId = async (
  questionId: number
): Promise<AnswerResponse[]> => {
  try {
    const response = await api.get<ResponseObject<AnswerResponse[]>>(
      `/answers/${questionId}/True`
    );
    return response.data.data || [];
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
