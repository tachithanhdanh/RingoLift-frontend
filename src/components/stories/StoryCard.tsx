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
  createdAt,
  updatedAt,
  onClick
}) => {
  return (
    <button className="card mb-3" onClick={onClick} style={{ border: 'none', width: '100%', textAlign: 'center' }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <span className="badge genre-badge">{genre}</span>
        <p className="card-text"><strong>Summary:</strong> {description}</p>
        <p className="card-text"><strong>Upload date:</strong> {publishedDate}</p>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .card {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          background: #f9f9f9;
        }
        .card-body {
          padding: 15px;
          text-align: center; /* Center the text */
        }
        .card-title {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .genre-badge {
          background-color: #4CAF50;
          color: white;
          padding: 5px 10px;
          border-radius: 5px;
          margin-bottom: 10px;
          display: inline-block;
        }
        .card-text {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </button>
  );
};

export default StoryCard;