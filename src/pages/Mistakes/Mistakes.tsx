import "./Mistakes.css";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMistakes, updateMistake } from '../../services/mistakeService';
import { getAnswersByQuestionId } from '../../services/answerService';
import { getQuestionById } from '../../services/questionService';
import { getLessonById } from '../../services/lessonService';
import { MistakeResponse } from '../../interfaces/responses/MistakeResponse';
import { AnswerResponse } from '../../interfaces/responses/AnswerResponse';
import { QuestionResponse } from '../../interfaces/responses/QuestionResponse';
import { LessonResponse } from '../../interfaces/responses/LessonResponse';
import { useAuth } from "../../hooks/useAuth";
import { User } from "../../interfaces/models/User";
import { getUserById } from "../../services/userService";

function Mistake() {
    const navigate = useNavigate();
    const [mistakes, setMistakes] = useState<MistakeResponse[]>([]);
    // const [correctAnswers, setCorrectAnswers] = useState<Record<number, AnswerResponse[]>>({});
    const [questions, setQuestions] = useState<Record<number, QuestionResponse>>({});
    const [lessons, setLessons] = useState<Record<number, LessonResponse>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { user } = useAuth();
    const [profile, setProfile] = useState<User | null>(null);

    const mistakesPerPage = 8;

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
        const fetchMistakes = async () => {
            if (profile == null) return;

            try {
                const response = await getAllMistakes();
                console.log('API Response:', response.data);
                if (!Array.isArray(response.data)) {
                    throw new Error('Expected mistakesData to be an array');
                }

                const userMistakes = response.data.filter(mistake => String(mistake.userId) === String(profile.id));
                setMistakes(userMistakes);

                const validMistakes = userMistakes.filter(mistake =>
                    typeof mistake.questionId === 'number' && mistake.questionId > 0
                );

                if (validMistakes.length === 0) {
                    setLoading(false);
                    return;
                }

                const answersPromises = validMistakes.map(mistake =>
                    getAnswersByQuestionId(mistake.questionId)
                );

                const questionsPromises = validMistakes.map(mistake =>
                    getQuestionById(mistake.questionId)
                );

                const lessonsPromises = validMistakes.map(mistake =>
                    getLessonById(mistake.lessonId)
                );

                const [answersResults, questionsResults, lessonsResults] = await Promise.all([
                    Promise.all(answersPromises.map(p => p.catch(error => ({ error })))),
                    Promise.all(questionsPromises.map(p => p.catch(error => ({ error })))),
                    Promise.all(lessonsPromises.map(p => p.catch(error => ({ error })))),
                ]);

                // const answersMap = validMistakes.reduce<Record<number, AnswerResponse[]>>((acc, mistake, index) => {
                //     const result = answersResults[index];
                //     if (!result.error && Array.isArray(result)) {
                //         acc[mistake.questionId] = result;
                //     }
                //     return acc;
                // }, {});

                const questionsMap = validMistakes.reduce<Record<number, QuestionResponse>>((acc, mistake, index) => {
                    const result = questionsResults[index];
                    if (!result.error) {
                        acc[mistake.questionId] = result;
                    }
                    return acc;
                }, {});

                const lessonsMap = validMistakes.reduce<Record<number, LessonResponse>>((acc, mistake, index) => {
                    const result = lessonsResults[index];
                    if (!result.error) {
                        acc[mistake.lessonId] = result;
                    }
                    return acc;
                }, {});

                // setCorrectAnswers(answersMap);
                setQuestions(questionsMap);
                setLessons(lessonsMap);
                setLoading(false);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch mistakes');
                setLoading(false);
            }
        };

        fetchMistakes();
    }, [profile]);

    const handleReviewToggle = async (mistake: MistakeResponse) => {
        console.log('Before update:', mistake);
        if (!mistake.active) {
            try {
                const updatedMistake = await updateMistake(mistake.id, {
                    ...mistake,
                    active: true,
                });
                setMistakes(prev => prev.map(m => (m.id === mistake.id ? { ...m, active: true } : m)));
                console.log('Updated Mistake:', updatedMistake);

            } catch (error: any) {
                console.error('Error updating mistake:', error);
                setError('Failed to update mistake status');
                return;
            }
        }

        const question = questions[mistake.questionId];

        if (!question) {
            console.error(`Question not found for mistake with ID ${mistake.id}`);
            return;
        }

        // const correctAnswerList = correctAnswers[mistake.questionId]
        //     ?.map(ans => ans.content)
        //     .join(', ') || 'No correct answers found';

        navigate(`/private/mistakes/${mistake.id}`, {
            state: {
                question: question.content,
                yourAnswer: mistake.yourAnswer,
                correctAnswer: question.correctAnswer,
                explanation: question.hint,
                date: mistake.updatedAt,
            },
        });
    };

    const indexOfLastMistake = currentPage * mistakesPerPage;
    const indexOfFirstMistake = indexOfLastMistake - mistakesPerPage;
    const currentMistakes = mistakes.slice(indexOfFirstMistake, indexOfLastMistake);
    const totalPages = Math.ceil(mistakes.length / mistakesPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    return (
        <div className="container mistakes">
            <h1>List of Wrong Answers</h1>
            {mistakes.length === 0 ? (
                <p>No mistakes found.</p>
            ) : (
                <>
                    <table className="mistake-table">
                        <thead>
                            <tr>
                                <th>ID Mistake</th>
                                <th>Question</th>
                                <th>Chapter</th>
                                <th>Lesson</th>
                                <th className="incorrect-answer">Incorrect Answer</th>
                                <th>Correct Answer</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMistakes.map((mistake) => {
                                const questionContent = questions[mistake.questionId]?.content || 'Question not found';
                                const lesson = lessons[mistake.lessonId];
                                // const correctAnswerList = correctAnswers[mistake.questionId]
                                //     ?.map(ans => ans.content)
                                //     .join(', ') || 'No correct answers found';
                                const dateTaken = mistake.updatedAt ? new Date(mistake.updatedAt).toLocaleDateString() : 'Invalid Date';
                                const correctAnswer = questions[mistake.questionId].correctAnswer;

                                return (
                                    <tr key={mistake.id}>
                                        <td>{mistake.id}</td>
                                        <td>{questionContent}</td>
                                        <td>{lesson?.chapterName || 'N/A'}</td>
                                        <td>{lesson?.title || 'N/A'}</td>
                                        <td className="incorrect-answer">{mistake.yourAnswer || 'N/A'}</td>
                                        <td>{correctAnswer}</td>
                                        <td>{dateTaken}</td>
                                        <td>
                                            <button
                                                className={mistake.active ? 'btn-reviewed' : 'btn-not-reviewed'}
                                                onClick={() => handleReviewToggle(mistake)}
                                            >
                                                {mistake.active ? 'Reviewed' : 'Not Reviewed'}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={currentPage === index + 1 ? 'active' : ''}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Mistake;