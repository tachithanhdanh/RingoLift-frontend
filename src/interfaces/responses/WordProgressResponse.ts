import { BaseResponse } from "./BaseResponse";
import { UserResponse } from "./UserResponse";
import { WordResponse } from "./WordResponse";
import { WordStatusResponse } from "./WordStatusResponse";

export interface WordProgressResponse extends BaseResponse {
  id: number;
  user: UserResponse;
  word: WordResponse;
  status: WordStatusResponse;
  note?: string;
}
