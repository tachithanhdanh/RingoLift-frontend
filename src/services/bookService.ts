import axios from "axios";
import { toSnakeCase } from "../utils/caseConverter";
import { BookRequest } from '../interfaces/requests/BookRequest';
import { BookResponse } from '../interfaces/responses/BookResponse';
import { ResponseObject } from '../interfaces/responses/ResponseObject';

// Cấu hình axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // URL của backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors xử lý request
api.interceptors.request.use(
  (config) => {
    // Gắn token nếu cần
    const token = "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6Ik5ndXllbkh1bmcxMjA3Iiwic3ViIjoiTmd1eWVuSHVuZzEyMDciLCJleHAiOjE3MzUwNDIxMTR9.XjETxBOG38Q7aDVS9cW0U3RdZT3xwm_cUdZmpVBWyknRjI1AnZ_siWkCazutSryeg13AA0toT487YtauWQlrsw";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Xử lý data trước khi request
    // Chuyển data từ camelCase sang snake_case
    if (config.data) {
      config.data = toSnakeCase(config.data);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Fetch all books
export const getAllBooks = async (): Promise<ResponseObject<BookResponse[]>> => {
  const response = await api.get('/books');
  return response.data; // Đảm bảo phản hồi có trường publishedDate
};

// Fetch a book by ID
export const getBookById = async (id: number): Promise<ResponseObject<BookResponse>> => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

// Create a new book
export const createBook = async (bookRequest: BookRequest): Promise<ResponseObject<BookResponse>> => {
  const response = await api.post('/books', bookRequest);
  return response.data;
};

// Update a book
export const updateBook = async (id: number, bookRequest: BookRequest): Promise<ResponseObject<BookResponse>> => {
  const response = await api.put(`/books/${id}`, bookRequest);
  return response.data;
};

// Delete a book
export const deleteBook = async (id: number): Promise<ResponseObject<void>> => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};

export default api;