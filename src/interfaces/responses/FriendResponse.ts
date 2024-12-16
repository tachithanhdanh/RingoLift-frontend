import { BaseResponse } from "./BaseResponse";

export interface FriendResponse extends BaseResponse {
    id: number;
    senderId: number;
    receiverId: number;
    statusType: string;
}
