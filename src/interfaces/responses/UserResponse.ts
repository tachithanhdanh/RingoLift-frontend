import { BaseResponse } from "./BaseResponse";
import { GoalResponse } from "./GoalResponse";

export interface UserResponse extends BaseResponse {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string; // ISO 8601 string
  gender?: string;
  picture?: string;
  goal?: GoalResponse;
  // password?: string;
  isPublic?: boolean;
  googleId?: string;
  accessToken?: string;
  role: string;
}
