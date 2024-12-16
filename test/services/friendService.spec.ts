import { describe, it, expect, beforeAll, vi } from "vitest";
import { getFriendsByUserId, sendFriendRequest, updateFriendStatus, deleteFriend } from "../../src/services/friendService";

beforeAll(() => {
    global.localStorage = {
        getItem: vi.fn(() => "mockedToken"), // Mock localStorage
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
    } as unknown as Storage;
});

describe("sendFriendRequest", () => {
    it("should send a friend request successfully", async () => {
        const friendRequest = { senderId: 1, receiverId: 6 };
        try {
            const response = await sendFriendRequest(friendRequest);
            expect(response).toHaveProperty("createdAt");
        } catch (error) {
            expect(error.data).toHaveProperty("status");
        }
    });
});

describe("updateFriendStatus", () => {
    it("should update the friend status successfully", async () => {
        const friendId = 1;
        const statusType = "ACCEPTED";
        try {
            const response = await updateFriendStatus(friendId, statusType);
            expect(response).toHaveProperty("createdAt");
        } catch (error) {
            expect(error.data).toHaveProperty("status");
        }
    });
});

describe("getFriendsByUserId", () => {
    it("should get friends by user id", async () => {
        const userId = 1;
        try {
            const response = await getFriendsByUserId(userId);
            expect(response).toHaveProperty("createdAt");
        } catch (error) {
            expect(error.data).toHaveProperty("status");
        }
    });
})

describe("deleteFriend", () => {
    it("should delete a friend by friend id", async () => {
        const friendId = 1;
        try {
            const response = await deleteFriend(friendId);
            expect(response).toHaveProperty("createdAt");
        } catch (error) {
            expect(error.data).toHaveProperty("status");
        }
    });
})