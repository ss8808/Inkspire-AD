import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ServiceDescription.css';
import Navigation from '../HomePage/Navigation';
import { useCart } from '../context/useCart';

const ServiceDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {}; // Get the book data passed from the previous page
  const { addToCart, cartItems } = useCart(); // Assuming you have a cart context
  const userId = sessionStorage.getItem('userId'); // Get user ID from sessionStorage
  const token = sessionStorage.getItem('authToken'); // Get auth token from sessionStorage
  const [bookmarked, setBookmarked] = useState(false); // Track if the book is bookmarked

  // If no book data is provided, show an error message
  if (!book) {
    return <p className="error-message">Book not found. Please go back and select a book.</p>;
  }

  // Check if the book is already in the cart
  const alreadyInCart = cartItems.find((item) => item.id === book.id);

  // Function to handle bookmarking the book
  const handleBookmark = async () => {
    // Check if user is logged in
    if (!userId || !token) {
      console.log('User not logged in:', { userId, token });
      alert("You must be logged in to bookmark this book.");
      return;
    }

    try {
      // Send POST request to the backend to add the book to bookmarks
      const res = await fetch(`http://localhost:5136/api/Bookmark/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Send the token for authentication
        },
        body: JSON.stringify({ bookId: book.id }) // Send the bookId in the request body
      });

      if (!res.ok) {
        throw new Error(await res.text()); // If response is not OK, throw an error
      }

      setBookmarked(true); // Mark the book as bookmarked
      alert("Bookmarked successfully!"); // Show success message
    } catch (err) {
      alert(err.message); // Show error if something goes wrong
    }
  };

  return (
    <>
      <Navigation />
      <section className="service-page">
        <div className="service-container">
          <div className="service-hero">
            <div className="image-wrapper">
              <img src={`http://localhost:5136/${book.coverImageUrl}`} alt={book.title} className="service-cover" />
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
                <button className="bookmark-button" onClick={handleBookmark} disabled={bookmarked}>
                  🔖 {bookmarked ? 'Bookmarked' : 'Bookmark'}
                </button>
              </div>

              <div className="secondary-actions">
                <button className="cart-button" disabled={alreadyInCart} onClick={() => {
                  if (!alreadyInCart) {
                    addToCart(book); // Add the book to cart
                    navigate('/cart');
                  }
                }}>
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

          <p className="description">
            {book.description || "No description available."}
          </p>
        </div>
      </section>
    </>
  );
};

export default ServiceDescription;
