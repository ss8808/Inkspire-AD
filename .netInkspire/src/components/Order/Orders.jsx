import React, { useState } from 'react';
import './Order.css';

export default function Orders() {
  const [orders, setOrders] = useState({
    pending: ['73P6-KDV2QM'],
    cancelled: ['9YVJ-4XQNHC'],
    fulfilled: ['RKZ8-JJFNRE'],
  });

  const cancelOrder = (code) => {
    setOrders((prev) => ({
      pending: prev.pending.filter((c) => c !== code),
      cancelled: [...prev.cancelled, code],
      fulfilled: prev.fulfilled,
    }));
  };

  return (
    <div className="orders-wrapper">
      <h1 className="orders-title">Orders</h1>

      <div className="order-section">
        <div className="order-row">
          <div className="order-status pending">Pending</div>
          <div className="order-content">
            <div className="claim-label">Claim Code</div>
            <div className="claim-code">{orders.pending[0]}</div>
          </div>
          <button className="cancel-button" onClick={() => cancelOrder(orders.pending[0])}>
            Cancel
          </button>
        </div>
      </div>

      <div className="divider"></div>

      <div className="order-section">
        <div className="order-row">
          <div className="order-status">Cancelled</div>
          <div className="claim-code">{orders.cancelled[0]}</div>
        </div>
      </div>

      <div className="divider"></div>

      <div className="order-section">
        <div className="order-row">
          <div className="order-status">Fulfilled</div>
          <div className="claim-code">{orders.fulfilled[0]}</div>
        </div>
      </div>
    </div>
  );
}
