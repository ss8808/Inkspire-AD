import React, { useState } from 'react';
import './Bookmanagement.css';
import Navigation from '../HomePage/Navigation';

function BookManagement() {
  const [books, setBooks] = useState([
    { title: 'The Silent Patient', author: 'Alex Michaelides', price: '14.99' },
    { title: 'Where the Crawdads Sing', author: 'Delia Owens', price: '18.99' },
    { title: 'Educated', author: 'Tara Westover', price: '12.99' },
  ]);

  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    price: '',
    stock: '',
    format: '',
    publisher: '',
    language: '',
    isbn: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBook = () => {
    if (!newBook.title || !newBook.author || !newBook.price) {
      alert('Please fill in at least title, author, and price.');
      return;
    }

    setBooks([...books, newBook]);
    setNewBook({
      title: '',
      author: '',
      price: '',
      stock: '',
      format: '',
      publisher: '',
      language: '',
      isbn: '',
    });
  };

  return (
    <div className="book-management-page">
      <Navigation />
      <div className="book-management-container">
        {/* 📘 Form Box */}
        <div className="book-management-box">
          <h1>Book Management</h1>

          <form className="book-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <label>Title</label>
              <input type="text" name="title" value={newBook.title} onChange={handleInputChange} />

              <label>Price</label>
              <input type="text" name="price" value={newBook.price} onChange={handleInputChange} />
            </div>

            <div className="form-row">
              <label>Author</label>
              <input type="text" name="author" value={newBook.author} onChange={handleInputChange} />

              <label>Stock</label>
              <input type="text" name="stock" value={newBook.stock} onChange={handleInputChange} />
            </div>

            <div className="form-row">
              <label>Format</label>
              <input type="text" name="format" value={newBook.format} onChange={handleInputChange} />

              <label>Publisher</label>
              <input type="text" name="publisher" value={newBook.publisher} onChange={handleInputChange} />
            </div>

            <div className="form-row">
              <label>Language</label>
              <input type="text" name="language" value={newBook.language} onChange={handleInputChange} />

              <label>ISBN</label>
              <input type="text" name="isbn" value={newBook.isbn} onChange={handleInputChange} />
            </div>

            <button className="add-button" onClick={handleAddBook}>Add New Book</button>
          </form>
        </div>

        {/* 📗 Table Box */}
        <div className="book-list-box">
          <h2>All Books</h2>
          <table className="book-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>${book.price}</td>
                  <td>
                    <button className="edit-button">Edit</button>
                    <button className="delete-button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BookManagement;
