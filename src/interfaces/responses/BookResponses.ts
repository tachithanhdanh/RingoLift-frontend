import { BaseResponse } from "./BaseResponse";

export interface BookResponse extends BaseResponse {
  id: number;
  title: string;
  author?: string;
  genreId: number;
  publishedDate?: string;
  isbn?: string;
  numOfPages?: number;
  publisher?: string;
  description?: string;
  coverImage?: string;
  contentUrl?: string;
}

export interface BookListResponse {
  books: BookResponse[];
}