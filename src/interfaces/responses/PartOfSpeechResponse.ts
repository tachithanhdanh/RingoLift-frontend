import { BaseResponse } from "./BaseResponse";

export interface PartOfSpeechResponse extends BaseResponse {
  id: number;
  posType: string;
}
