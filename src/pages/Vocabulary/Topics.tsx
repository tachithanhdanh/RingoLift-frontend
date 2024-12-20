// src/pages/Vocabulary/Topics.tsx

import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TopicResponse } from "../../interfaces/responses/TopicResponse";
import { getTopics } from "../../services/TopicService";


const Topics: React.FC = () => {
  const [topics, setTopics] = useState<TopicResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await getTopics();
        setTopics(data);
      } catch (err: any) {
        setError(err.message || "Error fetching topics.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const handleTopicClick = (topicId: number) => {
    navigate(`/vocabulary/topics/${topicId}/flashcard`);
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center bg-light">
      <Row className="w-100">
        {/* Left Side: Illustration or Description (Tùy chọn) */}
        <Col
          md={6}
          className="d-flex flex-column justify-content-center p-5"
        >
          <h1 className="fw-bold mb-4 text-center text-orange">ringolift</h1>
          <h4 className="mb-4 text-center">
            Choose a topic to explore and expand your English vocabulary!
          </h4>
          <div className="text-center">
          </div>
        </Col>

        {/* Right Side: Topics List */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <div className="w-100 p-4">
            <h3 className="text-center mb-4 fw-bold">Topics</h3>

            {loading && (
              <div className="text-center">
                <Spinner animation="border" variant="primary" />
              </div>
            )}

            {error && <Alert variant="danger">{error}</Alert>}

            {!loading && !error && (
              <Row>
                {topics.map((topic) => (
                  <Col key={topic.id} md={6} className="mb-4">
                    <Card
                      className="shadow-sm h-100 cursor-pointer"
                      onClick={() => handleTopicClick(topic.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <Card.Body className="d-flex align-items-center justify-content-center">
                        <Card.Title className="text-center text-orange">
                          {topic.name}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}

            {/* Nếu không có topic nào */}
            {!loading && !error && topics.length === 0 && (
              <Alert variant="info">No topics available.</Alert>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Topics;
