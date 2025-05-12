import React, { useEffect, useState } from 'react';
import './BookMark.css';
import { getUserIdFromToken, getToken } from '../../utils/auth';
import Navigation from '../HomePage/Navigation';
import { Link } from 'react-router-dom';

const BookMark = () => {
  const userId = getUserIdFromToken();
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const res = await fetch(`http://localhost:5136/api/Bookmark/${userId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      if (!res.ok) throw new Error('Failed to fetch bookmarks');
      const data = await res.json();
      setBookmarks(data);
    } catch (err) {
      console.error(err.message);
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
