import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const inputRef = useRef(null);

  const handleSignup = (e) => {
    e.preventDefault();
    alert(`Signed up as ${name} with email ${email}`);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="page">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input ref={inputRef} type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required/>
        <br /><br />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required  />
        <br /><br />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <br /><br />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Signup;
