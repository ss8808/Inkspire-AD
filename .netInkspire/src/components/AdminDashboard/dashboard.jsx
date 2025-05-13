import React, { useState } from 'react';
import './Dashboard.css';
import {
  FaTachometerAlt,
  FaBook,
  FaShoppingCart,
  FaBullhorn,
  FaPercentage,
  FaBars
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear session data
    sessionStorage.clear();
    // In a real app this would redirect to login
    alert("Logged out successfully");
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when clicking outside on mobile
  const closeSidebar = () => {
    if (window.innerWidth < 992) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={closeSidebar}></div>
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="logo">Inkspire</div>
        
        <nav>
          <ul>
            <li className="active">
              <a href="/admin">
                <FaTachometerAlt className="sidebar-icon" />
                Dashboard
              </a>
            </li>
            <li>
              <a href="/book-management">
                <FaBook className="sidebar-icon" />
                Manage Books
              </a>
            </li>
            <li>
              <a href="/order-tracker">
                <FaShoppingCart className="sidebar-icon" />
                Manage Orders
              </a>
            </li>
            <li>
              <a href="/book-management">
                <FaBullhorn className="sidebar-icon" />
                Manage Announcements
              </a>
            </li>
            <li>
              <a href="/discount">
                <FaPercentage className="sidebar-icon" />
                Manage Discount
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="main-content">
        <div className="top-bar">
          {/* Mobile menu button */}
          <button className="menu-toggle" onClick={toggleSidebar}>
            <FaBars />
          </button>
          
          <button className="logout" onClick={handleLogout}>
            Logout
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

        {/* Announcements Section (in a separate row) */}
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