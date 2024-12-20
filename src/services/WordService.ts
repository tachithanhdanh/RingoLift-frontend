// src/services/WordService.ts

import { WordRequest } from "../interfaces/requests/WordRequest";
import { WordResponse } from "../interfaces/responses/WordResponse";

export interface WordService {
    createWord(wordRequest: WordRequest): Promise<WordResponse>;
    getWordById(wordId: number): Promise<WordResponse>;
    getAllWords(): Promise<WordResponse[]>;
    updateWord(wordId: number, wordRequest: WordRequest): Promise<WordResponse>;
    deleteWord(wordId: number): Promise<void>;
    getWordsByTopic(topicId: number): Promise<WordResponse[]>;
}
