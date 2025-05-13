// src/components/Announcement Page/UserAnnouncements.jsx
import React, { useEffect, useState } from 'react';
import './UserAnnouncements.css';
// import Navigation from '../HomePage/Navigation';

const UserAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7188/api/Announcement')
      .then(res => res.json())
      .then(data => setAnnouncements(data))
      .catch(err => console.error('Error fetching announcements:', err));
  }, []);

  return (
    <>
      {/* <Navigation /> */}
      <div className="user-announcement-page">
        <h2>📢 Announcements</h2>
        {announcements.length === 0 ? (
          <p>No announcements available.</p>
        ) : (
          <div className="announcement-list">
            {announcements.map((a) => (
              <div key={a.id} className="announcement-card">
                <h3>{a.title}</h3>
                <p>{a.content}</p>
                <small>
                  {new Date(a.startDate).toLocaleDateString()} - {new Date(a.endDate).toLocaleDateString()}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UserAnnouncements;
