import "./QuizResult.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/common/NavBar";
import { Alert } from "react-bootstrap";
import { getQuestionsByLessonId } from "../../services/lessonService";
import { getQuestionById } from "../../services/questionService";
import { getUserAnswerByUserIdAndQuestionId } from "../../services/userAnswerService";
import { LessonQuestionResponse } from "../../interfaces/responses/LessonQuestionResponse";
import { UserAnswerResponse } from "../../interfaces/responses/UserAnswerResponse";
import { useAuth } from "../../hooks/useAuth";
import { User } from "../../interfaces/models/User";
import { getUserById } from "../../services/userService";
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface ExtendedQuestion extends LessonQuestionResponse {
  content: string;
  correctAnswer: string;
}

function QuizResult() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [questions, setQuestions] = useState<ExtendedQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswerResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);

  const navigate = useNavigate();

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

  // console.log(profile);

  useEffect(() => {
    if (!lessonId) return;

    const fetchQuizData = async () => {
      setLoading(true);

      if (profile == null) {
        return (
          <Alert variant="danger" className="text-center">
            Profile is null
          </Alert>
        );
      }

      try {
        const id = parseInt(lessonId, 10);

        // Fetch questions for the lesson
        const lessonQuestions = await getQuestionsByLessonId(id);

        // Fetch detailed data for each question
        const detailedQuestions = await Promise.all(
          lessonQuestions.map(async (lessonQuestion) => {
            const questionDetails = await getQuestionById(lessonQuestion.questionId);
            return {
              ...lessonQuestion,
              content: questionDetails.content,
              correctAnswer: questionDetails.correctAnswer,
            };
          })
        );

        setQuestions(detailedQuestions);

        // Fetch user answers for each question
        const fetchedUserAnswers = await Promise.all(
          detailedQuestions.map((question) =>
            getUserAnswerByUserIdAndQuestionId(profile.id, question.questionId)
          )
        );

        setUserAnswers(fetchedUserAnswers);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [lessonId, profile]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (lessonId == undefined) return <div>Error: Lesson not found</div>;

  // Calculate total correct answers
  const correctAnswers = questions.reduce((count, question) => {
    const userAnswer = userAnswers.find((ua) => ua.questionId === question.questionId);
    return userAnswer?.answerText === question.correctAnswer ? count + 1 : count;
  }, 0);

  return (
    <div className="min-vh-100 bg-light">
      // <NavBar />
      <div className="quiz-result-pad container">
        <div className="row">
          {/* Main Content */}
          <div className="col-md-8 offset-md-2">
            <div className="bg-white rounded-4 p-4 shadow-sm">
              <div className="quiz-result text-center">
                <h4 className="fw-bold text-orange">Hoàn thành bài học</h4>
                <h6 className="text-muted">
                  Bạn trả lời đúng <strong>{correctAnswers}/{questions.length}</strong> câu hỏi.
                </h6>
              </div>

              {/* Question List */}
              <ul className="list-group">
                {questions.map((question, index) => {
                  const userAnswer = userAnswers.find((ua) => ua.questionId === question.questionId);
                  const isCorrect = userAnswer?.answerText === question.correctAnswer;
                  return (
                    <li key={question.questionId} className="list-group-item">
                      <div>
                        <strong>Câu {index + 1}:</strong> {question.content}
                      </div>
                      <div className="d-flex flex-column mt-2">
                        <span
                          className={`badge rounded-pill ${isCorrect ? "bg-success" : "bg-danger"}`}
                          style={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                          Bạn chọn: {userAnswer?.answerText || "Không chọn"}
                        </span>
                        <span
                          className="badge bg-info rounded-pill mt-2"
                          style={{ fontSize: "16px", fontWeight: "bold" }}
                        >
                          Đáp án đúng: {question.correctAnswer || "Không có"}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Action Buttons */}
              <div className="d-flex justify-content-between w-100 gap-3 mt-4">
                <button
                  className="btn btn-primary flex-grow-1 py-3"
                  style={{ borderRadius: '30px' }}
                  onClick={() => navigate(`/private/learn/lesson/${lessonId}`)} // Navigate to current lesson
                >
                  Học lại
                </button>
                <button
                  className="btn btn-success flex-grow-1 py-3"
                  style={{ borderRadius: '30px' }}
                  onClick={() => navigate(`/private/learn/lesson/${parseInt(lessonId, 10) + 1}`)} // Navigate to next lesson
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizResult;
