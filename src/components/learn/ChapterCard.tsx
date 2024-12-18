import { Card } from "react-bootstrap";

export interface ChapterCardProps {
  name: string;
  coverImage: string;
  description: string;
}

// ChapterCard Component
export default function ChapterCard({
  name,
  coverImage,
  description,
}: ChapterCardProps) {
  return (
    <Card bg="warning" text="dark" className="mb-3">
      <Card.Img variant="top" src={coverImage} alt={name} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
