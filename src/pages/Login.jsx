import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom'; // 👈 Required for navigation

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const inputRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Logged in with ${email}`);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          ref={inputRef}
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p> {/* 👈 Navigation to SignUp */}
    </div>
  );
}

export default Login;
