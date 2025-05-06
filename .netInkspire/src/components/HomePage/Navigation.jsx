// src/HomePage/Navigation.jsx
import React from 'react';
import './Navigation.css';
import { BookIcon } from '../../assets/Icons';

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="logo">
        <BookIcon />
        <h1>Inkspire</h1>
      </div>
      <div className="nav-links">
        <a href="/" className="active">Home</a>
        <a href="/Register">Register</a>
        <a href="/Login">Login</a>
        <a href="/about">About</a>
      </div>
    </nav>
  );
};

export default Navigation;