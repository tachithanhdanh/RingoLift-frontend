import api from "./api"; // Reuse the shared API configuration
import { BookGenreResponse } from "../interfaces/responses/BookGenreResponse";
import { ResponseObject } from "../interfaces/responses/ResponseObject";
import { BookGenreRequest } from "../interfaces/requests/BookGenreRequest"; // Import the request interface
import { handleApiError } from "../utils/errorHandler";

// Create a new book genre
export const createBookGenre = async (bookGenreRequest: BookGenreRequest): Promise<BookGenreResponse> => {
  try {
    const response = await api.post<ResponseObject<BookGenreResponse>>("/book-genres", bookGenreRequest);
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Fetch all book genres
export const getAllGenres = async (): Promise<BookGenreResponse[]> => {
  try {
    const response = await api.get<ResponseObject<BookGenreResponse[]>>("/book-genres");
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Fetch a book genre by id
export const getBookGenreById = async (id: number): Promise<BookGenreResponse> => {
  try {
    const response = await api.get<ResponseObject<BookGenreResponse>>(`/book-genres/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Update a book genre by id
export const updateBookGenre = async (id: number, bookGenreRequest: BookGenreRequest): Promise<BookGenreResponse> => {
  try {
    const response = await api.put<ResponseObject<BookGenreResponse>>(`/book-genres/${id}`, bookGenreRequest);
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Delete a book genre by id
export const deleteBookGenre = async (id: number): Promise<void> => {
  try {
    await api.delete<ResponseObject<void>>(`/book-genres/${id}`);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};