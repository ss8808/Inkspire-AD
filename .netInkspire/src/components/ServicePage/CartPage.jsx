import React, { useEffect, useState } from 'react';
import Navigation from '../HomePage/Navigation';
import './CartPage.css';
import { useNavigate } from 'react-router-dom';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'react-toastify';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = sessionStorage.getItem('authToken');
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    if (!token || !userId) {
      toast.error("Please log in to view your cart.");
      navigate('/login');
      return;
    }

    fetchCart();
  }, [token, userId]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://localhost:7188/api/Cart/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to fetch cart');

      const cartData = await res.json();

      const detailedItems = await Promise.all(
        cartData.items.map(async (item) => {
          const bookRes = await fetch(`https://localhost:7188/api/Book/${item.bookId}`);
          if (!bookRes.ok) throw new Error('Failed to fetch book details');
          const book = await bookRes.json();
          return { ...book, quantity: item.quantity };
        })
      );

      setCartItems(detailedItems);
    } catch (err) {
      console.error('Error fetching cart:', err.message);
      toast.error("Unable to load cart.");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (bookId, newQty) => {
    try {
      await fetch(`https://localhost:7188/api/Cart/${userId}/item`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId, quantity: newQty }),
      });

      setCartItems((prev) =>
        prev.map((item) =>
          item.id === bookId ? { ...item, quantity: newQty } : item
        )
      );
    } catch (err) {
      console.error("Failed to update quantity:", err.message);
    }
  };

  const removeItem = async (bookId) => {
    try {
      await fetch(`https://localhost:7188/api/Cart/${userId}/item/${bookId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      setCartItems((prev) => prev.filter((item) => item.id !== bookId));
      toast.success("Item removed from cart.");
    } catch (err) {
      console.error("Error removing item:", err.message);
      toast.error("Failed to remove item.");
    }
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = totalItems >= 5 ? subtotal * 0.05 : 0;
  const total = subtotal - discount;

  return (
    <>
      <Navigation />
      <div className="cart-wrapper">
        <div className="cart-left">
          <h1 className="cart-heading">Your Cart</h1>
          <p className="cart-subheading">Review your selected books before placing the order.</p>

          {loading ? (
            <div className="loading-spinner">
              <ImSpinner2 className="spinner" />
              <p>Loading your cart...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <p>No items in cart. Please go back and add something.</p>
          ) : (
            cartItems.map((item) => (
              <div className="cart-row" key={item.id}>
                <img src={`https://localhost:7188/${item.coverImageUrl}`} alt={item.title} className="cart-img" />
                <div className="cart-details">
                  <h3>{item.title}</h3>
                  <p>{item.author}</p>
                  <p className="cart-price">${item.price.toFixed(2)}</p>
                </div>
                <div className="cart-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <button className="remove" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-right">
            <div className="summary-box">
              <h2>Order Summary</h2>
              <p>Total Items: {totalItems}</p>
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>Discount (5%): –${discount.toFixed(2)}</p>
              <hr />
              <p><strong>Total: ${total.toFixed(2)}</strong></p>
              <button className="checkout-btn" onClick={() => navigate('/order-confirmation')}>
                Proceed to Checkout
              </button>
              {totalItems >= 5 && (
                <p className="discount-note">
                  🎉 You've qualified for a 5% discount by adding 5 or more books!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
