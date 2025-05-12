import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ServiceDescription.css';
import Navigation from '../HomePage/Navigation';
import { useCart } from '../context/useCart';
import { toast } from 'react-toastify';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';

const ServiceDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {};
  const { addToCart, cartItems } = useCart();

  const token = sessionStorage.getItem('authToken');
  const userId = sessionStorage.getItem('userId');
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);
  const [loadingBookmarkStatus, setLoadingBookmarkStatus] = useState(true);
  const [bookmarkActionLoading, setBookmarkActionLoading] = useState(false);

  const alreadyInCart = cartItems.find((item) => item.id === book.id);

  useEffect(() => {
    if (!book || !userId || !token) return;

    const fetchBookmarkStatus = async () => {
      try {
        const res = await fetch(`http://localhost:5136/api/Bookmark/${userId}`, {
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

    fetchBookmarkStatus();
  }, [book, userId, token]);

  const handleBookmarkToggle = async () => {
    if (!userId || !token) {
      toast.error("You must be logged in.");
      navigate('/login');
      return;
    }

    // 🛡️ Prevent toggle until initial bookmark status is loaded
    if (loadingBookmarkStatus) {
      toast.info("Please wait, checking bookmark status...");
      return;
    }

    try {
      setBookmarkActionLoading(true);

      if (bookmarked && bookmarkId) {
        const res = await fetch(`http://localhost:5136/api/Bookmark/${bookmarkId}/user/${userId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error(await res.text());

        toast.success("Bookmark removed.");
        setBookmarked(false);
        setBookmarkId(null);
      } else {
        const res = await fetch(`http://localhost:5136/api/Bookmark/${userId}`, {
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

  if (!book) {
    return <p className="error-message">Book not found.</p>;
  }

  return (
    <>
      <Navigation />
      <section className="service-page">
        <div className="service-container">
          <div className="service-hero">
            <div className="image-wrapper">
              <img
                src={`http://localhost:5136/${book.coverImageUrl}`}
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
                  disabled={alreadyInCart}
                  onClick={() => {
                    if (!alreadyInCart) {
                      addToCart(book);
                      navigate('/cart');
                    }
                  }}
                >
                  🛒 {alreadyInCart ? 'Added' : 'Add to Cart'}
                </button>
                <button className="guidelines-button">📘 Content Guidelines</button>
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
