import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function VendorRegister() {
  const [vendorName, setVendorName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (vendorName.trim() && email.trim() && phone.trim() && address.trim()) { 
      const vendorDetails = {
        vendorName,
        email,
        password,
        phone,
        address
      };

      localStorage.setItem('vendorDetails', JSON.stringify(vendorDetails));
      navigate('/vendor-login');
    }
  };
  
  const handleGoToLogin = () => {
    navigate('/vendor-login');
  };

  return (
    <div className='vend'>
        <div className="form">
      
        <div className="vendorlogin">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>

                <input type="text" placeholder='vendor name' value={vendorName}  onChange={(e) => setVendorName(e.target.value)}  required />
                <input type="email"  placeholder="Email ID"  value={email} onChange={(e) => setEmail(e.target.value)}  required />
                <input type="password" placeholder='password' value={password}  onChange={(e) => setPassword(e.target.value)}  required />
                <input type="tel"  placeholder="Phone Number"  value={phone} onChange={(e) => setPhone(e.target.value)}  required />
                <input type="text"  placeholder="Address"  value={address} onChange={(e) => setAddress(e.target.value)}  required />

                <button type="submit">Register</button>
                <p>Have an account?<Link to="/vendor-login">Login</Link></p>
            </form>
            </div>
      </div>
    </div>
  );
}
