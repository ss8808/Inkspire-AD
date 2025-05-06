// src/components/ServicePage/ServiceDescription.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import './ServiceDescription.css';
import Navigation from '../HomePage/Navigation';
// import { useCart } from '../../context/CartContext'; // ✅ import context
// import { useCart,useNavigate} from '../../context/useCart';
import { useCart } from '../context/useCart';
import { useNavigate } from 'react-router-dom'; // ✅ this is from react-router


const ServiceDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {};
  // const { addToCart } = useCart(); // ✅ use context
  const { addToCart, cartItems } = useCart(); // ✅ includes cartItems now

  const alreadyInCart = cartItems.find((item) => item.id === book.id);

  if (!book) {
    return <p className="error-message">Book not found. Please go back and select a book.</p>;
  }

  return (
    <>
      <Navigation />
      <section className="service-page">
        <div className="service-container">
          <div className="service-hero">
            <div className="image-wrapper">
              <img src={book.image} alt={book.title} className="service-cover" />
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

              <div className="actions">
                <button className="start-button">Start reading</button>
                <button className="bookmark-button">🔖</button>
              </div>

              <div className="secondary-actions">
                {/* <button className="cart-button" disabled={alreadyInCart}  onClick={() => addToCart(book)}> */}
                {/* 🛒 {alreadyInCart ? 'Added' : 'Add to Cart'} */}
                {/* </button> */}
                <button
                  className="cart-button"
                  disabled={alreadyInCart}
                  onClick={() => {
                    if (!alreadyInCart) {
                      addToCart(book);
                      navigate('/cart'); // ✅ redirect to cart
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
            <div className="author-icon">{book.author?.charAt(0)}</div>
            <div>
              <h4>{book.author}</h4>
              <p className="availability">Enjoy this story for free, available now for a limited time!</p>
            </div>
          </div>

          <p className="description">
            As they leave the human city, an air car cuts past, out-racing them to discover their next heist.
            The crystals inside it are said to unlock ancient secrets that could change everything.
          </p>
        </div>
      </section>
    </>
  );
};

export default ServiceDescription;