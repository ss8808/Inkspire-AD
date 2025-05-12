import React from 'react';
import './BookCard.css';

const BookCard = ({ image, title, author, price, originalPrice, isBestseller, isAwardWinner, isNewRelease, newArrival, commingSoon }) => {
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
        <div className="book-tags">
          {isBestseller && <span className="book-tag bestseller">Bestseller</span>}
          {isAwardWinner && <span className="book-tag award">Award Winner</span>}
          {isNewRelease && <span className="book-tag new">New Release</span>}
          {newArrival && <span className="book-tag arrival">New Arrival</span>}
          {commingSoon && <span className="book-tag soon">Coming Soon</span>}
        </div>
          
      </div>
    </div>
  );
};

export default BookCard;
