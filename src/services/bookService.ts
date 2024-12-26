// bookService.ts
import api from "./api";
import { BookRequest } from "../interfaces/requests/BookRequest";
import { BookResponse } from "../interfaces/responses/BookResponse";
import { ResponseObject } from "../interfaces/responses/ResponseObject";
import { handleApiError } from "../utils/errorHandler";

// Create a new book
export const createBook = async (
  bookRequest: BookRequest
): Promise<BookResponse> => {
  try {
    const response = await api.post<ResponseObject<BookResponse>>(
      "/books",
      bookRequest
    );
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const getAllBooks = async (): Promise<BookResponse[]> => {
  try {
    const response = await api.get<ResponseObject<BookResponse[]>>("/books");
    console.log('API Response:', response);
    if (response?.data?.data) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(handleApiError(error));
  }
};

// Get a book by ID
export const getBookById = async (
  id: number
): Promise<BookResponse> => {
  try {
    const response = await api.get<ResponseObject<BookResponse>>(
      `/books/${id}`
    );
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Update a book by ID
export const updateBook = async (
  id: number,
  bookRequest: BookRequest
): Promise<BookResponse> => {
  try {
    const response = await api.put<ResponseObject<BookResponse>>(
      `/books/${id}`,
      bookRequest
    );
    return response.data.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Delete a book by ID
export const deleteBook = async (id: number): Promise<void> => {
  try {
    await api.delete<ResponseObject<void>>(`/books/${id}`);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};