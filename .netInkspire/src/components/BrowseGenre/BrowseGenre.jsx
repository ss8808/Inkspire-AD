import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './BrowseGenre.css';

const genres = [
  "Romance", "Fanfiction", "LGBTQ+", "Werewolf", "Fantasy", "Short Story",
  "Teen Fiction", "Historical", "Paranormal", "Humor", "Horror", "Contemporary Lit",
  "Diverse Lit", "Mystery", "Thriller", "Science Fiction", "Adventure", "Non-Fiction", "Poetry"
];

function BrowseGenre() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else if (selectedGenres.length < 3) {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleContinue = () => {
    if (selectedGenres.length > 0) {
      navigate('/bookmarks');
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <span className="back-arrow">←</span>
        <span className="logo"><span className="book-icon">📘</span> Inkspire</span>
        <span className="forward-arrow">→</span>
      </div>

      <div className="header">What are your 3 favorite genres to read?</div>
      <div className="subtext">Choose at least 1 genre to get started with personalized recommendations.</div>

      <div className="genre-grid">
        {genres.map((genre) => (
          <div
            key={genre}
            className={`genre-button ${selectedGenres.includes(genre) ? 'selected' : ''}`}
            onClick={() => toggleGenre(genre)}
          >
            {genre}
          </div>
        ))}
      </div>

      <button
        className="continue-button"
        disabled={selectedGenres.length === 0}
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
}



export default BrowseGenre;
