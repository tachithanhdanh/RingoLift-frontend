export interface MessageRequest {
    senderId: number;
    receiverId: number;
    messageText: string;
    isRead: boolean;
}