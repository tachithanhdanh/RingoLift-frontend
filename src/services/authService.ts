import api from "./api";
import { UserResponse } from "../interfaces/responses/UserResponse";
import { ResponseObject } from "../interfaces/responses/ResponseObject";
import { handleApiError } from "../utils/errorHandler";
import { UserRegisterRequest } from "../interfaces/requests/UserRegisterRequest";

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
