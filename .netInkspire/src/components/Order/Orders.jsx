import React, { useEffect, useState } from 'react';
import './Order.css';
import { toast } from 'react-toastify';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const token = sessionStorage.getItem('authToken');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('https://localhost:7188/api/Order/user-history', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        toast.error("Unable to load orders.");
      }
    };

    fetchOrders();
  }, [token]);

  const cancelOrder = async (claimCode) => {
    try {
      const res = await fetch('https://localhost:7188/api/Order/cancel', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(claimCode)
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      toast.success(result.message);
      setOrders((prev) =>
        prev.map(o => o.claimCode === claimCode ? { ...o, status: 'Cancelled' } : o)
      );
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="orders-wrapper">
      <h1 className="orders-title">Orders</h1>

      {orders.map((order) => (
        <div key={order.orderId} className="order-section">
          <div className="order-row">
            <div className={`order-status ${order.status.toLowerCase()}`}>
              {order.status}
            </div>

            <div className="order-content">
              <div className="claim-label">Claim Code</div>
              <div className="claim-code">{order.claimCode}</div>

              <div className="book-list">
                {order.books.map((book, i) => (
                  <div key={i} className="book-item">
                    <div><strong>{book.title}</strong></div>
                    <div>Quantity: {book.quantity}</div>
                  </div>
                ))}
              </div>

              <div>Total: ${order.finalAmount.toFixed(2)}</div>
              <div>Date: {new Date(order.orderDate).toLocaleDateString()}</div>
            </div>

            {order.status !== 'Completed' && order.status !== 'Cancelled' && (
              <button className="cancel-button" onClick={() => cancelOrder(order.claimCode)}>
                Cancel
              </button>
            )}
          </div>

        </div>
      ))}
    </div>
  );
}
