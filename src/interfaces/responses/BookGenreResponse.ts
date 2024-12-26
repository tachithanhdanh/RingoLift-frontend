import { BaseResponse } from "./BaseResponse";

export interface BookGenreResponse extends BaseResponse {
  genres: BookGenre[]; // Array of book genres
}