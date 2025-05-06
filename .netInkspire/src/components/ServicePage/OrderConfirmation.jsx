// src/components/Checkout/OrderConfirmation.jsx
import React from 'react';
import { useCart } from '../context/useCart';
import Navigation from '../HomePage/Navigation';
// import './OrderConfirmation.css';

import './orderConfirmation.css';


const OrderConfirmation = () => {
  const { cartItems } = useCart();
  const total = cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  return (
    <>
      <Navigation />
      <div className="confirmation-container">
        <div className="confirmation-box">
          <h1 className="confirmation-header">✅ Order Confirmed</h1>
          <p className="confirmation-subtext">Thank you! Your order has been placed.</p>
          <p className="confirmation-subtext">A confirmation email has been sent to <strong>johndoe@example.com</strong></p>

          <h2 className="summary-heading">🧾 Order Summary</h2>
          <div className="summary-list">
            {cartItems.map((item) => (
              <div key={item.id} className="summary-row">
                <img src={item.image} alt={item.title} className="summary-img" />
                <div className="summary-details">
                  <h4>{item.title}</h4>
                  <p>Author: {item.author}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${Number(item.price).toFixed(2)}</p>
                  <p><strong>Subtotal: ${(Number(item.price) * item.quantity).toFixed(2)}</strong></p>
                </div>
              </div>
            ))}
          </div>

          <div className="summary-boxes">
            <div className="summary-box">
              <h4>Claim Code</h4>
              <p><strong>ABC123</strong></p>
            </div>
            <div className="summary-box">
              <h4>Pickup Instructions</h4>
              <p>Please pick up your order at the store</p>
            </div>
          </div>

          <h2 className="summary-total">Total: ${total.toFixed(2)}</h2>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;
