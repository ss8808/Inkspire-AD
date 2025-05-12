import React from 'react';
import './FilterSidebar.css';

const FilterSidebar = ({ filters = { search: '', genre: [], availability: [], minPrice: '', tags: [] }, setFilters = () => {} }) => {
  const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Science Fiction', 'Romance', 'Biography'];
  const availability = ['In Stock', 'Library Access'];
  const tags = ['Bestseller', 'Award Winner', 'New Release', 'New Arrival', 'Coming Soon'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const updatedList = filters[name]?.includes(value)
        ? filters[name].filter((v) => v !== value)
        : [...(filters[name] || []), value];
      setFilters((prev) => ({ ...prev, [name]: updatedList }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <aside className="filter-sidebar">
      <h2>Refine Results</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by title, USKR, or descr.."
          name="search"
          value={filters.search}
          onChange={handleInputChange}
        />
      </div>

      <div className="filter-section">
        <h3>Genre</h3>
        {genres.map((genre, index) => (
          <div className="checkbox-item" key={index}>
            <input
              type="checkbox"
              id={`genre-${index}`}
              name="genre"
              value={genre}
              checked={filters.genre?.includes(genre)}
              onChange={handleInputChange}
            />
            <label htmlFor={`genre-${index}`}>{genre}</label>
          </div>
        ))}
      </div>

      <div className="filter-section">
        <h3>Availability</h3>
        {availability.map((option, index) => (
          <div className="checkbox-item" key={index}>
            <input
              type="checkbox"
              id={`availability-${index}`}
              name="availability"
              value={option}
              checked={filters.availability?.includes(option)}
              onChange={handleInputChange}
            />
            <label htmlFor={`availability-${index}`}>{option}</label>
          </div>
        ))}
      </div>

      <div className="filter-section">
        <h3>Tags</h3>
        {tags.map((tag, index) => (
          <div className="checkbox-item" key={index}>
            <input
              type="checkbox"
              id={`tag-${index}`}
              name="tags"
              value={tag}
              checked={filters.tags?.includes(tag)}
              onChange={handleInputChange}
            />
            <label htmlFor={`tag-${index}`}>{tag}</label>
          </div>
        ))}
      </div>

      <div className="filter-section">
        <h3>Price Range</h3>
        <div className="price-range">
          <div className="price-input">
            <span>$</span>
            <input
              type="number"
              min="0"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleInputChange}
              placeholder="Min"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
