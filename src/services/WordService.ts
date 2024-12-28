// src/services/wordService.ts

import api from "./api";
import { WordResponse } from "../interfaces/responses/WordResponse";
import { ResponseObject } from "../interfaces/responses/ResponseObject";


export const getWordsByTopic = async (topicId: number): Promise<WordResponse[]> => {
  try {
    const response = await api.get<ResponseObject<WordResponse[]>>(`/words/topic/${topicId}`);
    console.log("API Response:", response.data);
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      throw new Error("Invalid data format received from API.");
    }
  } catch (error: any) {
    console.error("Error fetching words by topic:", error);
    throw new Error(error.response?.data?.message || "Error fetching words by topic.");
  }
};
