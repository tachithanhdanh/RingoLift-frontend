import api from "./api"; // Reuse the shared API configuration
import { BookGenreResponse } from "../interfaces/responses/BookGenreResponse";
import { ResponseObject } from "../interfaces/responses/ResponseObject";
import { handleApiError } from "../utils/errorHandler";

// Fetch all book genres
export const getAllGenres = async (): Promise<BookGenreResponse[]> => {
  try {
    const response = await api.get<ResponseObject<BookGenreResponse[]>>(
      "/book-genres"
    );
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
