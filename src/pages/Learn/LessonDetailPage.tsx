// LessonDetailPage.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Button, Modal } from "react-bootstrap";
import { getLessonById } from "../../services/lessonService";
import "bootstrap/dist/css/bootstrap.min.css";
import { LessonResponse } from "../../interfaces/responses/LessonResponse";

export default function LessonDetailPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<LessonResponse | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLesson() {
      try {
        if (lessonId) {
          const lessonData = await getLessonById(Number(lessonId));
          setLesson(lessonData);
        }
      } catch (error) {
        console.error("Error fetching lesson:", error);
      }
    }

    fetchLesson();
  }, [lessonId]);

  const handleBack = () => {
    if (lesson) {
      console.log(lesson.chapterId);
      navigate(`/private/learn/chapter/${lesson.chapterId}`);
    }
  };

  const handleStartQuiz = () => {
    setShowModal(true);
  };

  const confirmStartQuiz = () => {
    setShowModal(false);
    navigate(`/private/learn/lesson/${lessonId}/quiz`);
  };

  const cancelStartQuiz = () => {
    setShowModal(false);
  };

  return (
    <Container className="my-5 p-5 border rounded shadow-lg">
      {lesson ? (
        <div>
          <div className="text-center">
            <h1 className="mb-4">{lesson.title}</h1>
            <p className="lead">{lesson.description}</p>
          </div>
          <div className="mt-4 text-start">
            <h5>Chapter Information</h5>
            <p>
              <strong>Chapter ID:</strong>{" "}
              <Link to={`/private/learn/chapter/${lesson.chapterId}`}>
                {lesson.chapterId}
              </Link>
            </p>
            <p>
              <strong>Chapter Name:</strong> {lesson.chapterName}
            </p>
            <p>
              <strong>Created At:</strong> {lesson.createdAt}
            </p>
            <p>
              <strong>Updated At:</strong> {lesson.updatedAt}
            </p>
          </div>
          <div className="mt-4 text-center">
            <Button variant="primary" onClick={handleBack} className="me-3">
              Back to Chapter
            </Button>
            <Button variant="success" onClick={handleStartQuiz}>
              Start Quiz
            </Button>
          </div>

          <Modal show={showModal} onHide={cancelStartQuiz} centered>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Start Quiz</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to start the quiz?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={cancelStartQuiz}>
                No
              </Button>
              <Button variant="primary" onClick={confirmStartQuiz}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <p>Loading lesson details...</p>
      )}
    </Container>
  );
}
