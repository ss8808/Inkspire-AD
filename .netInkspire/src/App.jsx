import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import ServiceDescription from './components/ServicePage/ServiceDescription';
import OrderConfirmation from './components/ServicePage/OrderConfirmation';
import CartPage from './components/ServicePage/CartPage'; // ✅ ADD THIS

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/service/:id" element={<ServiceDescription />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/cart" element={<CartPage />} /> {/* ✅ ADD THIS ROUTE */}
      </Routes>
    </Router>
  );
}

export default App;
