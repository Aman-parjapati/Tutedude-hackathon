import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Marketplace from './pages/Marketplace';
import Supplier from './pages/Supplier';
import Order from './pages/Order';

// 👇 New Vendor Pages
import VendorRegister from './pages/VendorRegister';
import VendorDashboard from './pages/VendorDashboard';
import VendorLogin from './pages/VendorLogin';

export default function App() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const [cart, setCart] = useState([]);

  // 🆕 Store uploaded products from vendors (shared with Marketplace)
  const [vendorProducts, setVendorProducts] = useState([]);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', false);
    navigate('/');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', true);
    navigate('/marketplace');
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/marketplace" element={ <Marketplace cart={cart} setCart={setCart} vendorProducts={vendorProducts} />} />

        <Route path="/supplier" element={<Supplier />} />
        <Route path="/order" element={<Order cartItems={cart} />} />
        <Route path="/vendor-register" element={<VendorRegister />} />
        <Route path='/vendor-login' element={<VendorLogin />} />

        <Route path="/vendor-dashboard" element={ <VendorDashboard vendorProducts={vendorProducts} setVendorProducts={setVendorProducts} />}/>
      </Routes>
    </>
  );
}
