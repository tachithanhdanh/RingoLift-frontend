// lessonService.ts
import api from "./api";
import { LessonRequest } from "../interfaces/requests/LessonRequest";
import { LessonResponse } from "../interfaces/responses/LessonResponse";
import { ResponseObject } from "../interfaces/responses/ResponseObject";
import { handleApiError } from "../utils/errorHandler";

// Get all lessons by chapter ID
export const getLessonsByChapterId = async (
  chapterId: number
): Promise<LessonResponse[]> => {
  try {
    const response = await api.get<ResponseObject<LessonResponse[]>>(
      `/lessons/chapter/${chapterId}`
    );
    return response.data.data; // Returns a list of LessonResponse objects
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
