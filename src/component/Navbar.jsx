import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ isLoggedIn }) {
  return (
    <nav className="navbar">
      <h1 className="logo">Tutedude</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>

        {!isLoggedIn && <li><Link to="/login">Login</Link></li>}

        {isLoggedIn && (
          <>
            <li><Link to="/marketplace">Marketplace</Link></li>
            <li><Link to="/supplier">Supplier</Link></li>
            <li><Link to="/order">Order</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}
