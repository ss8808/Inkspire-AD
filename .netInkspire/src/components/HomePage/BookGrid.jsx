import React, { useEffect, useState } from 'react';
import './BookGrid.css';
import BookCard from './BookCard';
import { Link } from 'react-router-dom';
import FilterSidebar from './FilterSidebar';
import BookCategories from './BookCategories';

const BookGrid = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    genre: [],
    availability: [],
    minPrice: '',
    tags: [],
    category: ''
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const fetchBooks = async () => {
    try {
      const res = await fetch('http://localhost:5136/api/Book');
      const data = await res.json();
      setAllBooks(data);
      setFilteredBooks(data);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    }
  };

  const applyFilters = () => {
    let result = [...allBooks];

    if (filters.search) {
      const term = filters.search.toLowerCase();
      result = result.filter(book =>
        book.title.toLowerCase().includes(term) ||
        book.description?.toLowerCase().includes(term)
      );
    }

    if (filters.genre.length > 0) {
      result = result.filter(book => filters.genre.includes(book.genre));
    }

    if (filters.availability.includes('In Stock')) {
      result = result.filter(book => book.quantityInStock > 0);
    }

    if (filters.minPrice && !isNaN(filters.minPrice)) {
      result = result.filter(book => book.price >= parseFloat(filters.minPrice));
    }

    if (filters.tags.length > 0) {
      result = result.filter(book =>
        (filters.tags.includes('Bestseller') && book.isBestseller) ||
        (filters.tags.includes('Award Winner') && book.isAwardWinner) ||
        (filters.tags.includes('New Release') && book.isNewRelease) ||
        (filters.tags.includes('New Arrival') && book.newArrival) ||
        (filters.tags.includes('Coming Soon') && book.commingSoon)
      );
    }

    if (filters.category === 'Deals') {
      result = result.filter(book => book.originalPrice && book.originalPrice > book.price);
    }

    setFilteredBooks(result);
  };

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <FilterSidebar filters={filters} setFilters={setFilters} />
      <div className="book-content">
        <BookCategories setFilters={setFilters} />
        <div className="book-grid">
          {filteredBooks.map(book => (
            <Link
              to={`/service/${book.id}`}
              key={book.id}
              className="book-link"
              state={{ book }}
            >
              <BookCard
                image={`http://localhost:5136/${book.coverImageUrl}`}
                title={book.title}
                author={book.authorName}
                price={book.price}
                originalPrice={book.originalPrice}
                isBestseller={book.isBestseller}
                isAwardWinner={book.isAwardWinner}
                isNewRelease={book.isNewRelease}
                newArrival={book.newArrival}
                commingSoon={book.commingSoon}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookGrid;
