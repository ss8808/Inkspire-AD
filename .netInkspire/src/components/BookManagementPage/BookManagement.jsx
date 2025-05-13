import React, { useState, useEffect } from 'react';
import './Bookmanagement.css';
import Navigation from '../AdminDashboard/AdminNavbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from '../AdminDashboard/AdminNavbar';

function BookManagement() {
  const [books, setBooks] = useState([]);
  const [editingBookId, setEditingBookId] = useState(null);
  const [newBook, setNewBook] = useState({
    isbn: '',
    title: '',
    author: '',
    publisher: '',
    price: '',
    format: '',
    language: '',
    stock: '',
    coverImage: null,
    isBestseller: false,
    isAwardWinner: false,
    isNewRelease: false,
    newArrival: false,
    commingSoon: false
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch('https://localhost:7188/api/Book');
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === 'coverImage') {
      setNewBook((prev) => ({ ...prev, coverImage: files[0] }));
    } else if (type === 'checkbox') {
      setNewBook((prev) => ({ ...prev, [name]: checked }));
    } else {
      setNewBook((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddOrUpdateBook = async () => {
    const formData = new FormData();
    formData.append('ISBN', newBook.isbn);
    formData.append('Title', newBook.title);
    formData.append('AuthorName', newBook.author);
    formData.append('PublisherName', newBook.publisher);
    formData.append('Price', newBook.price);
    formData.append('Format', newBook.format);
    formData.append('Language', newBook.language);
    formData.append('QuantityInStock', newBook.stock);
    formData.append('ReorderThreshold', '10');
    formData.append('Description', 'Temporary');
    formData.append('PublicationDate', new Date().toISOString());
    formData.append('PageCount', '100');
    formData.append('IsBestseller', newBook.isBestseller);
    formData.append('IsAwardWinner', newBook.isAwardWinner);
    formData.append('IsNewRelease', newBook.isNewRelease);
    formData.append('NewArrival', newBook.newArrival);
    formData.append('CommingSoon', newBook.commingSoon);
    formData.append('IsActive', 'true');
    if (newBook.coverImage) {
      formData.append('CoverImageUrl', newBook.coverImage);
    }

    try {
      const response = await fetch(
        editingBookId
          ? `https://localhost:7188/api/Book/${editingBookId}`
          : 'https://localhost:7188/api/Book',
        {
          method: editingBookId ? 'PUT' : 'POST',
          body: formData
        }
      );

      if (response.ok) {
        await fetchBooks();
        setNewBook({
          isbn: '',
          title: '',
          author: '',
          publisher: '',
          price: '',
          format: '',
          language: '',
          stock: '',
          coverImage: null,
          isBestseller: false,
          isAwardWinner: false,
          isNewRelease: false,
          newArrival: false,
          commingSoon: false
        });
        toast.success(editingBookId ? 'Book updated successfully!' : 'Book added successfully!');
        setEditingBookId(null);
      }
    } catch (error) {
      console.error('Error saving book:', error);
      toast.error('Failed to save book.');
    }
  };

  const handleDeleteBook = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await fetch(`https://localhost:7188/api/Book/${id}`, {
        method: 'DELETE'
      });
      fetchBooks();
      toast.success('Book deleted.');
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('Failed to delete book.');
    }
  };

  const handleEditBook = (book) => {
    setEditingBookId(book.id);
    setNewBook({
      isbn: book.isbn,
      title: book.title,
      author: book.authorName,
      publisher: book.publisherName,
      price: book.price,
      format: book.format,
      language: book.language,
      stock: book.quantityInStock?.toString() || '',
      coverImage: null,
      isBestseller: book.isBestseller,
      isAwardWinner: book.isAwardWinner,
      isNewRelease: book.isNewRelease,
      newArrival: book.newArrival,
      commingSoon: book.commingSoon
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    
    <div className="book-management-page">
      <AdminNavbar/>
      <div className="book-management-container">
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
            <div className="form-row">
              <label>Cover Image</label>
              <input type="file" name="coverImage" onChange={handleInputChange} />
            </div>
            <div className="form-row">
              <label><input type="checkbox" name="isBestseller" checked={newBook.isBestseller} onChange={handleInputChange} /> Bestseller</label>
              <label><input type="checkbox" name="isAwardWinner" checked={newBook.isAwardWinner} onChange={handleInputChange} /> Award Winner</label>
              <label><input type="checkbox" name="isNewRelease" checked={newBook.isNewRelease} onChange={handleInputChange} /> New Release</label>
              <label><input type="checkbox" name="newArrival" checked={newBook.newArrival} onChange={handleInputChange} /> New Arrival</label>
              <label><input type="checkbox" name="commingSoon" checked={newBook.commingSoon} onChange={handleInputChange} /> Coming Soon</label>
            </div>
            <button className="add-button" onClick={handleAddOrUpdateBook}>
              {editingBookId ? 'Update Book' : 'Add New Book'}
            </button>
          </form>
        </div>

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
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.authorName}</td>
                  <td>${book.price}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEditBook(book)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDeleteBook(book.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop />
    </div>
  );
}

export default BookManagement;
