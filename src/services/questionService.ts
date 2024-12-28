// questionService.ts
import api from "./api";
import { QuestionRequest } from "../interfaces/requests/QuestionRequest";
import { QuestionResponse } from "../interfaces/responses/QuestionResponse";
import { QuestionTypeRequest } from "../interfaces/requests/QuestionTypeRequest";
import { QuestionTypeResponse } from "../interfaces/responses/QuestionTypeResponse";
import { ResponseObject } from "../interfaces/responses/ResponseObject";
import { handleApiError } from "../utils/errorHandler";

// Create a new question
export const createQuestion = async (
  questionRequest: QuestionRequest
): Promise<QuestionResponse> => {
  try {
    const response = await api.post<ResponseObject<QuestionResponse>>(
      "/questions",
      questionRequest
    );
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Get all questions
export const getAllQuestions = async (): Promise<QuestionResponse[]> => {
  try {
    const response = await api.get<ResponseObject<QuestionResponse[]>>("/questions");
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Get question by ID
export const getQuestionById = async (questionId: number): Promise<QuestionResponse> => {
  try {
    const response = await api.get<ResponseObject<QuestionResponse>>(`/questions/${questionId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Get questions by type ID
export const getQuestionsByTypeId = async (typeId: number): Promise<QuestionResponse[]> => {
  try {
    const response = await api.get<ResponseObject<QuestionResponse[]>>(`/questions/by-type/${typeId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Update question by ID
export const updateQuestion = async (
  questionId: number,
  questionRequest: QuestionRequest
): Promise<QuestionResponse> => {
  try {
    const response = await api.put<ResponseObject<QuestionResponse>>(
      `/questions/${questionId}`,
      questionRequest
    );
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Delete question by ID
export const deleteQuestion = async (questionId: number): Promise<void> => {
  try {
    await api.delete<ResponseObject<void>>(`/questions/${questionId}`);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Create a new question type
export const createQuestionType = async (
  questionTypeRequest: QuestionTypeRequest
): Promise<QuestionTypeResponse> => {
  try {
    const response = await api.post<ResponseObject<QuestionTypeResponse>>(
      "/questions/types",
      questionTypeRequest
    );
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Get all question types
export const getAllQuestionTypes = async (): Promise<QuestionTypeResponse[]> => {
  try {
    const response = await api.get<ResponseObject<QuestionTypeResponse[]>>("/questions/types");
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Get question type by ID
export const getQuestionTypeById = async (typeId: number): Promise<QuestionTypeResponse> => {
  try {
    const response = await api.get<ResponseObject<QuestionTypeResponse>>(`/questions/types/${typeId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Update question type by ID
export const updateQuestionType = async (
  typeId: number,
  questionTypeRequest: QuestionTypeRequest
): Promise<QuestionTypeResponse> => {
  try {
    const response = await api.put<ResponseObject<QuestionTypeResponse>>(
      `/questions/types/${typeId}`,
      questionTypeRequest
    );
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Delete question type by ID
export const deleteQuestionType = async (typeId: number): Promise<void> => {
  try {
    await api.delete<ResponseObject<void>>(`/questions/types/${typeId}`);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Get lessons by question ID
export const getLessonsByQuestionId = async (questionId: number): Promise<any[]> => {
  try {
    const response = await api.get<ResponseObject<any[]>>(`/questions/${questionId}/lessons`);
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Remove all lessons from question
export const removeAllLessonsFromQuestion = async (questionId: number): Promise<void> => {
  try {
    await api.delete<ResponseObject<void>>(`/questions/${questionId}/lessons`);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
