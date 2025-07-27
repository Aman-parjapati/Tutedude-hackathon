import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SupplierLogin({ handleSupplierLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const response = await fetch('http://localhost:5000/api/auth/supplier/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('supplier', JSON.stringify(data.supplier));
                handleSupplierLogin();
                navigate('/supplier-dashboard');
            } else {
                setError(data.message || 'Invalid email or password.');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className="vend">
            <form className="form" onSubmit={handleSubmit}>
                <h2>Supplier Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                
                <button type="submit">Login</button>
                
                <p>
                    Don't have an account? <Link to="/supplier-register">Register here</Link>
                </p>
            </form>
        </div>
    );
}

export default SupplierLogin;
