import api from "./api";
import { ChapterRequest } from "../interfaces/requests/ChapterRequest";
import { ChapterResponse } from "../interfaces/responses/ChapterResponse";
import { ResponseObject } from "../interfaces/responses/ResponseObject";
import { handleApiError } from "../utils/errorHandler";

// Create a new chapter
export const createChapter = async (
  chapterRequest: ChapterRequest
): Promise<ChapterResponse> => {
  try {
    const response = await api.post<ResponseObject<ChapterResponse>>(
      "/chapters",
      chapterRequest
    );
    return response.data.data; // Returns the ChapterResponse object
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Get all chapters
export const getAllChapters = async (): Promise<ChapterResponse[]> => {
  try {
    const response = await api.get<ResponseObject<ChapterResponse[]>>(
      "/chapters"
    );
    return response.data.data; // Returns a list of ChapterResponse objects
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Get a chapter by ID
export const getChapterById = async (id: number): Promise<ChapterResponse> => {
  try {
    const response = await api.get<ResponseObject<ChapterResponse>>(
      `/chapters/${id}`
    );
    return response.data.data; // Returns the ChapterResponse object
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Update a chapter by ID
export const updateChapter = async (
  id: number,
  chapterRequest: ChapterRequest
): Promise<ChapterResponse> => {
  try {
    const response = await api.put<ResponseObject<ChapterResponse>>(
      `/chapters/${id}`,
      chapterRequest
    );
    return response.data.data; // Returns the updated ChapterResponse object
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Delete a chapter by ID
export const deleteChapter = async (id: number): Promise<void> => {
  try {
    await api.delete<ResponseObject<void>>(`/chapters/${id}`);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
