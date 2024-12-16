import { BaseResponse } from "./BaseResponse";

export interface MessageResponse extends BaseResponse {
    id: number;
    senderId: number;
    receiverId: number;
    messageText: string;
    isRead: boolean;
}