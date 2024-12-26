import React from 'react';

interface StoryCardProps {
  title: string;
  author: string;
  genre: string;
  publishedDate: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  onClick: () => void;
}

const StoryCard: React.FC<StoryCardProps> = ({
  title,
  author,
  genre,
  publishedDate,
  description,
  onClick
}) => {
  return (
    <div className="card mb-3 h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <span className="badge bg-success mb-2">{genre}</span>
        <p className="card-text"><strong>Summary:</strong> {description}</p>
        <p className="card-text"><strong>Upload date:</strong> {publishedDate}</p>
        <button
          onClick={onClick}
          className="btn btn-primary mt-auto"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default StoryCard;