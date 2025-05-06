import React from 'react';
import './Inventory.css';

const books = [
  { id: 1, title: "The Silent Patient", author: "Alex Michaelides", stock: 14 },
  { id: 2, title: "Where the Crawdads Sing", author: "Delia Owens", stock: 18 },
  { id: 3, title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid", stock: 11 },
  { id: 4, title: "Educated", author: "Tara Westover", stock: 9 },
  { id: 5, title: "I'm the Stars", author: "Jane Smith", stock: 4 },
  { id: 6, title: "Piranesi", author: "Susanna Clarke", stock: 4 },
  { id: 7, title: "Normal People", author: "Sally Rooney", stock: 3 },
  { id: 8, title: "Klara and the Sun", author: "Kazuo Ishiguro", stock: 3 },
];

function Inventory() {
  return (
    <div className="inventory-container">
      <div className="header">
        <div className="logo">📚 <span>Inkspire</span></div>
        <button className="logout-btn">Logout</button>
      </div>
      <h1>Inventory</h1>
      <p className="subtitle">Track stock levels of alll books.</p>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td className={book.stock <= 5 ? 'stock-low' : ''}>{book.stock}</td>
              <td><button className="update-btn">Update Stock</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;
