// lessonService.ts
import api from "./api";
import { LessonRequest } from "../interfaces/requests/LessonRequest";
import { LessonResponse } from "../interfaces/responses/LessonResponse";
import { LessonQuestionResponse } from "../interfaces/responses/LessonQuestionResponse";
import { ResponseObject } from "../interfaces/responses/ResponseObject";
import { handleApiError } from "../utils/errorHandler";

// Create a new lesson
export const createLesson = async (
  lessonRequest: LessonRequest
): Promise<LessonResponse> => {
  try {
    const response = await api.post<ResponseObject<LessonResponse>>(
      "/lessons",
      lessonRequest
    );
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Get all lessons by chapter ID
export const getLessonsByChapterId = async (
  chapterId: number
): Promise<LessonResponse[]> => {
  try {
    const response = await api.get<ResponseObject<LessonResponse[]>>(
      `/lessons/chapter/${chapterId}`
    );
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Get a lesson by ID
export const getLessonById = async (
  lessonId: number
): Promise<LessonResponse> => {
  try {
    const response = await api.get<ResponseObject<LessonResponse>>(
      `/lessons/${lessonId}`
    );
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Update a lesson by ID
export const updateLesson = async (
  lessonId: number,
  lessonRequest: LessonRequest
): Promise<LessonResponse> => {
  try {
    const response = await api.put<ResponseObject<LessonResponse>>(
      `/lessons/${lessonId}`,
      lessonRequest
    );
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Delete a lesson by ID
export const deleteLesson = async (lessonId: number): Promise<void> => {
  try {
    await api.delete<ResponseObject<void>>(`/lessons/${lessonId}`);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Add a question to a lesson
export const addQuestionToLesson = async (
  lessonId: number,
  questionId: number
): Promise<LessonQuestionResponse> => {
  try {
    const response = await api.post<ResponseObject<LessonQuestionResponse>>(
      `/lessons/${lessonId}/questions/${questionId}`
    );
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Get all questions by lesson ID
export const getQuestionsByLessonId = async (
  lessonId: number
): Promise<LessonQuestionResponse[]> => {
  try {
    const response = await api.get<ResponseObject<LessonQuestionResponse[]>>(
      `/lessons/${lessonId}/questions`
    );
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Get a lesson question by lesson ID and question ID
export const getLessonQuestionById = async (
  lessonId: number,
  questionId: number
): Promise<LessonQuestionResponse> => {
  try {
    const response = await api.get<ResponseObject<LessonQuestionResponse>>(
      `/lessons/${lessonId}/questions/${questionId}`
    );
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Remove a question from a lesson
export const removeQuestionFromLesson = async (
  lessonId: number,
  questionId: number
): Promise<void> => {
  try {
    await api.delete<ResponseObject<void>>(
      `/lessons/${lessonId}/questions/${questionId}`
    );
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Remove all questions from a lesson
export const removeAllQuestionsFromLesson = async (
  lessonId: number
): Promise<void> => {
  try {
    await api.delete<ResponseObject<void>>(`/lessons/${lessonId}/questions`);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
