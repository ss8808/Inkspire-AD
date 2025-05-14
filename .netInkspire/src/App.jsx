import React from 'react';

import './index.css'; 

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import ServiceDescription from './components/ServicePage/ServiceDescription';
import OrderConfirmation from './components/ServicePage/OrderConfirmation';
import CartPage from './components/ServicePage/CartPage';
import BrowseGenre from './components/BrowseGenre/BrowseGenre';
import Bookmark from './components/Bookmark/Bookmark';
// import Bookmarks from './components/ServicePage/Bookmarks';
import Inventory from './components/Inventory/Inventory';
import OrderTracker from './components/Order/OrderTracker';
import ClaimVerification from './components/ClaimVerification/ClaimVerification';
import Orders from './components/Order/Orders';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Review from './components/Review/Review'; 
import Dashboard from './components/AdminDashboard/dashboard';
import BookManagement from './components/BookManagementPage/BookManagement'; 
import BookMarks from './components/ServicePage/BookMarks';
import AddAnnouncement from './components/Announcement Page/AddAnnouncement';
import DiscountManagement from './components/DiscountManagementPage/DiscountManagement';
import ManageAnnouncements from './components/Announcement Page/ManageAnnouncement';
import UserAnnouncements from './components/Announcement Page/UserAnnouncements';
import Sidebar from './components/AdminDashboard/Sidebar';
import FilterSidebar from './components/HomePage/FilterSidebar';
// import { BookmarkProvider } from './ServicePage/BookMarkProvider';
// import UserAnnouncements from './components/Announcement Page/UserAnnouncements';



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
        <Route path="/MyOrders" element={<Orders />} />
        <Route path="/register" element={<Register />} />
        <Route path="/review" element={<Review />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/book-management" element={<BookManagement />} /> {/* ✅ new route */}
        <Route path="/bookmarks" element={<BookMarks/>}/>
        <Route path="/add-announcement" element={<AddAnnouncement />} />
        <Route path="/manage-announcements" element={<ManageAnnouncements />} />
        <Route path="/discount" element={<DiscountManagement />} />
        {/* <Route path="/bookmarkProvider" element={<BookMarkProvider/>}/> */}
        {/* <Route path="/announcements" element={<UserAnnouncements />} /> */}
         <Route path="/announcements" element={<UserAnnouncements/>} />
         <Route path="/adminsidebar" element={<Sidebar/>} />
         <Route path="/filtering" element={<FilterSidebar/>} />

      </Routes>
    </Router>
  );
}

export default App;
