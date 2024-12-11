import { HttpStatus } from "../../types/HttpStatus";
import { BaseResponse } from "./BaseResponse";

export interface ResponseObject<T extends BaseResponse> {
  message: string;
  status: HttpStatus;
  data: T;
}
