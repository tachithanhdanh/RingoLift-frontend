import { MessageRequest } from "../interfaces/requests/MessageRequest";
import { MessageResponse } from "../interfaces/responses/MessageResponse";
import { ResponseObject } from "../interfaces/responses/ResponseObject";
import api from "./api";

// Tạo tin nhắn mới
export const createMessage = async (
    messageRequest: MessageRequest
): Promise<MessageResponse> => {
    try {
        const response = await api.post<ResponseObject<MessageResponse>>(
            "/messages",
            messageRequest
        )
        return response.data.data;
    } catch (error) {
        throw error;
    }
}