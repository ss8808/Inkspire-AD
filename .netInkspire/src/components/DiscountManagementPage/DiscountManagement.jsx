import React, { useEffect, useState } from 'react';
import './DiscountManagement.css';
import AdminNavbar from '../AdminDashboard/AdminNavbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DiscountManagement = () => {
  const [discounts, setDiscounts] = useState([]);
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    bookId: '',
    discountPercentage: '',
    startDate: '',
    endDate: '',
    onSale: true,
    isActive: true
  });

  useEffect(() => {
    fetchDiscounts();
    fetchBooks();
  }, []);

  const fetchDiscounts = async () => {
    try {
      const res = await fetch('https://localhost:7188/api/Discount');
      const data = await res.json();
      setDiscounts(data);
    } catch (err) {
      console.error('Error fetching discounts:', err);
      toast.error('Failed to load discounts.');
    }
  };

  const fetchBooks = async () => {
    try {
      const res = await fetch('https://localhost:7188/api/Book');
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.bookId || !formData.discountPercentage || !formData.startDate || !formData.endDate) {
      toast.warn('All fields are required.');
      return;
    }

    try {
      const response = await fetch(`https://localhost:7188/api/Discount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Discount added successfully');
        setFormData({
          bookId: '',
          discountPercentage: '',
          startDate: '',
          endDate: '',
          onSale: true,
          isActive: true
        });
        fetchDiscounts();
      } else {
        toast.error('Failed to create discount.');
      }
    } catch (err) {
      console.error('Error creating discount:', err);
      toast.error('Error submitting discount.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this discount?')) return;

    try {
      const res = await fetch(`https://localhost:7188/api/Discount/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
        }
      });
      if (res.ok) {
        toast.success('Discount deleted');
        fetchDiscounts();
      } else {
        toast.error('Failed to delete discount.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="discount-page">
      <AdminNavbar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="discount-content">
        <div className="header-row">
          <h1>Discount Management</h1>
        </div>

        <div className="discount-box">
          <section className="discount-form">
            <h2>Apply Discount</h2>
            <div className="form-group">
              <label>Select Book</label>
              <select name="bookId" value={formData.bookId} onChange={handleChange}>
                <option value="">-- Select Book --</option>
                {books.map(book => (
                  <option key={book.id} value={book.id}>{book.title}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Discount (%)</label>
              <input
                type="number"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleChange}
              />
            </div>

            <div className="form-group dates">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="onSale"
                  checked={formData.onSale}
                  onChange={handleChange}
                />
                On Sale
              </label>
              <label>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                Active
              </label>
            </div>

            <button className="apply-button" onClick={handleSubmit}>Apply Discount</button>
          </section>
        </div>

        <div className="discount-box">
          <section className="discount-table">
            <h2>Existing Discounts</h2>
            <table>
              <thead>
                <tr>
                  <th>Book ID</th>
                  <th>Discount (%)</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>On Sale</th>
                  <th>Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {discounts.map(d => (
                  <tr key={d.id}>
                    <td>{d.bookId}</td>
                    <td>{d.discountPercentage}</td>
                    <td>{new Date(d.startDate).toLocaleDateString()}</td>
                    <td>{new Date(d.endDate).toLocaleDateString()}</td>
                    <td>{d.onSale ? 'Yes' : 'No'}</td>
                    <td>{d.isActive ? 'Yes' : 'No'}</td>
                    <td>
                      <button className="delete-button" onClick={() => handleDelete(d.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DiscountManagement;
