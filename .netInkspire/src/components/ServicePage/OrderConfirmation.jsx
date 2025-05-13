// src/components/Checkout/OrderConfirmation.jsx
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/useCart';
import Navigation from '../HomePage/Navigation';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './orderConfirmation.css';


const OrderConfirmation = () => {
  const { cartItems, clearCart } = useCart();
  const [orderInfo, setOrderInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = sessionStorage.getItem('authToken');
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    if (!token || !userId) {
      toast.error('Please log in to confirm your order.');
      navigate('/login');
      return;
    }

    placeOrder();
  }, []);

  const placeOrder = async () => {
    try {
      const response = await fetch('https://localhost:7188/api/Order/place', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Order placement failed.');
      }

      const data = await response.json(); // { orderId, finalAmount, claimCode }
      setOrderInfo(data);
      clearCart(); // Clear cart after successful order
    } catch (err) {
      console.error('Error placing order:', err.message);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="confirmation-container">
          <div className="confirmation-box">
            <h1 className="confirmation-header">⏳ Placing your order...</h1>
            <p className="confirmation-subtext">Please wait.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="confirmation-container">
        <div className="confirmation-box">
          <h1 className="confirmation-header">✅ Order Confirmed</h1>
          <p className="confirmation-subtext">Thank you! Your order has been placed.</p>
          <p className="confirmation-subtext">A confirmation email has been sent to your inbox.</p>

          <h2 className="summary-heading">🧾 Order Summary</h2>
          <div className="summary-list">
            {cartItems.map((item) => (
              <div key={item.id} className="summary-row">
                <img src={item.coverImageUrl} alt={item.title} className="summary-img" />
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
              <p><strong>{orderInfo?.claimCode || 'Pending...'}</strong></p>
            </div>
            <div className="summary-box">
              <h4>Pickup Instructions</h4>
              <p>Please pick up your order at the store with your claim code and membership ID.</p>
            </div>
          </div>

          <h2 className="summary-total">
            Total: ${orderInfo?.finalAmount?.toFixed(2) || total.toFixed(2)}
          </h2>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;
