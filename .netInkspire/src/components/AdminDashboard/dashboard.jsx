import React from 'react';
import './dashboard.css';
import {
  FaTachometerAlt,
  FaBook,
  FaShoppingCart,
  FaBullhorn,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="logo">Inkspire</h2>
        <nav>
          <ul>
            <li className="active">
              <FaTachometerAlt className="sidebar-icon" />
              Dashboard
            </li>
            <li>
              <Link to="/book-management" className="sidebar-link">
                <FaBook className="sidebar-icon" />
                Manage Books
              </Link>
            </li>
            <li>
              <FaShoppingCart className="sidebar-icon" />
              Manage Orders
            </li>
            <li>
              <FaBullhorn className="sidebar-icon" />
              Manage Announcements
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <button className="logout">Logout</button>
        </header>

        <h1>Admin Dashboard</h1>

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

        <div className="main-grid">
          <div className="chart">
            <p>Book Stock Status</p>
            <div className="bar" style={{ height: '160px' }}></div>
          </div>

          <div className="orders">
            <p>Recent Orders</p>
            <ul>
              <li>#1049 – Apr 14, 2024 – $18.98</li>
              <li>#1048 – Apr 13, 2024 – $34.97</li>
              <li>#1047 – Apr 13, 2024 – $50.85</li>
            </ul>
          </div>

          <div className="announcements">
            <p>Active Announcements</p>
            <div className="announcement-icon">!</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
