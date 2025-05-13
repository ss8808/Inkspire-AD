import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ServiceDescription.css';
import Navigation from '../HomePage/Navigation';
import { toast } from 'react-toastify';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';

const ServiceDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {};

  const token = sessionStorage.getItem('authToken');
  const userId = sessionStorage.getItem('userId');

  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);
  const [loadingBookmarkStatus, setLoadingBookmarkStatus] = useState(true);
  const [bookmarkActionLoading, setBookmarkActionLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [alreadyInCart, setAlreadyInCart] = useState(false);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    if (!book || !userId || !token) return;

    const fetchBookmarkStatus = async () => {
      try {
        const res = await fetch(`https://localhost:7188/api/Bookmark/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          const existing = data.data?.find((bm) => bm.bookId === book.id);
          if (existing) {
            setBookmarked(true);
            setBookmarkId(existing.id);
          }
        }
      } catch (err) {
        console.error("Bookmark check failed:", err);
      } finally {
        setLoadingBookmarkStatus(false);
      }
    };

    const checkIfReviewed = async () => {
      try {
        const res = await fetch(`https://localhost:7188/api/Review/has-reviewed/${book.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
          const result = await res.json();
          setHasReviewed(result.hasReviewed);
        }
      } catch (err) {
        console.error("Failed to check review status:", err.message);
      }
    };

    fetchBookmarkStatus();
    checkIfReviewed();
  }, [book, userId, token]);

  const handleBookmarkToggle = async () => {
    if (!userId || !token) {
      toast.error("You must be logged in.");
      navigate('/login');
      return;
    }

    if (loadingBookmarkStatus) {
      toast.info("Please wait, checking bookmark status...");
      return;
    }

    try {
      setBookmarkActionLoading(true);

      if (bookmarked && bookmarkId) {
        const res = await fetch(`https://localhost:7188/api/Bookmark/${bookmarkId}/user/${userId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error(await res.text());

        toast.success("Bookmark removed.");
        setBookmarked(false);
        setBookmarkId(null);
      } else {
        const res = await fetch(`https://localhost:7188/api/Bookmark/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ bookId: book.id })
        });

        if (!res.ok) {
          const errMsg = await res.text();
          throw new Error(errMsg || 'Failed to bookmark');
        }

        const result = await res.json();
        setBookmarked(true);
        setBookmarkId(result.id);
        toast.success("Bookmarked successfully!");
      }
    } catch (err) {
      toast.error(err.message);
      console.error("Bookmark toggle error:", err.message);
    } finally {
      setBookmarkActionLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!userId || !token) {
      toast.error("Please log in to add to cart.");
      navigate('/login');
      return;
    }

    try {
      setAddingToCart(true);
      const res = await fetch(`https://localhost:7188/api/Cart/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ bookId: book.id, quantity: 1 })
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to add to cart");
      }

      toast.success("Book added to cart!");
      setAlreadyInCart(true);
      navigate('/cart');
    } catch (err) {
      console.error("Add to cart error:", err.message);
      toast.error("Could not add to cart.");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!token || !userId) {
      toast.error('Please log in to submit a review.');
      navigate('/login');
      return;
    }

    try {
      setSubmittingReview(true);
      const res = await fetch('https://localhost:7188/api/Review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          bookId: book.id,
          rating,
          comment
        })
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Failed to submit review');
      }

      toast.success("Thank you! Your review was submitted.");
      setShowReviewForm(false);
      setComment('');
      setRating(5);
      setHasReviewed(true);
    } catch (err) {
      console.error('Review error:', err.message);
      toast.error(err.message);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (!book) return <p className="error-message">Book not found.</p>;

  return (
    <>
      <Navigation />
      <section className="service-page">
        <div className="service-container">
          <div className="service-hero">
            <div className="image-wrapper">
              <img
                src={`https://localhost:7188/${book.coverImageUrl}`}
                alt={book.title}
                className="service-cover"
              />
            </div>

            <div className="service-info">
              <h1>{book.title}</h1>
              <p className="price">${book.price}</p>

              <div className="metrics">
                <span><strong>368k</strong> Reads</span>
                <span><strong>35.9k</strong> Parts</span>
                <span><strong>6</strong> Chapters</span>
                <span><strong>1 hr 21 min</strong></span>
              </div>

              <div className="book-tags">
                {book.isBestseller && <span className="book-tag bestseller">Bestseller</span>}
                {book.isAwardWinner && <span className="book-tag award">Award Winner</span>}
                {book.isNewRelease && <span className="book-tag new">New Release</span>}
                {book.newArrival && <span className="book-tag arrival">New Arrival</span>}
                {book.commingSoon && <span className="book-tag soon">Coming Soon</span>}
              </div>

              <div className="actions">
                <button className="start-button">Start reading</button>
                {loadingBookmarkStatus ? (
                  <button className="bookmark-button" disabled>
                    <ImSpinner2 className="spinner" />
                    <span style={{ marginLeft: '8px' }}>Checking...</span>
                  </button>
                ) : (
                  <button
                    className="bookmark-button"
                    onClick={handleBookmarkToggle}
                    disabled={bookmarkActionLoading}
                  >
                    {bookmarkActionLoading ? (
                      <ImSpinner2 className="spinner" />
                    ) : bookmarked ? (
                      <FaHeart color="red" />
                    ) : (
                      <FaRegHeart />
                    )}
                    <span style={{ marginLeft: '8px' }}>
                      {bookmarked ? 'Bookmarked' : 'Bookmark'}
                    </span>
                  </button>
                )}
              </div>

              <div className="secondary-actions">
                <button
                  className="cart-button"
                  disabled={addingToCart || alreadyInCart}
                  onClick={handleAddToCart}
                >
                  {addingToCart ? (
                    <>
                      <ImSpinner2 className="spinner" />
                      Adding...
                    </>
                  ) : (
                    `🛒 ${alreadyInCart ? 'Added' : 'Add to Cart'}`
                  )}
                </button>
                <button className="guidelines-button">📘 Content Guidelines</button>
              </div>

              {/* Review Section */}
              <div className="review-section">
                <button
                  className="review-btn"
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  disabled={hasReviewed}
                >
                  ✍️ {hasReviewed ? 'Review Submitted' : showReviewForm ? 'Cancel Review' : 'Leave a Review'}
                </button>

                {showReviewForm && (
                  <div className="review-form">
                    <label>
                      Rating:
                      <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                        {[5, 4, 3, 2, 1].map(r => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </label>

                    <label>
                      Comment:
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows="4"
                        placeholder="Write your thoughts..."
                      />
                    </label>

                    <button
                      className="submit-review-btn"
                      onClick={handleSubmitReview}
                      disabled={submittingReview}
                    >
                      {submittingReview ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="service-author">
            <div className="author-icon">{book.authorName?.charAt(0)}</div>
            <div>
              <h4>{book.authorName}</h4>
              <p className="availability">Enjoy this story for free, available now for a limited time!</p>
            </div>
          </div>

          <p className="description">{book.description || "No description available."}</p>
        </div>
      </section>
    </>
  );
};

export default ServiceDescription;
