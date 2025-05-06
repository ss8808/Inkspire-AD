import React, { useState } from 'react';
import './DiscountManagement.css';
import Navigation from '../HomePage/Navigation';

const DiscountManagement = () => {
  const [discounts, setDiscounts] = useState([
    {
      book: 'The Silent Patient',
      discount: '15%',
      startDate: '3/30/2023',
      endDate: '3/30/2023',
    },
    {
      book: 'Where the Crawdads Sing',
      discount: '15%',
      startDate: '6/23/2023',
      endDate: '6/28/2023',
    },
    {
      book: 'The Five Husbands of Evelyn Hugo',
      discount: '20%',
      startDate: '6/31/2023',
      endDate: '7/02/2023',
    },
    {
      book: 'Educated',
      discount: '20%',
      startDate: '6/18/2023',
      endDate: '6/30/2023',
    },
  ]);

  const [book, setBook] = useState('');
  const [discount, setDiscount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleApplyDiscount = () => {
    if (book && discount && startDate && endDate) {
      const newDiscount = {
        book,
        discount: `${discount}%`,
        startDate,
        endDate,
      };

      setDiscounts([...discounts, newDiscount]);
      setBook('');
      setDiscount('');
      setStartDate('');
      setEndDate('');
    }
  };

  return (
    <div className="discount-page">
      <Navigation />
      <div className="discount-content">
        <div className="header-row">
          <h1>Discount Management</h1>
          <button className="admin-button">Admin</button>
        </div>

        {/*  Background Box for Form */}
        <div className="discount-box">
          <section className="discount-form">
            <h2>Apply Discount to Book</h2>

            <div className="form-group">
              <label>Book</label>
              <input
                type="text"
                placeholder="Enter book title"
                value={book}
                onChange={(e) => setBook(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Discount Percentage</label>
              <input
                type="number"
                placeholder="e.g. 10"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>

            <div className="form-group dates">
              <label>Discount Period</label>
              <input
                type="text"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="text"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <button className="apply-button" onClick={handleApplyDiscount}>
              Apply Discount
            </button>
          </section>
        </div>

        {/* Background Box for Table */}
        <div className="discount-box">
          <section className="discount-table">
            <h2>Set “On Sale” Flag</h2>
            <table>
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Discount</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                {discounts.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.book}</td>
                    <td>{item.discount}</td>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
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
