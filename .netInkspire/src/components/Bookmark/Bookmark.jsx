import React, { useState } from 'react';
import './Bookmark.css';
import { useNavigate } from 'react-router-dom'; 
import writtenInTheStarsImg from '../../assets/img/written_in_the_stars.jpg';
import mostlyDeadThingsImg from '../../assets/img/mostly_dead_things.jpg';

const initialBookmarks = [
  {
    id: 1,
    title: "Written In The Stars",
    author: "Jane Smith",
    price: "$14.99",
    image: writtenInTheStarsImg, 
  },
  {
    id: 2,
    title: "Mostly Dead Things",
    author: "Sarah Davis",
    price: "$18.99",
    image: mostlyDeadThingsImg
  },
];

function Bookmark() {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const navigate = useNavigate();

  const removeBookmark = (id) => {
    setBookmarks(prevBookmarks => prevBookmarks.filter(book => book.id !== id));
  };

  return (
    <div className="bookmark-container">
      <div className="logo">📖 <span>Inkspire</span></div>
      <h1 className="bookmark-title">Bookmarked</h1>

      {/* ✅ Add this button below the title */}
      <button className="btn go-inventory" onClick={() => navigate('/inventory')}>
        Go to Inventory
      </button>

      {bookmarks.map(book => (
        <div key={book.id} className="book-item">
          <img src={book.image} alt={book.title} className="book-image" />
          <div className="book-details">
            <h2 className="book-title">{book.title}</h2>
            <p className="book-author">{book.author}</p>
            <p className="book-price">{book.price}</p>
            <div className="book-actions">
              <button className="btn remove" onClick={() => removeBookmark(book.id)}>Remove Bookmark</button>
              <button className="btn view">View</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Bookmark;
