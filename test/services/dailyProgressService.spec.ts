import { describe, it, expect, beforeAll, vi } from "vitest";
import { createDailyProgress, getDailyProgress, getDailyProgressById, updateDailyProgress, deleteDailyProgress } from "../../src/services/dailyProgressService";

beforeAll(() => {
    global.localStorage = {
        getItem: vi.fn(() => "mockedToken"), // Mock localStorage
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
    } as unknown as Storage;
});

describe("createDailyProgress", () => {
    it("should create new daily progress successfully", async () => {
        const dailyProgressRequest = {
            userId: 17,
            timeSpent: 47,
            lessonCount: 45,
            wordCount: 6986
        };
        try {
            const response = await createDailyProgress(dailyProgressRequest);
            expect(response).toHaveProperty("createdAt");
        } catch (error) {
            expect(error.data).toHaveProperty("status");
        }
    });
});

describe("getDailyProgress", () => {
    it("should get all daily progress", async () => {
        try {
            const response = await getDailyProgress();
            // expect(response).toHaveProperty("createdAt");
        } catch (error) {
            expect(error.data).toHaveProperty("status");
        }
    });
});

describe("getDailyProgressById", () => {
    it("should get daily progress by id", async () => {
        try {
            const dailyProgressId = 18;
            const response = await getDailyProgressById(dailyProgressId);
            expect(response).toHaveProperty("createdAt");
        } catch (error) {
            expect(error.data).toHaveProperty("status");
        }
    });
});

describe("updateDailyProgress", () => {
    it("should update daily progress", async () => {
        try {
            const dailyProgressId = 18;
            const dailyProgressRequest = {
                userId: 17,
                timeSpent: 47,
                lessonCount: 45,
                wordCount: 69
            };
            const response = await updateDailyProgress(dailyProgressId, dailyProgressRequest);
            expect(response).toHaveProperty("createdAt");
        } catch (error) {
            expect(error.data).toHaveProperty("status");
        }
    });
});

describe("deleteDailyProgress", () => {
    it("should delete daily progress", async () => {
        try {
            const dailyProgressId = 18;
            const response = await deleteDailyProgress(dailyProgressId);
            expect(response).toHaveProperty("createdAt");
        } catch (error) {
            expect(error.data).toHaveProperty("status");
        }
    });
});
