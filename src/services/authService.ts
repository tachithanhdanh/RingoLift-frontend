import api from "./api";
import { UserResponse } from "../interfaces/responses/UserResponse";
import { ResponseObject } from "../interfaces/responses/ResponseObject";
import { UserRegisterRequest } from "../interfaces/requests/UserRegisterRequest";
import { LoginRequest } from "../interfaces/requests/LoginRequest";

// Register a new user
export const registerUser = async (
  userRegisterRequest: UserRegisterRequest
): Promise<UserResponse> => {
  try {
    const response = await api.post<ResponseObject<UserResponse>>(
      "/auth/register",
      userRegisterRequest
    );
    return response.data.data; // Return data of type UserResponse
  } catch (error) {
    throw error;
  }
};

// Login a user
export const loginUser = async (
  loginRequest: LoginRequest
): Promise<UserResponse> => {
  try {
    const response = await api.post<ResponseObject<UserResponse>>(
      "/auth/login",
      loginRequest
    );
    return response.data.data; // Return data of type UserResponse
  } catch (error) {
    throw error;
  }
};
