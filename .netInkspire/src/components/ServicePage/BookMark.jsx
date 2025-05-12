import React, { useEffect, useState } from 'react';
import './BookMark.css';
import Navigation from '../HomePage/Navigation';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const BookMark = () => {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);
  const token = sessionStorage.getItem('authToken');
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    if (!token || !userId) {
      toast.error("Please log in to view bookmarks.");
      navigate('/login');
      return;
    }

    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const res = await fetch(`http://localhost:5136/api/Bookmark/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Failed to fetch bookmarks');

      const result = await res.json();

      if (result?.data) {
        setBookmarks(result.data);
      } else {
        setBookmarks([]);
      }
    } catch (err) {
      console.error(err.message);
      toast.error("Failed to load bookmarks.");
    }
  };

  return (
    <>
      <Navigation />
      <div className="bookmark-page">
        <h2>Your Bookmarked Books</h2>
        <div className="bookmark-grid">
          {bookmarks.length > 0 ? (
            bookmarks.map((bm) => (
              <Link
                key={bm.bookId}
                to={`/service/${bm.bookId}`}
                state={{ book: { id: bm.bookId } }}
                className="bookmark-card"
              >
                <p>📖 Book ID: {bm.bookId}</p>
                <p>📌 Bookmarked: {new Date(bm.createdAt).toLocaleString()}</p>
              </Link>
            ))
          ) : (
            <p>No bookmarks found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BookMark;
