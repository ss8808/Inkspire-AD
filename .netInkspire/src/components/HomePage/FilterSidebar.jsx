import React from 'react';
import './FilterSidebar.css';

const FilterSidebar = () => {
  const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Science Fiction', 'Romance', 'Biography'];
  const availability = ['In Stock', 'Library Access'];

  return (
    <aside className="filter-sidebar">
      <h2>Refine Results</h2>
      
      <div className="search-box">
        <input type="text" placeholder="Search by title, USKR, or descr.." />
      </div>
      
      <div className="filter-section">
        <h3>Genre</h3>
        {genres.map((genre, index) => (
          <div className="checkbox-item" key={index}>
            <input type="checkbox" id={`genre-${index}`} />
            <label htmlFor={`genre-${index}`}>{genre}</label>
          </div>
        ))}
      </div>
      
      <div className="filter-section">
        <h3>Availability</h3>
        {availability.map((option, index) => (
          <div className="checkbox-item" key={index}>
            <input type="checkbox" id={`availability-${index}`} />
            <label htmlFor={`availability-${index}`}>{option}</label>
          </div>
        ))}
      </div>
      
      <div className="filter-section">
        <h3>Price Range</h3>
        <div className="price-range">
          <div className="price-input">
            <span>$</span>
            <input type="number" min="0" placeholder="Min" />
          </div>
          <input type="range" min="0" max="100" className="slider" />
          <div className="price-labels">
            <span>$$$</span>
            <span>$100</span>
          </div>
        </div>
      </div>
      
      <button className="apply-filters-button">Apply Filters</button>
    </aside>
  );
};

export default FilterSidebar;
