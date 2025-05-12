// AdminNavbar.jsx
import React from 'react';
import './AdminNavbar.css';

function AdminNavbar({ onLogout }) {
  return (
    <header className="admin-topbar">
      <div className="admin-logo">Inkspire</div>
      <button className="admin-logout" onClick={onLogout}>Logout</button>
    </header>
  );
}

export default AdminNavbar;
