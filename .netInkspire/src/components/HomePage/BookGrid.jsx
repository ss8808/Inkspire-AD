import React from 'react';
import './BookGrid.css';
import BookCard from './BookCard';
import { Link } from 'react-router-dom';

import book1 from '../../assets/img/book1.jpeg';
import book2 from '../../assets/img/book2.jpeg';
import book3 from '../../assets/img/book3.jpeg';
import book4 from '../../assets/img/book4.jpg';
import book5 from '../../assets/img/book5.jpeg';
import book6 from '../../assets/img/book6.jpeg';
import book7 from '../../assets/img/book7.jpeg';

const BookGrid = () => {
  const books = [
    {
      id: 1,
      image: book1,
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      price: '14.99'
    },
    {
      id: 2,
      image: book2,
      title: 'Where the Crawdads Sing',
      author: 'Delia Owens',
      price: '19.99'
    },
    {
      id: 3,
      image: book3,
      title: 'The Seven Husbands of Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      price: '16.99'
    },
    {
      id: 4,
      image: book4,
      title: "I'm the Stars",
      author: 'Jane Smith',
      price: '12.99'
    },
    {
      id: 5,
      image: book5,
      title: 'Fin the Stars',
      author: 'Emily Johnson',
      price: '18.09'
    },
    {
      id: 6,
      image: book6,
      title: 'Final Chance',
      author: 'Michael Brown',
      price: '10.99',
      originalPrice: '16.00'
    },
    {
      id: 7,
      image: book7,
      title: "Ocean's Secret",
      author: 'Sarah Davis',
      price: '9.99',
      originalPrice: '16.99'
    }
  ];

  return (
    <div className="book-grid">
      {books.map(book => (
        <Link
          to={`/service/${book.id}`}
          key={book.id}
          className="book-link"
          state={{ book }} // ✅ fix: pass book object as state
        >
          <BookCard
            image={book.image}
            title={book.title}
            author={book.author}
            price={book.price}
            originalPrice={book.originalPrice}
          />
        </Link>
      ))}
    </div>
  );
};

export default BookGrid;
  