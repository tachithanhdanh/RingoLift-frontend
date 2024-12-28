import api from "./api"; // Import API configuration
import { MistakeRequest } from "../interfaces/requests/MistakeRequest";
import { MistakeResponse } from "../interfaces/responses/MistakeResponse";
import { ResponseObject } from "../interfaces/responses/ResponseObject";

// Create a new mistake
export const createMistake = async (request: MistakeRequest): Promise<ResponseObject<MistakeResponse>> => {
    try {
        const response = await api.post('/mistakes', request);
        return response.data;
    } catch (error) {
        console.error('Error creating mistake:', error);
        throw new Error(error.response?.data?.message || 'Failed to create mistake');
    }
};

// Update an existing mistake
export const updateMistake = async (id: number, request: MistakeRequest): Promise<ResponseObject<MistakeResponse>> => {
    try {
        const response = await api.put(`/mistakes/${id}`, request);
        return response.data;
    } catch (error) {
        console.error('Error updating mistake:', error);
        throw new Error(error.response?.data?.message || 'Failed to update mistake');
    }
};

// Fetch all mistakes
export const getAllMistakes = async (): Promise<ResponseObject<MistakeResponse[]>> => {
    try {
        const response = await api.get('/mistakes');
        return response.data; // Ensure this returns an array
    } catch (error) {
        console.error('Error fetching all mistakes:', error);
        throw new Error(error.response?.data?.message || 'An error occurred while fetching mistakes');
    }
};

// Fetch a mistake by ID
export const getMistakeById = async (userId: number, lessonId: number, questionId: number, id: number): Promise<ResponseObject<MistakeResponse>> => {
    try {
        const response = await api.get(`/mistakes/${userId}/${lessonId}/${questionId}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching mistake:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch mistake');
    }
};

// Delete a mistake
export const deleteMistake = async (userId: number, lessonId: number, questionId: number, id: number): Promise<ResponseObject<void>> => {
    try {
        const response = await api.delete(`/mistakes/${userId}/${lessonId}/${questionId}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting mistake:', error);
        throw new Error(error.response?.data?.message || 'Failed to delete mistake');
    }
};