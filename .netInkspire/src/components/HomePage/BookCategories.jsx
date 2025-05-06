import React from 'react';
import './BookCategories.css';

const BookCategories = () => {
  const categories = ['Bestsellers', 'New Arrivals', 'Award Winners', 'Deals'];
  
  return (
    <div className="book-categories">
      {categories.map((category, index) => (
        <button key={index} className="category-button">{category}</button>
      ))}
    </div>
  );
};

export default BookCategories;