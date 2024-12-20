// src/services/topicService.ts

import api from "./api";
import { TopicResponse } from "../interfaces/responses/TopicResponse";
import { ResponseObject } from "../interfaces/responses/ResponseObject";

export const getTopics = async (): Promise<TopicResponse[]> => {
  try {
    const response = await api.get<ResponseObject<TopicResponse[]>>("/topics");
    console.log("API Response:", response.data); // Thêm dòng này để kiểm tra
    return response.data.data; // Truy cập vào thuộc tính 'data' chứa mảng topics
  } catch (error: any) {
    console.error("Error fetching topics:", error);
    throw new Error(error.response?.data?.message || "Error fetching topics.");
  }
};
