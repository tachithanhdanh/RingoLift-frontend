import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../../services/bookService';
import { BookResponse } from '../../interfaces/responses/BookResponse';
import './StoryDetail.css';

const WORD_LIMIT = 500;

const StoryDetail: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const [story, setStory] = useState<BookResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pages, setPages] = useState<string[][]>([]);

  useEffect(() => {
    const fetchStoryDetail = async () => {
      if (!storyId || isNaN(parseInt(storyId))) {
        setError('Invalid story ID');
        setLoading(false);
        return;
      }

      try {
        // Fetch book details from API
        const response = await getBookById(parseInt(storyId));
        setStory(response.data);

        // Fetch story content from file
        const contentResponse = await fetch(`/content/book${storyId}.txt`);
        if (!contentResponse.ok) {
          throw new Error(`Failed to fetch content for book ID ${storyId}`);
        }
        const text = await contentResponse.text();

        // Split content into pages
        setContent(text);
        setPages(
          text.split(/\s+/).reduce<string[][]>((acc, word, index) => {
            const pageIndex = Math.floor(index / WORD_LIMIT);
            if (!acc[pageIndex]) acc[pageIndex] = [];
            acc[pageIndex].push(word);
            return acc;
          }, [])
        );
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err.message || 'Failed to fetch story details or content');
      } finally {
        setLoading(false);
      }
    };

    fetchStoryDetail();
  }, [storyId]);

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!story) {
    return <div className="not-found">Story not found</div>;
  }

  return (
    <div className="story-detail">
      <h1>{story.title}</h1>
      <h2>Author: {story.author}</h2>

      <div className="story-content">
        <div className="content-text">{pages[currentPage]?.join(' ') || 'No content available.'}</div>
      </div>

      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Previous
        </button>
        <span className="page-info">{`Page ${currentPage + 1} of ${pages.length}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === pages.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StoryDetail;
