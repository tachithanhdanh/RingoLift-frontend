// ValidateTokenResponse Interface
export interface ValidateTokenResponse {
  valid: boolean;
  message: string;
  username: string;
  expirationDate: string; // ISO 8601 string
}
