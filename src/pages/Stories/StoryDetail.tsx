import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getBookById, readBookContent } from '../../services/bookService';
import { BookResponse } from '../../interfaces/responses/BookResponses';

const WORD_LIMIT = 500;

const StoryDetail: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const location = useLocation();
  const contentUrl = location.state?.contentUrl;
  const [story, setStory] = useState<BookResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pages, setPages] = useState<string[][]>([]);

  useEffect(() => {
    const fetchStoryDetail = async () => {
      setLoading(true);

      if (!storyId || isNaN(parseInt(storyId))) {
        setError('Invalid story ID');
        setLoading(false);
        return;
      }

      try {
        const bookResponse = await getBookById(parseInt(storyId));
        if (!bookResponse) {
          throw new Error('Story not found');
        }

        setStory(bookResponse);

        if (!contentUrl) {
          setError('This book does not have content available');
          setLoading(false);
          return;
        }

        const contentResponse = await readBookContent(contentUrl);
        if (!contentResponse || !contentResponse.content) {
          throw new Error('Story content not found');
        }

        const text = contentResponse.content;
        setContent(text);

        const words = text.split(/\s+/).filter(word => word.length > 0);
        const pageArray = words.reduce<string[][]>((acc, word, index) => {
          const pageIndex = Math.floor(index / WORD_LIMIT);
          if (!acc[pageIndex]) acc[pageIndex] = [];
          acc[pageIndex].push(word);
          return acc;
        }, []);
        setPages(pageArray);

      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err?.message || 'Failed to fetch story details or content');
      } finally {
        setLoading(false);
      }
    };

    fetchStoryDetail();
  }, [storyId, contentUrl]);

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
    return <div className="d-flex justify-content-center align-items-center min-vh-100">Loading...</div>;
  }

  if (error) {
    return <div className="text-danger text-center min-vh-100 d-flex align-items-center justify-content-center">{error}</div>;
  }

  if (!story) {
    return <div className="text-center min-vh-100 d-flex align-items-center justify-content-center">Story not found</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-light rounded shadow">
      <h1 className="text-center mb-4 text-primary">{story.title}</h1>
      <h2 className="text-center mb-4 text-secondary">Author: {story.author}</h2>

      <div className="bg-white rounded shadow p-4 mb-4">
        <div className="text-dark">
          {pages[currentPage]?.join(' ') || 'No content available.'}
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn"
          style={{ backgroundColor: '#008080', color: 'white' }} // Teal color
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
        >
          Previous
        </button>

        <span className="text-center flex-grow-1">Page {currentPage + 1} of {pages.length}</span>

        <button
          className="btn"
          style={{ backgroundColor: '#008080', color: 'white' }} // Teal color
          onClick={handleNextPage}
          disabled={currentPage === pages.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StoryDetail;