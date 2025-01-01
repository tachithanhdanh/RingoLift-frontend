import api from "./api";
import { UserRequest } from "../interfaces/requests/UserRequest";
import { UserResponse } from "../interfaces/responses/UserResponse";
import { ResponseObject } from "../interfaces/responses/ResponseObject";
import { UserGenderResponse } from "../interfaces/responses/UserGenderResponse";
import { LessonProgressResponse } from "../interfaces/responses/LessonProgressResponse";
import { LessonProgressRequest } from "../interfaces/requests/LessonProgressRequest";

// Tạo mới người dùng
export const createUser = async (
  userRequest: UserRequest
): Promise<UserResponse> => {
  try {
    const response = await api.post<ResponseObject<UserResponse>>(
      "/users",
      userRequest
    );
    return response.data.data; // Trả về data kiểu UserResponse
  } catch (error) {
    throw error;
  }
};

// Lấy tất cả người dùng
export const getAllUsers = async (): Promise<UserResponse[]> => {
  try {
    const response = await api.get<ResponseObject<UserResponse[]>>("/users");
    return response.data.data; // Trả về data kiểu UserResponse[]
  } catch (error) {
    throw error;
  }
};

// Lấy thông tin người dùng theo ID
export const getUserById = async (id: number): Promise<UserResponse> => {
  try {
    const response = await api.get<ResponseObject<UserResponse>>(
      `/users/${id}`
    );
    return response.data.data; // Trả về data kiểu UserResponse
  } catch (error) {
    throw error;
  }
};

// Cập nhật thông tin người dùng theo ID
export const updateUser = async (
  id: number,
  userRequest: UserRequest
): Promise<UserResponse> => {
  try {
    const response = await api.put<ResponseObject<UserResponse>>(
      `/users/${id}`,
      userRequest
    );
    return response.data.data; // Trả về data kiểu UserResponse
  } catch (error) {
    throw error;
  }
};

// Xóa người dùng theo ID
export const deleteUser = async (id: number): Promise<void> => {
  try {
    await api.delete<ResponseObject<void>>(`/users/${id}`);
  } catch (error) {
    throw error;
  }
};

// Get all genders
export const getAllGenders = async (): Promise<UserGenderResponse[]> => {
  try {
    const response = await api.get<ResponseObject<UserGenderResponse[]>>(
      `/users/genders`
    );
    return response.data.data; // Trả về data kiểu UserGenderResponse[]
  } catch (error) {
    throw error;
  }
};

// Get user gender by id
export const getUserGenderById = async (
  id: number
): Promise<UserGenderResponse> => {
  try {
    const response = await api.get<ResponseObject<UserGenderResponse>>(
      `users/genders/${id}`
    );
    return response.data.data; // Trả về data kiểu UserGenderResponse
  } catch (error) {
    throw error;
  }
};

// Get lesson progress by user id
export const getLessonProgressByUserId = async (
  userId: number
): Promise<LessonProgressResponse[]> => {
  try {
    const response = await api.get<ResponseObject<LessonProgressResponse[]>>(
      `users/${userId}/progress/lesson`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

// Update lesson progress by user id and lesson id
export const updateLessonProgress = async (
  userId: number,
  lessonId: number,
  lessonProgressRequest: LessonProgressRequest
): Promise<LessonProgressResponse> => {
  try {
    const response = await api.put<ResponseObject<LessonProgressResponse>>(
      `users/${userId}/progress/lesson/${lessonId}`,
      lessonProgressRequest
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
}