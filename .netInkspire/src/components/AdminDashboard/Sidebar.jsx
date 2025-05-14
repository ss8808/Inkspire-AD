import React from 'react';
import './Dashboard.css';
import {
  FaTachometerAlt,
  FaBook,
  FaShoppingCart,
  FaBullhorn,
  FaPercentage
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ sidebarOpen, closeSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    alert("Logged out successfully");
    navigate('/login');
  };

  return (
    <>
      {sidebarOpen && <div className="sidebar-backdrop" onClick={closeSidebar}></div>}

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
              <a href="/add-announcement">
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

        <button className="logout" onClick={handleLogout} style={{ marginTop: 'auto' }}>
          Logout
        </button>
      </aside>
    </>
  );
}