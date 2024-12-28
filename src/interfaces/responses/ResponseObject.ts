import { HttpStatus } from "../../types/HttpStatus";
import { BaseResponse } from "./BaseResponse";
import { SimpleResponse } from "./SimpleResponse";

export interface ResponseObject<
  T extends
    | BaseResponse
    | BaseResponse[]
    | void
    | SimpleResponse
    | SimpleResponse[]
    | boolean
> {
  message: string;
  status: HttpStatus;
  data: T;
}
