import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function SupplierNavbar({ handleLogout }) {
    return (
        <nav className="navbar">
            <h1>
                <Link to="/supplier-dashboard">Supplier Dashboard</Link>
            </h1>
            <ul className="nav-links">
                <li>
                    <button className="logout-btn" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
}