import React, { useState } from 'react';
import './AddAnnouncement.css';
import Navigation from '../HomePage/Navigation';

const AddAnnouncement = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = () => {
    if (title && message && startDate && endDate) {
      console.log('Announcement Submitted:', {
        title,
        message,
        startDate,
        endDate,
      });

      // Reset form
      setTitle('');
      setMessage('');
      setStartDate('');
      setEndDate('');
    }
  };

  return (
    <div className="announcement-page">
      <Navigation />
      <div className="announcement-container">
        <div className="announcement-box">
          <h1>Add Announcement</h1>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows="6"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Start Date</label>
            <input
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start Date"
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input
              type="text"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End Date"
            />
          </div>

          <button className="submit-button" onClick={handleSubmit}>
            Add Announcement
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAnnouncement;
