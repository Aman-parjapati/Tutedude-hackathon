import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function VendorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedVendor = JSON.parse(localStorage.getItem('vendorDetails'));
    const storedEmail = storedVendor?.email || '';
    const storedPassword = storedVendor?.password || '';

    if (email.trim() === '' || password.trim() === '') {
      setError('Email and password are required.');
    } else if (email.trim() !== storedEmail || password !== storedPassword) {
      setError('Invalid email or password. Please try again.');
    } else {
      setError('');
      navigate('/vendor-dashboard');
    }
  };

  return (
    <div className='vend'>
        <div className="form">
            <h2>Vendor Login</h2>
            <form className='vendorlogin'  onSubmit={handleLogin}  style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }} >

                <input type="email" placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} required  />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
                <p>Don't have account? <Link to="/vendor-register">Register</Link></p>
            </form>
            </div>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default VendorLogin;
