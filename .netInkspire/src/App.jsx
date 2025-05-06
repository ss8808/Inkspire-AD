import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import ServiceDescription from './components/ServicePage/ServiceDescription';
import OrderConfirmation from './components/ServicePage/OrderConfirmation';
import CartPage from './components/ServicePage/CartPage'; // ✅ ADD THIS
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Review from './components/Review/Review'; // 👈 Import the new page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/service/:id" element={<ServiceDescription />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/cart" element={<CartPage />} /> {/* ✅ ADD THIS ROUTE */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/review" element={<Review />} /> {/* 👈 Add this line */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
