// /src/services/answerService.ts
import api from "./api";
import { AnswerRequest } from "../interfaces/requests/AnswerRequest";
import { AnswerResponse } from "../interfaces/responses/AnswerResponse";
import { ResponseObject } from "../interfaces/responses/ResponseObject";
import { handleApiError } from "../utils/errorHandler";

/**
 * Lấy tất cả các tùy chọn (answers) cho một câu hỏi.
 * GET /api/v1/answers/{questionId}
 */
export const getAnswersByQuestionId = async (
  questionId: number
): Promise<AnswerResponse[]> => {
  try {
    const response = await api.get<ResponseObject<AnswerResponse[]>>(
      `/answers/${questionId}`
    );
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * Tạo một tùy chọn mới cho một câu hỏi.
 * POST /api/v1/answers
 */
export const createAnswer = async (
  answerRequest: AnswerRequest
): Promise<AnswerResponse> => {
  try {
    const response = await api.post<ResponseObject<AnswerResponse>>(
      `/answers`,
      answerRequest
    );
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * Cập nhật một tùy chọn dựa trên answerId và questionId.
 * PUT /api/v1/answers/{answerId}
 */
export const updateAnswer = async (
  answerId: number,
  answerRequest: AnswerRequest
): Promise<AnswerResponse> => {
  try {
    const response = await api.put<ResponseObject<AnswerResponse>>(
      `/answers/${answerId}`,
      answerRequest
    );
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * Xóa một tùy chọn dựa trên questionId và answerId.
 * DELETE /api/v1/answers/{questionId}/{answerId}
 */
export const deleteAnswer = async (
  questionId: number,
  answerId: number
): Promise<void> => {
  try {
    await api.delete(`/answers/${questionId}/${answerId}`);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
