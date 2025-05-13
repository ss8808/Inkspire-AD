import React, { useEffect, useState } from "react";
import "./OrderTracker.css";
import Sidebar from "../AdminDashboard/Sidebar";
import { toast } from "react-toastify";

export default function OrderTracker() {
  const [orders, setOrders] = useState([]);
  const [claimCode, setClaimCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = sessionStorage.getItem("authToken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("https://localhost:7188/api/Order/all-history", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Failed to fetch order history");

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err.message);
        toast.error("Unable to load orders.");
      }
    };

    fetchOrders();
  }, [token]);

  const handleCompleteOrder = async () => {
    if (!claimCode.trim()) {
      toast.error("Please enter a claim code.");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch('https://localhost:7188/api/Order/complete', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(claimCode)
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to complete order.");

      toast.success(result.message);
      setClaimCode('');
      const refreshed = await fetch("https://localhost:7188/api/Order/all-history", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(await refreshed.json());
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const closeSidebar = () => {
    if (window.innerWidth < 992) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      <div className="main-content">
        <div className="order-tracker">
          <div className="header">
            <h1>Order Tracker</h1>
            <span className="sub-header">Staff Panel for Managing Orders</span>
          </div>

          <h2 className="subheading">Latest Successful Orders</h2>

          <div className="table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Book(s)</th>
                  <th>Member</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td>
                      {order.books.map((b, i) => (
                        <div className="book-info" key={i}>
                          <img src={`https://localhost:7188/${b.coverImageUrl}`} alt={b.title} />
                          <div>
                            <div className="book-title">{b.title}</div>
                            <div className="price">${b.price.toFixed(2)}</div>
                          </div>
                        </div>
                      ))}
                    </td>
                    <td>
                      <div className="member-name">{order.memberName}</div>
                      <div className="member-email">{order.memberEmail}</div>
                    </td>
                    <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="order-completion-panel">
            <h2>Complete Order by Claim Code</h2>
            <div className="claim-input-row">
              <input
                type="text"
                placeholder="Enter Claim Code"
                value={claimCode}
                onChange={(e) => setClaimCode(e.target.value)}
              />
              <button onClick={handleCompleteOrder} disabled={submitting} className="complete-btn">
                {submitting ? 'Processing...' : 'Mark as Completed'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
