import React, { useEffect, useState } from "react";
import { Card, Button, Alert, Spinner, ListGroup } from "react-bootstrap";
import { getAnswersByQuestionId } from "../../services/answerService";
import {
  updateUserAnswerByUserIdAndQuestionId,
  checkUserAnswer,
} from "../../services/userAnswerService";
import { QuestionResponse } from "../../interfaces/responses/QuestionResponse";
import { AnswerResponse } from "../../interfaces/responses/AnswerResponse";
import { UserAnswerRequest } from "../../interfaces/requests/UserAnswerRequest";
import { useAuth } from "../../hooks/useAuth";
import { User } from "../../interfaces/models/User";
import { getUserById } from "../../services/userService";
import { createMistake } from "../../services/mistakeService";

interface QuestionCardProps {
  question: QuestionResponse;
  onNavigation?: (direction: "next" | "prev") => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onNavigation,
}) => {
  const [answers, setAnswers] = useState<AnswerResponse[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [submissionResult, setSubmissionResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth(); // Get the authenticated user from context
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    const fetchAnswers = async () => {
      setLoading(true);
      try {
        const fetchedAnswers = await getAnswersByQuestionId(question.id);
        setAnswers(fetchedAnswers);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [question]);

  useEffect(() => {
    async function fetchProfile() {
      if (user) {
        try {
          const fetchedProfile = await getUserById(user.id); // Fetch user profile data
          setProfile(fetchedProfile);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }
    }

    fetchProfile();
  }, [user]);

  useEffect(() => {
    setSubmissionResult(null);
  }, [question]);

  const handleAnswerSelect = (answerId: number) => {
    setSelectedAnswer(answerId);
  };

  const handleSubmit = async () => {
    if (selectedAnswer === null) {
      setSubmissionResult("Please select an answer before submitting.");
      return;
    }

    if (profile == null) {
      return (
        <Alert variant="danger" className="text-center">
          Profile is null
        </Alert>
      );
    }

    try {
      const userAnswerRequest: UserAnswerRequest = {
        // userId: profile.id, // Replace with actual user ID
        // questionId: question.id,
        answerText: answers.find((a) => a.id === selectedAnswer)?.content || "",
      };
      const userId = profile.id;
      const questionId = question.id;
      const createdUserAnswer = await updateUserAnswerByUserIdAndQuestionId(
        userId,
        questionId,
        userAnswerRequest
      );
      const isCorrect = await checkUserAnswer(createdUserAnswer.id);
      setSubmissionResult(isCorrect ? "Correct answer!" : "Incorrect answer.");
    } catch (err) {
      setSubmissionResult(
        err instanceof Error ? err.message : "Error processing your answer."
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center my-3">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center">
        Error: {error}
      </Alert>
    );
  }

  console.log("submissionResult: ", submissionResult);

  return (
    <Card className="text-center my-4">
      <Card.Header>
        <h2>Question {question.id}: Multiple choice</h2>
      </Card.Header>
      <Card.Body>
        <Card.Text
          style={{
            // Màu chữ
            fontSize: "24px", // Cỡ chữ
            fontWeight: "bold", // Kiểu chữ đậm
            fontStyle: "", // Kiểu chữ nghiêng (nếu cần)
          }}
        >
          {question.content}
        </Card.Text>
        <ListGroup
          className="my-3"
          style={{ maxWidth: "600px", margin: "auto" }}
        >
          {answers.map((answer) => (
            <ListGroup.Item
              key={answer.id}
              active={selectedAnswer === answer.id}
              onClick={() => handleAnswerSelect(answer.id)}
              action
              className="cursor-pointer"
              style={{
                backgroundColor:
                  selectedAnswer === answer.id ? "#ffd3b8" : "#f9f9f9", // Màu nền
                color: selectedAnswer === answer.id ? "#ff782d" : "#333", // Màu chữ
                padding: "10px 15px", // Padding
                borderRadius: "20px", // Bo góc
                margin: "5px 0", // Khoảng cách giữa các mục
                cursor: "pointer", // Con trỏ chuột
                transition: "background-color 0.3s ease, color 0.3s ease", // Hiệu ứng
                fontWeight: selectedAnswer === answer.id ? "bold" : "normal", // Đậm chữ khi chọn
              }}
              onMouseOver={
                (e) =>
                  (e.currentTarget.style.backgroundColor =
                    selectedAnswer === answer.id
                      ? "#0056b3" // Màu nền khi rê chuột và mục đã chọn
                      : "#FFECEC") // Màu nền khi rê chuột
              }
              onMouseOut={
                (e) =>
                  (e.currentTarget.style.backgroundColor =
                    selectedAnswer === answer.id
                      ? "#ffd3b8" // Trả lại màu nền khi đã chọn
                      : "#f9f9f9") // Trả lại màu nền mặc định
              }
              onMouseDown={
                (e) =>
                  (e.currentTarget.style.backgroundColor =
                    selectedAnswer === answer.id
                      ? "#004085" // Màu khi nhấn vào mục đã chọn
                      : "#d6d6d6") // Màu khi nhấn vào mục chưa chọn
              }
              onMouseUp={(e) =>
                (e.currentTarget.style.backgroundColor =
                  selectedAnswer === answer.id
                    ? "#007bff" // Trả lại màu khi thả chuột
                    : "#f9f9f9")
              }
            >
              {answer.content}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="card-body text-end">
          <Button
            style={{
              backgroundColor: "#FF782D", // màu nền
              color: "white", // màu chữ
              borderRadius: "15px", // bo góc
              padding: "2px 20px", // khoảng cách bên trong
              fontSize: "20px", // kích thước chữ
              fontWeight: "bold", // chữ đậm
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
        {submissionResult && (
          <Alert
            variant={
              submissionResult === "Correct answer!" ? "success" : "danger"
            }
            className="mt-3"
          >
            {submissionResult}
          </Alert>
        )}
      </Card.Body>
      {onNavigation && (
        <Card.Footer className="d-flex justify-content-between">
          <Button
            variant="secondary"
            className="me-2"
            onClick={() => onNavigation("prev")}
          >
            Previous
          </Button>
          <Button variant="secondary" onClick={() => onNavigation("next")}>
            Next
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
};

export default QuestionCard;
