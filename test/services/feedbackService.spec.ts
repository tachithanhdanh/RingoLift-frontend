import { createFeedback, getFeedback, updateFeedback, deleteFeedback, getFeedbacksByUserAndLesson } from "../../src/services/feedbackService"
import { describe, it, expect, beforeAll, vi } from "vitest";

beforeAll(() => {
    global.localStorage = {
        getItem: vi.fn(() => "mockedToken"), // Mock localStorage
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
    } as unknown as Storage;
});

describe("createFeedback", () => {
    it("it should create new feedback", async () => {
        try {
            const feedbackRequest = {
                userId: 17,
                lessonId: 1,
                stars: 5,
                comment: "Great lesson!"
            }
            const response = await createFeedback(feedbackRequest);
            expect(response).toHaveProperty("createdAt");
        } catch (error) {
            expect(error.data).toHaveProperty("status");
        }
    });
});

describe("getFeedback", () => {
    it("it should get feedback by id", async () => {
        try {
            const feedbackId = 1;
            const response = await getFeedback(feedbackId);
            expect(response).toHaveProperty("createdAt");
        } catch (error) {
            expect(error.data).toHaveProperty("status");
        }
    });
});

describe("getFeedbacksByUserAndLesson", () => {
    it("it should a list of feedbacks", async () => {
        try {
            const userId = 17;
            const lessonId = 1;
            const response = await getFeedbacksByUserAndLesson(userId, lessonId);
            // expect(response).toHaveProperty("createdAt");
        } catch (error) {
            expect(error.data).toHaveProperty("status");
        }
    });
});

describe("updateFeedback", () => {
    it("it should update feedback by id", async () => {
        try {
            const feedbackId = 3;
            const feedbackRequest = {
                userId: 17,
                lessonId: 1,
                stars: 4,
                comment: "okay"
            }
            const response = await updateFeedback(feedbackId, feedbackRequest);
            expect(response).toHaveProperty("createdAt");
        } catch (error) {
            expect(error.data).toHaveProperty("status");
        }
    });
});

describe("deleteFeedback", () => {
    it("it should delete feedback by id", async () => {
        try {
            const feedbackId = 3;
            const userId = 1;
            const lessonId = 2;
            const response = await deleteFeedback(feedbackId, userId, lessonId);
            expect(response).toHaveProperty("createdAt");
        } catch (error) {
            expect(error.data).toHaveProperty("status");
        }
    });
});
