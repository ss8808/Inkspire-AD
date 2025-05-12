import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import ServiceDescription from './components/ServicePage/ServiceDescription';
import OrderConfirmation from './components/ServicePage/OrderConfirmation';
import CartPage from './components/ServicePage/CartPage';
import BrowseGenre from './components/BrowseGenre/BrowseGenre';
import Bookmark from './components/Bookmark/Bookmark';
import Inventory from './components/Inventory/Inventory';
import OrderTracker from './components/Order/OrderTracker';
import ClaimVerification from './components/ClaimVerification/ClaimVerification';
import Orders from './components/Order/Orders';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Review from './components/Review/Review'; 
import Dashboard from './components/AdminDashboard/dashboard';
import BookManagement from './components/BookManagementPage/BookManagement'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/service/:id" element={<ServiceDescription />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/browsegenre" element={<BrowseGenre />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/order-tracker" element={<OrderTracker />} />
        <Route path="/claimverification" element={<ClaimVerification />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/register" element={<Register />} />
        <Route path="/review" element={<Review />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/book-management" element={<BookManagement />} /> {/* ✅ new route */}

      </Routes>
    </Router>
  );
}

export default App;
