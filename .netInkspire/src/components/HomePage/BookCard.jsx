import React from 'react';
import './BookCard.css';

const BookCard = ({ image, title, author, price, originalPrice }) => {
  return (
    <div className="book-card">
      <div className="book-cover">
        <img src={image} alt={title} />
      </div>
      <div className="book-info">
        <h3>{title}</h3>
        <p className="author">{author}</p>
        <div className="price-info">
          <span className="current-price">${price}</span>
          {originalPrice && <span className="original-price">${originalPrice}</span>}
        </div>
      </div>
    </div>
  );
};

export default BookCard;