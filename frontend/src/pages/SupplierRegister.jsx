import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SupplierRegister() {
    const [SupplierName, setSupplierName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:5000/api/auth/supplier/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ SupplierName, email, password, phone, address })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Supplier registered successfully! Please login.');
                navigate('/supplier-login');
            } else {
                alert(data.message || 'Registration failed.');
            }
        } catch (error) {
            console.error('Supplier registration error:', error);
            alert('An error occurred during registration.');
        }
    };

    const handleGoToLogin = () => {
        navigate('/supplier-login');
    };

    return (
        <div className="vend">
            <form className="form" onSubmit={handleSubmit}>
                <h2>Supplier Registration</h2>
                
                <input
                    type="text"
                    placeholder="Supplier Name"
                    value={SupplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                    required
                />
                
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                
                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                
                <textarea
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows="3"
                    style={{ resize: 'vertical' }}
                />
                
                <button type="submit">Register</button>
                
                <p>
                    Already have an account? <Link to="/supplier-login">Login here</Link>
                </p>
            </form>
        </div>
    );
}