import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StoryCard from '../../components/Stories/StoryCard';
import { getAllBooks } from '../../services/bookService';
import { getAllGenres } from '../../services/bookGenreService';
import { BookResponse } from '../../interfaces/responses/BookResponse';
import { BookGenreResponse } from '../../interfaces/responses/BookGenreResponse';
import NavBar from '../../components/common/NavBar'; // Import NavBar

const StoryList: React.FC = () => {
  const [stories, setStories] = useState<BookResponse[]>([]);
  const [genres, setGenres] = useState<BookGenreResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const storiesPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStoriesAndGenres = async () => {
      try {
        const storyResponse = await getAllBooks();
        setStories(storyResponse.data);

        const genreResponse = await getAllGenres();
        setGenres(genreResponse.data);
      } catch (err) {
        setError('Failed to fetch stories or genres');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStoriesAndGenres();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const getGenreName = (genreId: string) => {
    const genre = genres.find((g) => g.id === parseInt(genreId));
    return genre ? genre.genre_type : 'Unknown Genre';
  };

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = filteredStories.slice(indexOfFirstStory, indexOfLastStory);
  const totalPages = Math.ceil(filteredStories.length / storiesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleClick = (id: string) => {
    navigate(`/story/${id}`); // Ensure this path matches your route
  };

  return (
    <div className="container">
      <NavBar /> {/* Include the NavBar here */}
      <style>{`
        .container {
          padding: 20px;
        }
        .pagination {
          margin-top: 20px;
          text-align: center;
        }
        .pagination .btn {
          margin: 0 5px;
        }
        .form-control {
          margin-bottom: 20px;
        }
      `}</style>

      <h1>Stories</h1>
      <h2>List of stories</h2>
      <input
        type="text"
        placeholder="Search stories..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // Reset to first page on search
        }}
        className="form-control mb-3"
      />
      <div className="row">
        {currentStories.map((story) => (
          <div className="col-md-4" key={story.id}>
            <StoryCard
              title={story.title}
              author={story.author}
              genre={getGenreName(story.genre_id.toString())}
              publishedDate={story.published_date}
              description={story.description}
              createdAt={story.created_at}
              updatedAt={story.updated_at}
              onClick={() => handleClick(story.id.toString())} // Pass ID for navigation
            />
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`btn btn-outline-primary ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StoryList;
