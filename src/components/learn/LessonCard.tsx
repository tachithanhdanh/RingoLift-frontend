// LessonCard.tsx
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export interface LessonCardProps {
  id: number; // Lesson ID for navigation
  title: string;
  description: string;
}

// LessonCard Component
export default function LessonCard({
  id,
  title,
  description,
}: LessonCardProps) {
  const navigate = useNavigate();

  // Navigate to the lesson page on card click
  const handleCardClick = () => {
    navigate(`/private/learn/lesson/${id}`);
  };

  return (
    <Card
      bg="warning"
      text="dark"
      className="mb-3 lesson-card w-100" // Add a custom class for hover effect
      onClick={handleCardClick}
      style={{ cursor: "pointer" }} // Add pointer cursor to indicate it's clickable
    >
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
