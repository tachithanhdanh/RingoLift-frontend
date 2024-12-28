import { BaseResponse } from "./BaseResponse";

export interface WordStatusResponse extends BaseResponse {
  id: number;
  statusType: string;
}
