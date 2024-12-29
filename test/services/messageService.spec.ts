import { createMessage } from "../../src/services/messageService"
import { describe, it, expect, beforeAll, vi } from "vitest";

beforeAll(() => {
    global.localStorage = {
        getItem: vi.fn(() => "mockedToken"), // Mock localStorage
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
    } as unknown as Storage;
});

describe("createMessage", () => {
    it("it should create new message", async () => {
        const messageRequest = {
            senderId: 1,
            receiverId: 2,
            messageText: "I love U aa!",
            isRead: false
        };        
        try {
            const response = await createMessage(messageRequest);
            expect(response).toHaveProperty("createdAt");
        }
        catch (error) {
            expect(error.data).toHaveProperty("status");
        }
    });
});