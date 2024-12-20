// src/services/WordServiceImpl.ts

import axios from 'axios';
import { WordRequest } from "../interfaces/requests/WordRequest";
import { WordResponse } from "../interfaces/responses/WordResponse";
import { WordService } from "./WordService";

const API_URL = 'http://localhost:8088/api/v1/words'; // Thay đổi URL này nếu backend của bạn chạy ở địa chỉ khác

export class WordServiceImpl implements WordService {
    async createWord(wordRequest: WordRequest): Promise<WordResponse> {
        const response = await axios.post<WordResponse>(API_URL, wordRequest);
        return response.data;
    }

    async getWordById(wordId: number): Promise<WordResponse> {
        const response = await axios.get<WordResponse>(`${API_URL}/${wordId}`);
        return response.data;
    }

    async getAllWords(): Promise<WordResponse[]> {
        const response = await axios.get<WordResponse[]>(API_URL);
        return response.data;
    }

    async updateWord(wordId: number, wordRequest: WordRequest): Promise<WordResponse> {
        const response = await axios.put<WordResponse>(`${API_URL}/${wordId}`, wordRequest);
        return response.data;
    }

    async deleteWord(wordId: number): Promise<void> {
        await axios.delete(`${API_URL}/${wordId}`);
    }

    async getWordsByTopic(topicId: number): Promise<WordResponse[]> {
        const response = await axios.get<WordResponse[]>(`${API_URL}?topicId=${topicId}`);
        return response.data;
    }
}
