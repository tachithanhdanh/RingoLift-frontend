import { SimpleResponse } from "./SimpleResponse";

// UserGenderResponse interface
export interface UserGenderResponse extends SimpleResponse {
  id: number;
  genderType: string;
}
