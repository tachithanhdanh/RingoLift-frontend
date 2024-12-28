import axios, { AxiosResponse } from "axios";
import { toSnakeCase, toCamelCase } from "../utils/caseConverter";

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
    const token = localStorage.getItem("token");
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

// Interceptors xử lý response
// This interceptor has been moved to AxiosInterceptorProvider.tsx
api.interceptors.response.use(
  (response): AxiosResponse => {
    if (response.data) {
      // Chuyển data từ snake_case sang camelCase
      response.data = toCamelCase(response.data);
    }

    return response;
  },
  (error) => {
    return Promise.reject(error.response || error.message);
  }
);

export default api;
