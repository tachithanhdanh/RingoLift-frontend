export interface UserRequest {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string; // ISO 8601 string
  genderId?: number;
  picture?: string;
  goalId?: number;
  password: string;
  isPublic?: boolean;
  googleId?: string;
  accessToken?: string;
}
