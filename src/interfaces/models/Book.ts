export interface Book {
    id: number; // Unique identifier for the book
    title: string; // Title of the book
    author: string; // Author of the book
    genreId: number; // Genre ID
    publishedDate: string; // ISO 8601 format
    isbn: string; // ISBN of the book
    numOfPages?: number; // Number of pages
    publisher: string; // Publisher of the book
    description?: string; // Description of the book
    coverImage?: string; // Cover image URL
    contentUrl?: string; // Content URL
}