import React from 'react';
// import './CartPage.css';
import Navigation from '../HomePage/Navigation';
import { useCart } from '../context/useCart'; // ✅ FIXED: correct file for useCart
import { useNavigate } from 'react-router-dom';
import './CartPage.css';




const CartPage = () => {
  const { cartItems, incrementQty, decrementQty, removeFromCart } = useCart();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = totalItems >= 5 ? subtotal * 0.05 : 0;
  const total = subtotal - discount;
  const navigate = useNavigate();


  return (
    <>
      <Navigation />
      <div className="cart-wrapper">
        <div className="cart-left">
          <h1 className="cart-heading">Your Cart</h1>
          <p className="cart-subheading">Review your selected books before placing the order.</p>

          {cartItems.length === 0 ? (
            <p>No items in cart. Please go back and add something.</p>
          ) : (
            cartItems.map((item) => (
              <div className="cart-row" key={item.id}>
                <img src={item.image} alt={item.title} className="cart-img" />
                <div className="cart-details">
                  <h3>{item.title}</h3>
                  <p>{item.author}</p>
                  <p className="cart-price">${Number(item.price).toFixed(2)}</p>
                </div>
                <div className="cart-controls">
                  <button onClick={() => decrementQty(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementQty(item.id)}>+</button>
                </div>
                <button className="remove" onClick={() => removeFromCart(item.id)}>Remove</button>
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
