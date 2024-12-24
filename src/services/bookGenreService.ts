import axios from 'axios';
import { BookGenreResponse } from '../interfaces/responses/BookGenreResponse';
import { ResponseObject } from '../interfaces/responses/ResponseObject';

// Cấu hình axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Use the same base URL as the books API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors xử lý request
apiClient.interceptors.request.use(
  (config) => {
    // Gắn token vào header
    const token = "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6Ik5ndXllbkh1bmcxMjA3Iiwic3ViIjoiTmd1eWVuSHVuZzEyMDciLCJleHAiOjE3MzUwNDIxMTR9.XjETxBOG38Q7aDVS9cW0U3RdZT3xwm_cUdZmpVBWyknRjI1AnZ_siWkCazutSryeg13AA0toT487YtauWQlrsw";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Fetch all book genres
export const getAllGenres = async (): Promise<ResponseObject<BookGenreResponse[]>> => {
  const response = await apiClient.get('/book-genres');
  return response.data; // Return the response data
};

export default apiClient;