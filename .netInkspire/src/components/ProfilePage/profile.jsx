import React, { useState } from 'react';
import './profile.css';
import Navigation from '../HomePage/Navigation';

const Profile = () => {
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [memberId, setMemberId] = useState('');

  const handleEdit = () => {
    // You can send this to backend or log it
    console.log('Updated Info:', { name, email, memberId });
    alert('Profile updated!');
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account?');
    if (confirmDelete) {
      // Add deletion logic here
      console.log('Account deleted');
      alert('Account deleted');
    }
  };

  return (
    <div className="profile-page">
      <Navigation />
      <div className="profile-content">
        <div className="profile-box">
          <h1>Profile Settings</h1>

          <section className="form-section">
            <h2>Personal Details</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="memberId">Membership ID</label>
              <input
                type="text"
                id="memberId"
                placeholder="Enter your ID"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
              />

              <button type="button" className="orange-button full-width" onClick={handleEdit}>
                Edit
              </button>
            </form>
          </section>

          <section className="form-section">
            <h2>Change Password</h2>
            <button className="orange-button full-width">Change Password</button>
          </section>

          <section className="form-section">
            <h2>Delete Account</h2>
            <button className="delete-button full-width" onClick={handleDelete}>
              Delete Account
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
