import React, { useEffect, useState } from "react";
import { getAllChapters } from "../../services/chapterService";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import ChapterCard from "../../components/learn/ChapterCard";

import chapterCoverImage from "../../assets/images/chapter-cover-image.png"; // Import avatar từ thư mục assets/img
import { ChapterResponse } from "../../interfaces/responses/ChapterResponse";

// Chapter Page Component
export default function Learn() {
  const [chapters, setChapters] = useState<ChapterResponse[]>([]);

  useEffect(() => {
    async function fetchChapters() {
      try {
        const data = await getAllChapters();
        setChapters(data);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    }
    fetchChapters();
  }, []);

  return (
    <Container className="my-5">
      <h1 className="text-center">List of Chapters</h1>
      <Row className="mt-4">
        {chapters.map((chapter, index) => (
          <Col
            key={index}
            sm={12}
            md={4}
            className="d-flex align-items-stretch"
          >
            <ChapterCard
              name={chapter.name}
              coverImage={chapter.coverImage || chapterCoverImage}
              description={chapter.description || ""}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
