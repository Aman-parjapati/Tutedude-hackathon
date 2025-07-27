import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Navbar({ isLoggedIn, handleLogout}) {
    return (
        <nav className="navbar">
            <h1>
                <Link style={{textDecoration: "none", color:"black"}} to="/">Tutedude</Link>
            </h1>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                
                {!isLoggedIn && (
                    <>
                        <li><Link to="/supplier-login">Supplier Login</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                )}
                
                {isLoggedIn && (
                    <>
                        <li><Link to="/marketplace">Marketplace</Link></li>
                        <li><Link to="/supplier">Supplier</Link></li>
                        <li><Link to="/order">Order</Link></li>
                        <li>
                            <button className="logout-btn" onClick={handleLogout}>
                                <FontAwesomeIcon icon={faRightFromBracket} />
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}