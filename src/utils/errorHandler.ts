import { AxiosError } from "axios";

// Hàm xử lý lỗi chung, nhận vào một lỗi
export const handleApiError = (error: Error | unknown): string => {
  if (error instanceof AxiosError) {
    // Xử lý lỗi từ AxiosError
    const status = error.response?.status;
    if (status === 401) {
      return "Unauthorized! Please log in again.";
    }
    if (status === 404) {
      return "Resource not found.";
    }
    // Xử lý các lỗi khác từ Axios
    return (
      error.response?.data?.message ||
      "An error occurred while processing the request."
    );
  }

  if (error instanceof Error) {
    // Xử lý lỗi từ Error
    return error.message;
  }

  // Nếu không phải lỗi Axios, xử lý lỗi chung
  return "An unexpected error occurred.";
};

// Hàm xử lý lỗi tùy thuộc vào status code
export const handleAuthError = (status: number, logout: () => void) => {
  if (status === 401) {
    logout(); // Thực hiện logout qua AuthContext
    window.location.href = "/login"; // Điều hướng về trang login
  } else if (status === 403) {
    window.location.href = "/private/home"; // Điều hướng về private/home
  }
};
