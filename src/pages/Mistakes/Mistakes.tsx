import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMistakes } from '../../services/mistakeService';
import { getCorrectAnswersByQuestionId } from '../../services/answerService';
import { getQuestionById } from '../../services/questionService';
import { getLessonById } from '../../services/lessonService';
import { MistakeResponse } from '../../interfaces/responses/MistakeResponse';
import { AnswerResponse } from '../../interfaces/responses/AnswerResponse';
import { QuestionResponse } from '../../interfaces/responses/QuestionResponse';
import { LessonResponse } from '../../interfaces/responses/LessonResponse';

const Mistake: React.FC<{ userId: number }> = ({ userId }) => {
    const navigate = useNavigate();
    const [mistakes, setMistakes] = useState<MistakeResponse[]>([]);
    const [correctAnswers, setCorrectAnswers] = useState<Record<number, AnswerResponse[]>>({});
    const [questions, setQuestions] = useState<Record<number, QuestionResponse>>({});
    const [lessons, setLessons] = useState<Record<number, LessonResponse>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState<number>(1);
    const mistakesPerPage = 10;

    useEffect(() => {
        const fetchMistakes = async () => {
            try {
                const response = await getAllMistakes();
                if (!Array.isArray(response.data)) {
                    throw new Error('Expected mistakesData to be an array');
                }

                setMistakes(response.data);

                const validMistakes = response.data.filter(mistake =>
                    typeof mistake.question_id === 'number' && mistake.question_id > 0
                );

                if (validMistakes.length === 0) {
                    setLoading(false);
                    return;
                }

                const answersPromises = validMistakes.map(mistake =>
                    getCorrectAnswersByQuestionId(mistake.question_id)
                );

                const questionsPromises = validMistakes.map(mistake =>
                    getQuestionById(mistake.question_id)
                );

                const lessonsPromises = validMistakes.map(mistake =>
                    getLessonById(mistake.lesson_id) // Lấy thông tin bài học
                );

                const [answersResults, questionsResults, lessonsResults] = await Promise.all([
                    Promise.all(answersPromises),
                    Promise.all(questionsPromises),
                    Promise.all(lessonsPromises),
                ]);

                const answersMap = validMistakes.reduce<Record<number, AnswerResponse[]>>((acc, mistake, index) => {
                    acc[mistake.question_id] = answersResults[index];
                    return acc;
                }, {});

                const questionsMap = validMistakes.reduce<Record<number, QuestionResponse>>((acc, mistake, index) => {
                    acc[mistake.question_id] = questionsResults[index];
                    return acc;
                }, {});

                const lessonsMap = validMistakes.reduce<Record<number, LessonResponse>>((acc, mistake, index) => {
                    acc[mistake.lesson_id] = lessonsResults[index]; // Thêm thông tin bài học vào map
                    return acc;
                }, {});

                setCorrectAnswers(answersMap);
                setQuestions(questionsMap);
                setLessons(lessonsMap);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to fetch mistakes');
                setLoading(false);
            }
        };

        fetchMistakes();
    }, [userId]);

    const handleReviewToggle = (mistake: MistakeResponse) => {
        const question = questions[mistake.questionId];

        if (!question) {
            console.error(`Question not found for mistake with ID ${mistake.id}`);
            return;
        }

        const correctAnswerList = correctAnswers[mistake.questionId]?.map(ans => ans.content).join(', ') || 'No correct answers found';

        navigate(`/private/mistakes/${mistake.id}`, {
            state: {
                question: question.content,
                yourAnswer: mistake.yourAnswer,
                correctAnswer: correctAnswerList,
                explanation: question.hint,
                date: mistake.updatedAt,
            },
        });
    };

    // Pagination logic
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
        <div className="container">
            <h1>List of Wrong Answers</h1>
            {mistakes.length === 0 ? (
                <p>No mistakes found.</p>
            ) : (
                <>
                    <table className="mistake-table">
                        <thead>
                            <tr>
                                <th>ID Mistake</th>
                                <th>Question Content</th>
                                <th>Chapter</th>
                                <th>Lesson</th>
                                <th>Your Answer</th>
                                <th>Correct Answer</th>
                                <th>Date Taken</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMistakes.map((mistake) => {
                                const questionContent = questions[mistake.questionId]?.content || 'Question not found';
                                const chapter = lessons[mistake.lessonId]?.chapter || 'N/A'; // Lấy thông tin chương
                                const lesson = lessons[mistake.lessonId]?.name || 'N/A'; // Lấy tên bài học
                                const correctAnswerList = correctAnswers[mistake.questionId]?.map(ans => ans.content).join(', ') || 'No correct answers found';
                                const dateTaken = mistake.updatedAt ? new Date(mistake.updatedAt).toLocaleDateString() : 'Invalid Date';

                                return (
                                    <tr key={mistake.id}>
                                        <td>{mistake.id}</td>
                                        <td>{questionContent}</td>
                                        <td>{chapter}</td>
                                        <td>{lesson}</td>
                                        <td>{mistake.yourAnswer || 'N/A'}</td>
                                        <td>{correctAnswerList}</td>
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

                    {/* Pagination Controls */}
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
            <style>
                {`
                .mistake-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .mistake-table th, .mistake-table td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }

                .mistake-table th {
                    background-color: #f2f2f2;
                    font-weight: bold;
                }

                .mistake-table tr:nth-child(even) {
                    background-color: #f9f9f9;
                }

                .mistake-table tr:hover {
                    background-color: #f1f1f1;
                }

                .btn-reviewed {
                    background-color: #a5d8a5;
                    color: #000;
                    border: none;
                    padding: 10px 15px;
                    cursor: pointer;
                    border-radius: 5px;
                }

                .btn-not-reviewed {
                    background-color: #f8d7da;
                    color: #000;
                    border: none;
                    padding: 10px 15px;
                    cursor: pointer;
                    border-radius: 5px;
                }

                .btn-reviewed:hover, .btn-not-reviewed:hover {
                    opacity: 0.8;
                }

                .pagination {
                    margin-top: 20px;
                    display: flex;
                    justify-content: center;
                }

                .pagination button {
                    margin: 0 5px;
                    padding: 10px 15px;
                    border: none;
                    border-radius: 5px;
                    background-color: #007bff;
                    color: white;
                    cursor: pointer;
                }

                .pagination button.active {
                    background-color: #0056b3;
                }

                .pagination button:hover {
                    opacity: 0.8;
                }
                `}
            </style>
        </div>
    );
};

export default Mistake;