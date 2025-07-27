import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './component/Navbar';
import SupplierNavbar from './component/SupplierNavbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Marketplace from './pages/Marketplace';
import Supplier from './pages/Supplier';
import Order from './pages/Order';
import SupplierRegister from './pages/SupplierRegister';
import SupplierDashboard from './pages/SupplierDashboard';
import SupplierLogin from './pages/SupplierLogin';

export default function App() {
    const navigate = useNavigate();
    
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });
    
    const [isSupplier, setIsSupplier] = useState(() => {
        return localStorage.getItem('isSupplier') === 'true';
    });
    
    const [SupplierProducts, setSupplierProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn);
        localStorage.setItem('isSupplier', isSupplier);
    }, [isLoggedIn, isSupplier]);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsSupplier(false);
        localStorage.setItem('isLoggedIn', false);
        localStorage.setItem('isSupplier', false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('supplier');
        navigate('/');
    };

    const handleSupplierLogin = () => {
        setIsLoggedIn(true);
        setIsSupplier(true);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('isSupplier', true);
        navigate('/supplier-dashboard');
    };

    return (
        <>
            {isSupplier ? (
                <SupplierNavbar handleLogout={handleLogout} />
            ) : (
                <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            )}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/marketplace" element={<Marketplace cart={cart} setCart={setCart} />} />
                <Route path="/supplier" element={<Supplier />} />
                <Route path="/order" element={<Order cartItems={cart} />} />
                <Route path="/supplier-register" element={<SupplierRegister />} />
                <Route path="/supplier-login" element={<SupplierLogin handleSupplierLogin={handleSupplierLogin} />} />
                <Route path="/supplier-dashboard" element={
                    <SupplierDashboard 
                        products={SupplierProducts} 
                        setProducts={setSupplierProducts} 
                    />
                } />
            </Routes>
        </>
    );
}