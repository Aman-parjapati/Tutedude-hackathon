import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // Save user data to localStorage
    const user = {
      name,
      email,
      password,
    };
    localStorage.setItem('user', JSON.stringify(user));

    alert(`Signed up as ${name}`);
    navigate('/login');
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="page">
      <div className="form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <span><FontAwesomeIcon icon={faUser} /></span>
          <input  ref={inputRef}  type="text"  placeholder="Username" value={name}  onChange={e => setName(e.target.value)} required />
          <br /><br />

          <span><FontAwesomeIcon icon={faEnvelope} /></span>
          <input type="email" placeholder="Email" value={email}  onChange={e => setEmail(e.target.value)}  required />
          <br /><br />

          <span><FontAwesomeIcon icon={faLock} /></span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          /><br /><br />

          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Signup;
