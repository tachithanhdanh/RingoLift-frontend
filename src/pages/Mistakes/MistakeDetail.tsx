import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const MistakeDetail: React.FC = () => {
    const { mistakeId } = useParams();
    const location = useLocation();

    if (!location.state) {
        return <div>No data available.</div>;
    }

    const { question, yourAnswer, correctAnswer, explanation, date } = location.state;

    // Kiểm tra và định dạng ngày
    const formattedDate = date ? new Date(date).toLocaleDateString() : 'Invalid Date';

    return (
        <div>
            <h1>Detail for Mistake ID: {mistakeId}</h1>
            <h2>Question: {question}</h2>
            <p>Your Answer: {yourAnswer || 'N/A'}</p>
            <p>Correct Answer: {correctAnswer || 'N/A'}</p>
            <p>Explanation: {explanation || 'N/A'}</p>
            <p>Date: {formattedDate}</p>
            <button onClick={() => window.history.back()}>Back</button>
        </div>
    );
};

export default MistakeDetail;