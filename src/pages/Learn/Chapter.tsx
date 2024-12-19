// ChapterPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import { getChapterById } from "../../services/chapterService";
import { getLessonsByChapterId } from "../../services/lessonService";
import LessonCard from "../../components/learn/LessonCard";
import { ChapterResponse } from "../../interfaces/responses/ChapterResponse";
import { LessonResponse } from "../../interfaces/responses/LessonResponse";

export default function ChapterPage() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const [chapter, setChapter] = useState<ChapterResponse | null>(null);
  const [lessons, setLessons] = useState<LessonResponse[]>([]);

  useEffect(() => {
    async function fetchChapterAndLessons() {
      try {
        if (chapterId) {
          const chapterData = await getChapterById(Number(chapterId));
          setChapter(chapterData);

          const lessonsData = await getLessonsByChapterId(Number(chapterId));
          setLessons(lessonsData);
        }
      } catch (error) {
        console.error("Error fetching chapter or lessons:", error);
      }
    }

    fetchChapterAndLessons();
  }, [chapterId]);

  return (
    <Container className="my-5">
      {chapter && (
        <div className="mb-4 text-center">
          <h1>{chapter.name}</h1>
          <img
            src={chapter.coverImage || "https://via.placeholder.com/600x200"}
            alt={chapter.name}
            className="img-fluid rounded my-3"
          />
          <p>
            <strong>Description: </strong>
            {chapter.description}
          </p>
        </div>
      )}

      <h2 className="text-center">Lessons</h2>
      <Row className="mt-4">
        {lessons.map((lesson, index) => (
          <Col
            key={index}
            sm={12}
            md={4}
            className="d-flex align-items-stretch"
          >
            <LessonCard
              id={lesson.id}
              title={lesson.title}
              description={lesson.description || ""}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
