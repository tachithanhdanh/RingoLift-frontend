import { FriendRequest } from "../interfaces/requests/FriendRequest";
import { FriendResponse } from "../interfaces/responses/FriendResponse";
import { ResponseObject } from "../interfaces/responses/ResponseObject";
import api from "./api";

// Gửi yêu cầu kết bạn
export const sendFriendRequest = async (
    friendRequest: FriendRequest
): Promise<FriendResponse> => {
    try {
        const response = await api.post<ResponseObject<FriendResponse>>(
            "/friends/request",
            friendRequest
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

// Cập nhật trạng thái kết bạn
export const updateFriendStatus = async (
    friendId: number,
    statusType: string
): Promise<FriendResponse> => {
    try {
        const response = await api.put<ResponseObject<FriendResponse>>(
            `/friends/status/${friendId}`,
            null,
            { params: { statusType } }
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

// Lấy danh sách bạn bè của người dùng
export const getFriendsByUserId = async (
    userId: number
): Promise<FriendResponse> => {
    try {
        const response = await api.get<ResponseObject<FriendResponse>>(
            `/friends/user/${userId}`
        );
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

// Xoá bạn bè
export const deleteFriend = async (
    friendId: number
): Promise<FriendResponse> => {
    try {
        const response = await api.delete<ResponseObject<FriendResponse>>(
            `/friends/${friendId}`
        )
        return response.data.data;
    } catch (error) {
        throw error;
    }
};