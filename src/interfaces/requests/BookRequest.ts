export interface BookRequest {
  title: string;
  author?: string; // Optional
  genreId: number; // Foreign key to book_genre
  publishedDate?: string; // Format: YYYY-MM-DD
  isbn?: string; // Optional
  numOfPages?: number; // Optional
  publisher?: string; // Optional
  description?: string; // Optional
  coverImage?: string; // Optional
  contentUrl?: string; // Optional
}