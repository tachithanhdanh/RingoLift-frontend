import api from "./api";
import { UserRequest } from "../interfaces/requests/UserRequest";
import { UserResponse } from "../interfaces/responses/UserResponse";
import { ResponseObject } from "../interfaces/responses/ResponseObject";
import { handleApiError } from "../utils/errorHandler";

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
    throw new Error(handleApiError(error));
  }
};

// Lấy tất cả người dùng
export const getAllUsers = async (): Promise<UserResponse[]> => {
  try {
    const response = await api.get<ResponseObject<UserResponse[]>>("/users");
    return response.data.data; // Trả về data kiểu UserResponse[]
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Lấy thông tin người dùng theo ID
export const getUserById = async (id: number): Promise<UserResponse> => {
  try {
    const response = await api.get<ResponseObject<UserResponse>>(
      `/users/${id}`
    );
    console.log(response);
    return response.data.data; // Trả về data kiểu UserResponse
  } catch (error) {
    throw new Error(handleApiError(error));
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
    throw new Error(handleApiError(error));
  }
};

// Xóa người dùng theo ID
export const deleteUser = async (id: number): Promise<void> => {
  try {
    await api.delete<ResponseObject<void>>(`/users/${id}`);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
