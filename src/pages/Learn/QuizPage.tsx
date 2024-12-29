import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Thêm useNavigate
import { getQuestionsByLessonId } from "../../services/lessonService";
import { getQuestionById } from "../../services/questionService";
import { LessonQuestionResponse } from "../../interfaces/responses/LessonQuestionResponse";
import { QuestionResponse } from "../../interfaces/responses/QuestionResponse";
import QuestionCard from "./QuestionCard";

const QuizPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate(); // Sử dụng useNavigate
  const [questions, setQuestions] = useState<QuestionResponse[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lessonId) return;

    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const id = parseInt(lessonId, 10);
        const lessonQuestions: LessonQuestionResponse[] = 
          await getQuestionsByLessonId(id);

        // console.log(lessonQuestions);

        // Fetch each question by its ID
        const fetchedQuestions = await Promise.all(
          lessonQuestions
            .filter((lq) => lq.questionId !== undefined && lq.questionId !== null)
            .map((lessonQuestion) => getQuestionById(lessonQuestion.questionId))
        );

        // const result = await getQuestionById(1);
        // console.log(result);

        setQuestions(fetchedQuestions);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [lessonId]);

  const handleNavigation = (direction: "next" | "prev") => {
    if (direction === "next" && currentQuestionIndex === questions.length - 1) {
      // Điều hướng tới QuizResult nếu là câu hỏi cuối cùng
      navigate(`/private/learn/quiz-result/${lessonId}`);
    } else {
      // Cập nhật chỉ số câu hỏi
      setCurrentQuestionIndex((prevIndex) =>
        direction === "next"
          ? Math.min(prevIndex + 1, questions.length - 1)
          : Math.max(prevIndex - 1, 0)
      );
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-page">
      {/* Thanh tiến trình */}
      <div className="w-100 d-flex justify-content-center align-items-center py-3" >
        <div className="progress w-50">
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${progressPercentage}%`,
              backgroundColor: '#FF782D',
            }}
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
          ></div>
        </div>
      </div>

      {/* Câu hỏi */}
      {questions.length > 0 && (
        <QuestionCard
          question={questions[currentQuestionIndex]}
          onNavigation={handleNavigation}
        />
      )}
    </div>
  );
};

export default QuizPage;
