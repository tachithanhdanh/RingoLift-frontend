import { HttpStatus } from "../../types/HttpStatus";
import { BaseResponse } from "./BaseResponse";
import { UserGenderResponse } from "./UserGenderResponse";

export interface ResponseObject<
  T extends
    | BaseResponse
    | BaseResponse[]
    | void
    | UserGenderResponse
    | UserGenderResponse[]
> {
  message: string;
  status: HttpStatus;
  data: T;
}
