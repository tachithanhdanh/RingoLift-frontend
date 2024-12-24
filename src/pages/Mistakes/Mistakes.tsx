import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMistakes } from '../../services/mistakeService';
import { getCorrectAnswersByQuestionId } from '../../services/answerService';
import { getQuestionById } from '../../services/questionService';
import { MistakeResponse } from '../../interfaces/responses/MistakeResponse';
import { AnswerResponse } from '../../interfaces/responses/AnswerResponse';
import { QuestionResponse } from '../../interfaces/responses/QuestionResponse';

const Mistake: React.FC<{ userId: number }> = ({ userId }) => {
    const navigate = useNavigate();
    const [mistakes, setMistakes] = useState<MistakeResponse[]>([]);
    const [correctAnswers, setCorrectAnswers] = useState<Record<number, AnswerResponse[]>>({});
    const [questions, setQuestions] = useState<Record<number, QuestionResponse>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMistakes = async () => {
            try {
                const response = await getAllMistakes();
                const mistakesData = response.data;
                setMistakes(mistakesData);

                const answersPromises = mistakesData.map(mistake =>
                    getCorrectAnswersByQuestionId(mistake.question_id)
                );
                const answersResults = await Promise.all(answersPromises);

                const questionsPromises = mistakesData.map(mistake =>
                    getQuestionById(mistake.question_id)
                );
                const questionsResults = await Promise.all(questionsPromises);

                const answersMap = mistakesData.reduce<Record<number, AnswerResponse[]>>((acc, mistake, index) => {
                    acc[mistake.question_id] = answersResults[index];
                    return acc;
                }, {});

                const questionsMap = mistakesData.reduce<Record<number, QuestionResponse>>((acc, mistake, index) => {
                    acc[mistake.question_id] = questionsResults[index]?.data;
                    return acc;
                }, {});

                setCorrectAnswers(answersMap);
                setQuestions(questionsMap);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching mistakes:', err);
                setError(err.response?.data?.message || 'Failed to fetch mistakes');
                setLoading(false);
            }
        };

        fetchMistakes();
    }, [userId]);

    const handleReviewToggle = (mistake) => {
        const question = questions[mistake.question_id];
        if (!question) {
            console.error(`Question not found for mistake with ID ${mistake.id}`);
            return;
        }

        const correctAnswerList = correctAnswers[mistake.question_id]?.map(ans => ans.content).join(', ') || 'N/A';

        console.log('Navigating with mistake:', mistake);

        navigate(`/mistakes/${mistake.id}`, {
            state: {
                question: question.content,
                yourAnswer: mistake.your_answer,
                correctAnswer: correctAnswerList,
                explanation: question.hint,
                date: mistake.updated_at
            }
        });
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
                <table className="mistake-table">
                    <thead>
                        <tr>
                            <th>ID Mistake</th>
                            <th>Question Content</th>
                            <th>Your Answer</th>
                            <th>Correct Answer</th>
                            <th>Date Taken</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mistakes.map((mistake) => {
                            const questionContent = questions[mistake.question_id]?.content || 'N/A';
                            const correctAnswerList = correctAnswers[mistake.question_id]?.length
                                ? correctAnswers[mistake.question_id].map(ans => ans.content).join(', ')
                                : 'N/A';

                            return (
                                <tr key={mistake.id}>
                                    <td>{mistake.id}</td>
                                    <td>{questionContent}</td>
                                    <td>{mistake.your_answer || 'N/A'}</td>
                                    <td>{correctAnswerList}</td>
                                    <td>{new Date(mistake.updated_at).toLocaleDateString() || 'N/A'}</td>
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
                `}
            </style>
        </div>
    );
};

export default Mistake;