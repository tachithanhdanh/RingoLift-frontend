import axios from 'axios';
import { MistakeRequest } from '../interfaces/requests/MistakeRequest';
import { MistakeResponse } from '../interfaces/responses/MistakeResponse';
import { ResponseObject } from '../interfaces/responses/ResponseObject';
import { toSnakeCase } from '../utils/caseConverter';

// Configure axios
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // Ensure this matches your backend's base URL
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

// Create a new mistake
export const createMistake = async (request: MistakeRequest): Promise<ResponseObject<MistakeResponse>> => {
    try {
        const response = await apiClient.post('/mistakes', request);
        return response.data;
    } catch (error) {
        console.error('Error creating mistake:', error);
        throw new Error(error.response?.data?.message || 'Failed to create mistake');
    }
};

// Update an existing mistake
export const updateMistake = async (id: number, request: MistakeRequest): Promise<ResponseObject<MistakeResponse>> => {
    try {
        const response = await apiClient.put(`/mistakes/${id}`, request);
        return response.data;
    } catch (error) {
        console.error('Error updating mistake:', error);
        throw new Error(error.response?.data?.message || 'Failed to update mistake');
    }
};

export const getAllMistakes = async (): Promise<ResponseObject<MistakeResponse[]>> => {
    try {
        const response = await apiClient.get('/mistakes'); // Sử dụng apiClient
        return response.data; // Giả sử API trả về cấu trúc ResponseObject
    } catch (error) {
        console.error('Error fetching all mistakes:', error);
        throw new Error(error.response?.data?.message || 'An error occurred while fetching mistakes');
    }
};

// Fetch a mistake by ID
export const getMistakeById = async (userId: number, lessonId: number, questionId: number, id: number): Promise<ResponseObject<MistakeResponse>> => {
    try {
        const response = await apiClient.get(`/mistakes/${userId}/${lessonId}/${questionId}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching mistake:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch mistake');
    }
};

// Delete a mistake
export const deleteMistake = async (userId: number, lessonId: number, questionId: number, id: number): Promise<ResponseObject<void>> => {
    try {
        const response = await apiClient.delete(`/mistakes/${userId}/${lessonId}/${questionId}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting mistake:', error);
        throw new Error(error.response?.data?.message || 'Failed to delete mistake');
    }
};

export default apiClient;
