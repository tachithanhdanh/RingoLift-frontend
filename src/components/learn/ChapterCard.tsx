import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export interface ChapterCardProps {
  id: number; // Add an id for navigation
  name: string;
  coverImage: string;
  description: string;
}

// ChapterCard Component
export default function ChapterCard({
  id,
  name,
  coverImage,
  description,
}: ChapterCardProps) {
  const navigate = useNavigate();

  // Navigate to the chapter page on card click
  const handleCardClick = () => {
    navigate(`/private/learn/chapter/${id}`);
  };

  return (
    <Card
      bg="warning"
      text="dark"
      className="mb-3 chapter-card" // Add a custom class for hover effect
      onClick={handleCardClick}
      style={{ cursor: "pointer" }} // Add pointer cursor to indicate it's clickable
    >
      <Card.Img variant="top" src={coverImage} alt={name} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
