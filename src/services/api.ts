import axios from "axios";
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
api.interceptors.response.use(
  (response) => {
    if (response.data) {
      // Chuyển data từ snake_case sang camelCase
      response.data = toCamelCase(response.data);
    }
    return response.data; // Trả về data trực tiếp
  },
  (error) => {
    // Xử lý lỗi
    const status = error.response?.status;
    if (status === 401) {
      // Xử lý lỗi xác thực, ví dụ logout
      console.error("Unauthorized! Redirecting to login.");
    }
    return Promise.reject(error.response || error.message);
  }
);

export default api;
