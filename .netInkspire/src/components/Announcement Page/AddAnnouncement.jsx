import React, { useState } from 'react';
import './AddAnnouncement.css';
import AdminNavbar from '../AdminDashboard/AdminNavbar';

const AddAnnouncement = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !message || !startDate || !endDate) {
      alert('Please fill in all fields.');
      return;
    }

    const dto = {
      title,
      content: message,
      startDate,
      endDate,
      isActive: true
    };

    console.log('Payload:', dto);
    setLoading(true);

    try {
      const response = await fetch('https://localhost:7188/api/Announcement', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(dto)
});


      if (response.ok) {
        alert('✅ Announcement added successfully!');
        setTitle('');
        setMessage('');
        setStartDate('');
        setEndDate('');
      } else {
        let errorMessage = 'Unknown error occurred.';
        try {
          const err = await response.json();
          errorMessage = err.message || errorMessage;
        } catch {
          errorMessage = `HTTP ${response.status} - ${response.statusText}`;
        }
        console.error('Error:', errorMessage);
        alert(`❌ Failed to create announcement. Reason: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Submission Error:', error);
      alert('❌ Server error. Check the console or try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="announcement-page">
      <AdminNavbar />
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
            />
          </div>

          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <button className="submit-button" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Submitting...' : 'Add Announcement'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAnnouncement;
