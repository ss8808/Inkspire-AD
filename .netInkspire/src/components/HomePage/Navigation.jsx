// src/HomePage/Navigation.jsx
import React from 'react';
import './Navigation.css';
import { BookIcon } from '../../assets/Icons';
import { FaBookmark } from 'react-icons/fa'; // ✅ import icon
import { Link } from 'react-router-dom'; // ✅ use Link for SPA routing
import { FaBullhorn } from 'react-icons/fa';

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="logo">
        <BookIcon />
        <h1>Inkspire</h1>
      </div>
      <div className="nav-links">
        <Link to="/" className="active">Home</Link>
        <Link to="/Register">Register</Link>
        <Link to="/Login">Login</Link>
        <Link to="/MyOrders">Orders</Link>
        <Link to="/bookmarks">
          <FaBookmark style={{ marginRight: '6px' }} />
        </Link>
        <Link to="/announcements">
          <FaBullhorn style={{ marginRight: '6px' }} />
        </Link>

      </div>
    </nav>
  );
};

export default Navigation;
