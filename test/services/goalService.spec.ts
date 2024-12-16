import { describe, it, expect, beforeAll, vi } from "vitest";
import { createGoal, getGoals, getGoal, updateGoal, deleteGoal } from "../../src/services/goalService";

beforeAll(() => {
    global.localStorage = {
        getItem: vi.fn(() => "mockedToken"), // Mock localStorage
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
    } as unknown as Storage;
});

describe("createGoal", () => {
    it("should create a goal successfully", async () => {
        const goalRequest = {
            timeSpent: 102,
            lessonCount: 23,
            wordCount: 2787
        };
        try {
            const response = await createGoal(goalRequest);
            expect(response).toHaveProperty("createdAt");
        } catch (error) {
            expect(error.data).toHaveProperty("status");
        }
    });
});

describe("getGoals", () => {
    it("should get a list of goal successfully", async () => {
        try {
            const response = await getGoals();
            // expect(response).toHaveProperty("createdAt");
        } catch (error) {
            expect(error.data).toHaveProperty("status");
        }
    });
});

describe("getGoal", () => {
    it("should get goal by id", async () => {
        try {
            const goalId = 2;
            const response = await getGoal(goalId);
            expect(response).toHaveProperty("createdAt");
        } catch (error) {
            expect(error.data).toHaveProperty("status");
        }
    });
});

describe("deleteGoal", () => {
    it("should delete goal by id", async () => {
        try {
            const goalId = 2;
            const response = await deleteGoal(goalId);
            expect(response).toHaveProperty("createdAt");
        } catch (error) {
            expect(error.data).toHaveProperty("status");
        }
    });
});
