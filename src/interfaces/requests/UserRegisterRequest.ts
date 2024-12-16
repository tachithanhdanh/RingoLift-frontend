// UserRegisterRequest
export interface UserRegisterRequest {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string; // ISO 8601 date string
  genderId?: number;
  password: string;
  isPublic?: boolean;
  role: string;
}
