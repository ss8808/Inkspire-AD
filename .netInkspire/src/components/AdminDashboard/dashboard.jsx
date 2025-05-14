import React, { useState } from 'react';
import './Dashboard.css';
import { FaBars } from 'react-icons/fa';
import Sidebar from './Sidebar';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    if (window.innerWidth < 992) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />

      {/* Main content */}
      <div className="main-content">
        <div className="top-bar">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>

        <h1>Admin Dashboard</h1>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="card">
            <p>Books in Stock</p>
            <h2>245</h2>
          </div>
          <div className="card">
            <p>Recent Orders</p>
            <h2>18</h2>
          </div>
          <div className="card">
            <p>Discounts Applied</p>
            <h2>5</h2>
          </div>
          <div className="card">
            <p>Active Announcements</p>
            <h2>2</h2>
          </div>
        </div>

        {/* Main Grid */}
        <div className="main-grid">
          {/* Chart Section */}
          <div className="chart">
            <p>Book Stock Status</p>
            <div className="chart-bars">
              <div className="bar-container">
                <div className="bar" style={{ height: '80%', backgroundColor: '#ff6b00' }}></div>
              </div>
              <div className="bar-container">
                <div className="bar" style={{ height: '60%', backgroundColor: '#ff8c3a' }}></div>
              </div>
              <div className="bar-container">
                <div className="bar" style={{ height: '90%', backgroundColor: '#ffad70' }}></div>
              </div>
              <div className="bar-container">
                <div className="bar" style={{ height: '50%', backgroundColor: '#ffcca8' }}></div>
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="orders">
            <p>Recent Orders</p>
            <ul>
              <li>#1049 – Apr 14, 2024 – $18.98</li>
              <li>#1048 – Apr 13, 2024 – $34.97</li>
              <li>#1047 – Apr 13, 2024 – $50.85</li>
            </ul>
          </div>
        </div>

        {/* Announcements Section */}
        <div className="announcements">
          <p>Active Announcements</p>
          <div className="announcement-list">
            <div className="announcement-item">
              <div className="announcement-icon">!</div>
              <div className="announcement-content">
                <p className="announcement-title">Summer Sale</p>
                <p className="announcement-desc">All books 20% off</p>
              </div>
            </div>
            <div className="announcement-item">
              <div className="announcement-icon">!</div>
              <div className="announcement-content">
                <p className="announcement-title">New Arrivals</p>
                <p className="announcement-desc">Added 15 new titles</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
