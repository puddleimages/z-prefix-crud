import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.success) {
        sessionStorage.setItem('userId', JSON.stringify(data.id));
        console.log('Login successful.');
        onLogin(data.id);
        navigate('/inventory');
      } else {
        console.log('Error logging in.');
      }
    } catch (error) {
      console.error('Error logging in', error);
    }
  }

  return (
    <form onSubmit={handleLogin}><br />
      <Link to="/register">Register</Link><br />
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="username"
        placeholder="Username"
        id="username"
        name="username"
      /><br />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        id="password"
        name="password"
      /><br />
      <button type="submit">Log In</button>
    </form>
  )
};
