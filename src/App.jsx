import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Marketplace from './pages/Marketplace';
import Supplier from './pages/Supplier';
import Order from './pages/Order';

export default function App() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const [cart, setCart] = useState([]);

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
        <Route path="/marketplace" element={<Marketplace cart={cart} setCart={setCart} />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/order" element={<Order cartItems={cart} />} />
      </Routes>
    </>
  );
}
