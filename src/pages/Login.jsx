import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('user'));

      if (storedUser && storedUser.email === email && storedUser.password === password) {
      setIsLoggedIn(true);
      alert('Login successful!');
      navigate('/marketplace'); 
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="page">
      <div className="form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <span><FontAwesomeIcon icon={faEnvelope} /></span>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <br /><br />
          <span><FontAwesomeIcon icon={faLock} /></span>
          <input type="password"  placeholder="Password" value={password}  onChange={(e) => setPassword(e.target.value)} required />
          <br /><br />
          <button type="submit">Login</button>
        </form>
        <p>Don’t have an account? <Link to="/signup">Signup</Link></p>
      </div>
    </div>
  );
}

export default Login;
