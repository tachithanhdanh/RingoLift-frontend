import "./MistakeDetail.css"
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    padding: 20px;
    max-width: 600px;
    margin: auto;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
`;

const Title = styled.h1`
    font-size: 24px;
    color: #333;
`;

const Question = styled.h2`
    font-size: 20px;
    color: #444;
`;

const AnswerSection = styled.div`
    margin: 20px 0;
`;

const YourAnswer = styled.p`
    background-color: #ffcccc;
    padding: 10px;
    border-radius: 4px;
`;

const CorrectAnswer = styled.p`
    background-color: #ccffcc;
    padding: 10px;
    border-radius: 4px;
`;

const Explanation = styled.p`
    margin: 10px 0;
`;

const DateCreated = styled.p`
    margin: 10px 0;
`;

const BackButton = styled.button`
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const MistakeDetail: React.FC = () => {
    const { mistakeId } = useParams();
    const location = useLocation();

    if (!location.state) {
        return <div>No data available.</div>;
    }

    const { question, yourAnswer, correctAnswer, explanation, date } = location.state;

    // Format the date
    const formattedDate = date ? new Date(date).toLocaleDateString() : 'Invalid Date';

    return (
        <div className="mistake-detail">
        <Container>
            <Title>Detail for Mistake ID: {mistakeId}</Title>
            <Question>Question: {question}</Question>
            <AnswerSection>
                <YourAnswer>Your answer: <span>{yourAnswer || 'N/A'}</span></YourAnswer>
                <CorrectAnswer>Correct answer: <span>{correctAnswer || 'N/A'}</span></CorrectAnswer>
            </AnswerSection>
            <Explanation>Explanation: {explanation || 'N/A'}</Explanation>
            <DateCreated>Created date: {formattedDate}</DateCreated>
            <BackButton onClick={() => window.history.back()}>Back</BackButton>
        </Container>
        </div>
    );
};

export default MistakeDetail;