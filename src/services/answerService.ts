// src/services/answerService.ts

import axios from 'axios';
import { AnswerResponse } from '../interfaces/responses/AnswerResponse';
import { ResponseObject } from '../interfaces/responses/ResponseObject';
import { toSnakeCase } from '../utils/caseConverter'; // Giả sử bạn có hàm này để chuyển đổi case

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptors xử lý request
apiClient.interceptors.request.use(
    (config) => {
        // Gắn token nếu cần
        const token = "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6Ik5ndXllbkh1bmcxMjA3Iiwic3ViIjoiTmd1eWVuSHVuZzEyMDciLCJleHAiOjE3MzUwNDIxMTR9.XjETxBOG38Q7aDVS9cW0U3RdZT3xwm_cUdZmpVBWyknRjI1AnZ_siWkCazutSryeg13AA0toT487YtauWQlrsw";
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Xử lý data trước khi request (nếu cần)
        if (config.data) {
            config.data = toSnakeCase(config.data);
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Hàm lấy đáp án đúng theo ID câu hỏi
export const getCorrectAnswersByQuestionId = async (questionId: number): Promise<AnswerResponse[]> => {
    try {
        const response = await apiClient.get<ResponseObject>(`/answers/${questionId}/True`);
        return response.data.data || [];
    } catch (error) {
        console.error('Error fetching correct answers:', error);
        return []; // Trả về mảng trống nếu có lỗi
    }
};

export default apiClient;