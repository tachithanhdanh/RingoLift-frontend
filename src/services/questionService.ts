// src/services/questionService.ts
import axios from 'axios';
import { QuestionResponse } from '../interfaces/responses/QuestionResponse';
import { ResponseObject } from '../interfaces/responses/ResponseObject';
import { QuestionRequest } from '../interfaces/requests/QuestionRequest';
import { QuestionTypeRequest } from '../interfaces/requests/QuestionTypeRequest';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptors for handling requests
apiClient.interceptors.request.use(
    (config) => {
        // Attach token if needed
        const token = "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6Ik5ndXllbkh1bmcxMjA3Iiwic3ViIjoiTmd1eWVuSHVuZzEyMDciLCJleHAiOjE3MzUwNDIxMTR9.XjETxBOG38Q7aDVS9cW0U3RdZT3xwm_cUdZmpVBWyknRjI1AnZ_siWkCazutSryeg13AA0toT487YtauWQlrsw"; // Replace with actual token retrieval logic (e.g., from local storage)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Convert data to snake_case if present
        if (config.data) {
            config.data = toSnakeCase(config.data);
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Function to create a new question
export const createQuestion = async (questionRequest: QuestionRequest): Promise<ResponseObject<QuestionResponse>> => {
    try {
        const response = await apiClient.post('/questions', questionRequest);
        return response.data;
    } catch (error) {
        console.error('Error creating question:', error);
        throw new Error((error as any).response?.data?.message || 'Failed to create question');
    }
};

// Function to get all questions
export const getAllQuestions = async (): Promise<ResponseObject<QuestionResponse[]>> => {
    try {
        const response = await apiClient.get('/questions');
        return response.data;
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw new Error((error as any).response?.data?.message || 'Failed to fetch questions');
    }
};

// Function to get question by ID
export const getQuestionById = async (questionId: number): Promise<ResponseObject<QuestionResponse>> => {
    try {
        const response = await apiClient.get(`/questions/${questionId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching question:', error);
        throw new Error((error as any).response?.data?.message || 'Failed to fetch question');
    }
};

// Function to update question by ID
export const updateQuestion = async (questionId: number, questionRequest: QuestionRequest): Promise<ResponseObject<QuestionResponse>> => {
    try {
        const response = await apiClient.put(`/questions/${questionId}`, questionRequest);
        return response.data;
    } catch (error) {
        console.error('Error updating question:', error);
        throw new Error((error as any).response?.data?.message || 'Failed to update question');
    }
};

// Function to delete question by ID
export const deleteQuestion = async (questionId: number): Promise<ResponseObject<null>> => {
    try {
        const response = await apiClient.delete(`/questions/${questionId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting question:', error);
        throw new Error((error as any).response?.data?.message || 'Failed to delete question');
    }
};

// Function to create a new question type
export const createQuestionType = async (questionTypeRequest: QuestionTypeRequest): Promise<ResponseObject<any>> => {
    try {
        const response = await apiClient.post('/questions/types', questionTypeRequest);
        return response.data;
    } catch (error) {
        console.error('Error creating question type:', error);
        throw new Error((error as any).response?.data?.message || 'Failed to create question type');
    }
};

// Function to get all question types
export const getAllQuestionTypes = async (): Promise<ResponseObject<any[]>> => {
    try {
        const response = await apiClient.get('/questions/types');
        return response.data;
    } catch (error) {
        console.error('Error fetching question types:', error);
        throw new Error((error as any).response?.data?.message || 'Failed to fetch question types');
    }
};

// Function to get question type by ID
export const getQuestionTypeById = async (typeId: number): Promise<ResponseObject<any>> => {
    try {
        const response = await apiClient.get(`/questions/types/${typeId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching question type:', error);
        throw new Error((error as any).response?.data?.message || 'Failed to fetch question type');
    }
};

// Function to update question type by ID
export const updateQuestionType = async (typeId: number, questionTypeRequest: QuestionTypeRequest): Promise<ResponseObject<any>> => {
    try {
        const response = await apiClient.put(`/questions/types/${typeId}`, questionTypeRequest);
        return response.data;
    } catch (error) {
        console.error('Error updating question type:', error);
        throw new Error((error as any).response?.data?.message || 'Failed to update question type');
    }
};

// Function to delete question type by ID
export const deleteQuestionType = async (typeId: number): Promise<ResponseObject<null>> => {
    try {
        const response = await apiClient.delete(`/questions/types/${typeId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting question type:', error);
        throw new Error((error as any).response?.data?.message || 'Failed to delete question type');
    }
};

// Function to get lessons by question ID
export const getLessonsByQuestionId = async (questionId: number): Promise<ResponseObject<any>> => {
    try {
        const response = await apiClient.get(`/questions/${questionId}/lessons`);
        return response.data;
    } catch (error) {
        console.error('Error fetching lessons by question ID:', error);
        throw new Error((error as any).response?.data?.message || 'Failed to fetch lessons');
    }
};

// Function to remove all lessons from a question
export const removeAllLessonsFromQuestion = async (questionId: number): Promise<ResponseObject<null>> => {
    try {
        const response = await apiClient.delete(`/questions/${questionId}/lessons`);
        return response.data;
    } catch (error) {
        console.error('Error removing lessons from question:', error);
        throw new Error((error as any).response?.data?.message || 'Failed to remove lessons');
    }
};