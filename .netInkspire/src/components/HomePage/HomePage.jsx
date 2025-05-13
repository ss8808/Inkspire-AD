import React from 'react';
import Navigation from './Navigation';
import Hero from './Hero';
// import FilterSidebar from './FilterSidebar';
// import BookCategories from './BookCategories';
import BookGrid from './BookGrid';
import './HomePage.css';

const HomePage = () => {
  return (
    
    <div className="homepage">
      
      <Navigation />
      <main>
        <Hero />
        <div className="content-container">
          <h2 className="section-title">Explore Our Collection</h2>
          <div className="books-container">
            {/* <FilterSidebar /> */}
            <div className="books-content">
              {/* <BookCategories /> */}
              <BookGrid />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;