import React, { useState } from 'react';
import './BookCategories.css';

const BookCategories = ({ setFilters }) => {
  const categories = ['Bestsellers', 'New Arrivals', 'Award Winners', 'Deals'];
  const [activeCategory, setActiveCategory] = useState('');

  const handleCategoryClick = (category) => {
    setActiveCategory(category); // set active for styling

    const tagMap = {
      'Bestsellers': 'Bestseller',
      'New Arrivals': 'New Arrival',
      'Award Winners': 'Award Winner',
      'Deals': 'Deals'
    };

    setFilters({
      search: '',
      genre: [],
      availability: [],
      minPrice: '',
      tags: tagMap[category] === 'Deals' ? [] : [tagMap[category]],
      category: category
    });
  };
return (
  <div className="book-categories">
    {categories.map((category, index) => (
      <button
        key={index}
        className={`category-button ${activeCategory === category ? 'active' : ''}`}
        onClick={() => handleCategoryClick(category)}
      >
        {category}
      </button>
    ))}
    <button
      className="category-button clear"
      onClick={() => {
        setActiveCategory('');
        setFilters({
          search: '',
          genre: [],
          availability: [],
          minPrice: '',
          tags: [],
          category: ''
        });
      }}
    >
      Clear All
    </button>
  </div>
);

};

export default BookCategories;
