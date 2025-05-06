import React, { useState } from 'react';
import './Review.css';
import { FaStar } from 'react-icons/fa';
import bookCover from '../../assets/img/Bear_AU.jpg';

const Review = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Review submitted:', {
      rating,
      reviewText
    });
    alert('Thank you for your review!');
  };

  return (
    <div className="review-container">

      <div className="review-box">
        <h1>Write a Review</h1>

        <div className="book-info">
        <img src={bookCover} alt="Book cover" />
          <div>
            <h3>Where the Crawdads Sing</h3>
            <p>Delia Owens</p>
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < rating ? 'star filled' : 'star'}
                  onClick={() => setRating(i + 1)}
                />
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Review</label>
          <textarea
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default Review;
