import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import { useParams, Link, useLocation } from "react-router-dom";
import { WordResponse } from "../../interfaces/responses/WordResponse";
import { getWordsByTopic } from "../../services/WordService"; // Đảm bảo import đúng

const Flashcard: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const location = useLocation();
  const topicName = location.state?.topicName || "Topic";
  const [words, setWords] = useState<WordResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showMeaning, setShowMeaning] = useState<boolean>(false);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        if (topicId) {
          const data = await getWordsByTopic(Number(topicId));
          console.log("Fetched Words:", data); // Thêm dòng này để kiểm tra
          setWords(data);
        }
      } catch (err: any) {
        setError(err.message || "Error fetching words.");
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, [topicId]);

  const handleNext = () => {
    setShowMeaning(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  const handlePrev = () => {
    setShowMeaning(false);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + words.length) % words.length
    );
  };

  const handleFlip = () => {
    setShowMeaning(!showMeaning);
  };

  if (loading) {
    return (
      <Container
        fluid
        className="min-vh-100 d-flex align-items-center justify-content-center bg-light"
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        fluid
        className="min-vh-100 d-flex align-items-center justify-content-center bg-light"
      >
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (words.length === 0) {
    return (
      <Container
        fluid
        className="min-vh-100 d-flex align-items-center justify-content-center bg-light"
      >
        <Alert variant="info">No words found in this topic.</Alert>
      </Container>
    );
  }

  const currentWord = words[currentIndex];

  return (
    <Container
      fluid
      className="min-vh-100 d-flex flex-column align-items-center bg-light"
    >
      <header className="w-100 d-flex justify-content-center align-items-center position-relative px-4 py-3 text-dark">
        <Link
          to="/private/vocabulary"
          className="position-absolute start-0 px-4"
        >
          &larr; Back
        </Link>
        <h2 className="m-0">Topic: {topicName}</h2>
      </header>
      <main className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
        <Card
          className="shadow p-4 rounded-4 text-center"
          style={{ width: "800px", height: "400px", cursor: "pointer" }}
          onClick={handleFlip}
        >
          <Card.Body>
            <Card.Title
              className="text-orange fw-bold"
              style={{ fontSize: "2rem" }}
            >
              {showMeaning ? currentWord.meaning : currentWord.word}
            </Card.Title>
            <p className="text-muted">
              {showMeaning ? currentWord.pronunciation : "(Tap to flip)"}
            </p>
          </Card.Body>
        </Card>
        <div className="mt-4 d-flex justify-content-between w-100 px-4">
          <Button variant="secondary" onClick={handlePrev}>
            Previous
          </Button>
          <Button variant="secondary" onClick={handleNext}>
            Next
          </Button>
        </div>
        <a className="w-100 d-flex justify-content-center align-items-center py-3 bg-light">
          <div className="progress w-50">
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
              aria-valuenow={((currentIndex + 1) / words.length) * 100}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
        </a>
      </main>
    </Container>
  );
};

export default Flashcard;
