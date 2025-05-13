import React, { useEffect, useState } from 'react';
import './BookMarks.css';
import Navigation from '../HomePage/Navigation';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ImSpinner2 } from 'react-icons/im';
import { FaBookmark } from 'react-icons/fa';

const BookMarks = () => {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem('authToken');
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    if (!token || !userId) {
      toast.error("Please log in to view bookmarks.");
      navigate('/login');
      return;
    }

    fetchBookmarks();
  }, [navigate, token, userId]);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://localhost:7188/api/Bookmark/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Failed to fetch bookmarks');

      const bookmarkData = await res.json();
      console.log('Bookmarks API response:', bookmarkData);

      // ✅ Filter out any entries without valid book info
      if (Array.isArray(bookmarkData)) {
        setBookmarks(bookmarkData.filter(b => b.book));
      } else {
        setBookmarks([]);
      }
    } catch (err) {
      console.error('Error fetching bookmarks:', err.message);
      toast.error("Failed to load bookmarks.");
      setBookmarks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBookmark = async (bookmarkId) => {
    try {
      const res = await fetch(`https://localhost:7188/api/Bookmark/${bookmarkId}/user/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Failed to remove bookmark');

      setBookmarks(prev => prev.filter(bm => bm.id !== bookmarkId));
      toast.success('Bookmark removed successfully');
    } catch (err) {
      console.error('Error removing bookmark:', err.message);
      toast.error('Failed to remove bookmark');
    }
  };

  const renderEmptyState = () => (
    <div className="empty-bookmarks">
      <FaBookmark size={48} color="#cccccc" />
      <h3>No bookmarks found</h3>
      <p>Books you bookmark will appear here.</p>
      <button 
        className="browse-books-btn"
        onClick={() => navigate('/')}
      >
        Browse Books
      </button>
    </div>
  );

  return (
    <>
      <Navigation />
      <div className="bookmark-page">
        <h2>Your Bookmarked Books</h2>

        {loading ? (
          <div className="loading-spinner">
            <ImSpinner2 className="spinner" />
            <p>Loading your bookmarks...</p>
          </div>
        ) : (
          <div className="bookmark-grid">
            {bookmarks.length > 0 ? (
              bookmarks.map((bookmark) => (
                <div key={bookmark.id} className="bookmark-card">
                  <div 
                    className="bookmark-content"
                    onClick={() => navigate('/service/' + bookmark.book.id, { state: { book: bookmark.book } })}
                  >
                    <img
                      src={`https://localhost:7188/${bookmark.book.coverImageUrl}`}
                      alt={bookmark.book.title}
                      className="bookmark-thumb"
                    />
                    <h4>{bookmark.book.title}</h4>
                    <p>{bookmark.book.authorName}</p>
                    <p>📌 Added on {new Date(bookmark.createdAt).toLocaleDateString()}</p>
                  </div>
                  <button 
                    className="remove-bookmark-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveBookmark(bookmark.id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : renderEmptyState()}
          </div>
        )}
      </div>
    </>
  );
};

export default BookMarks;
