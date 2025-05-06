import React from "react";
import "./OrderTracker.css"; 
import writtenInTheStarsImg from '../../assets/img/written_in_the_stars.jpg';
import mostlyDeadThingsImg from '../../assets/img/mostly_dead_things.jpg';

const orders = [
  {
    id: 548726,
    date: "April 16, 2024",
    book: {
      title: "Final Review",
      price: "$16.99",
      cover: writtenInTheStarsImg,
    },
    member: { name: "sarah", email: "@example.com" },
  },
  {
    id: 548725,
    date: "April 16, 2024",
    book: {
      title: "The Since",
      price: "$14.99",
      cover: mostlyDeadThingsImg,
    },
    member: { name: "bob", email: "@example.com" },
  },
];

export default function OrderTracker() {
  return (
    <div className="order-tracker">
      <div className="header">
        <h1>Order Tracker</h1>
        <span>Broadcast Panel</span>
      </div>

      <h2 className="subheading">Latest Successful Orders</h2>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Book</th>
            <th>Member</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>
                <div className="book-info">
                  <img src={order.book.cover} alt={order.book.title} />
                  <div>
                    <div>{order.book.title}</div>
                    <div className="price">{order.book.price}</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="member-name">{order.member.name}</div>
                <div className="member-email">{order.member.email}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="broadcast">
        <h2>Broadcast Book</h2>
        <div className="broadcast-form">
          <input type="text" placeholder="Message" />
          <button>Broadcast</button>
        </div>
      </div>
    </div>
  );
}
