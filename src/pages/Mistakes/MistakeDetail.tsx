import { useLocation, useParams } from 'react-router-dom';

const MistakeDetail = () => {
    const { mistakeId } = useParams();
    const location = useLocation();

    console.log('Location state:', location.state); // Debugging

    if (!location.state) {
        return <div>No data available.</div>; // Display message if no data
    }

    const { question, yourAnswer, correctAnswer, explanation, date } = location.state;

    return (
        <div>
            <h1>Detail for Mistake ID: {mistakeId}</h1>
            <h2>Question: {question}</h2>
            <p>Your Answer: {yourAnswer}</p>
            <p>Correct Answer: {correctAnswer}</p>
            <p>Explanation: {explanation}</p>
            <p>Date: {new Date(date).toLocaleDateString()}</p>
            <button onClick={() => window.history.back()}>Back</button>
        </div>
    );
};

export default MistakeDetail;