import React, { useEffect, useState } from 'react';
import './ManageAnnouncement.css';
import AdminNavbar from '../AdminDashboard/AdminNavbar';
import { toast } from 'react-toastify';

const ManageAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch('https://localhost:7188/api/Announcement');
      const data = await res.json();
      setAnnouncements(data);
    } catch (error) {
      toast.error('Failed to fetch announcements.');
    }
  };

  const deleteAnnouncement = async (id) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) return;

    try {
      const res = await fetch(`https://localhost:7188/api/Announcement/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        toast.success('Announcement deleted!');
        fetchAnnouncements();
      } else {
        toast.error('Failed to delete announcement.');
      }
    } catch (error) {
      toast.error('Error deleting announcement.');
    }
  };

  return (
    <div className="announcement-page">
      <AdminNavbar />
      <div className="announcement-container">
        <h1>Manage Announcements</h1>
        {announcements.length === 0 ? (
          <p>No announcements found.</p>
        ) : (
          <table className="announcement-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Message</th>
                <th>Start</th>
                <th>End</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((a) => (
                <tr key={a.id}>
                  <td>{a.title}</td>
                  <td>{a.content}</td>
                  <td>{new Date(a.startDate).toLocaleDateString()}</td>
                  <td>{new Date(a.endDate).toLocaleDateString()}</td>
                  <td>{a.isActive ? '✅' : '❌'}</td>
                  <td>
                    {/* You can route to edit page later */}
                    <button className="delete-btn" onClick={() => deleteAnnouncement(a.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageAnnouncement;
