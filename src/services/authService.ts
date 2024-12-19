import api from "./api";
import { UserResponse } from "../interfaces/responses/UserResponse";
import { ResponseObject } from "../interfaces/responses/ResponseObject";
import { handleApiError } from "../utils/errorHandler";
import { UserRegisterRequest } from "../interfaces/requests/UserRegisterRequest";
import { LoginRequest } from "../interfaces/requests/LoginRequest";
import { LogoutRequest } from "../interfaces/requests/LogoutRequest";
import { LogoutResponse } from "../interfaces/responses/LogoutResponse";

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
    throw new Error(handleApiError(error));
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
    throw new Error(handleApiError(error));
  }
};

// Logout a user
// Logout a user
export const logoutUser = async (
  logoutRequest: LogoutRequest
): Promise<LogoutResponse> => {
  // try {
  const response = await api.post<ResponseObject<LogoutResponse>>(
    "/auth/logout",
    logoutRequest
  );
  return response.data.data; // Return logout response message
  // } catch (error) {
  // throw new Error(handleApiError(error));
  // }
};
