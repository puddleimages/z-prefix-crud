import '../App.css';
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async (event) => {
    event.preventDefault();

    if (!username) {
      console.log('Provide a username');
      return;
    }

    if (password !== passwordConfirmation) {
      console.log('Password confirmation failed');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, username, password }),
      });

      const data = await response.json();
      if (data.success) {
        console.log('Registration successful. Please login.');
        navigate('/login');
      } else {
        console.log('Error registering user data:', data.message);
      }
    } catch (error) {
      console.error('Error registering user data:', error);
    }
  }

  return (
    <form onSubmit={handleRegistration}>
      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        type="text"
        placeholder="First Name"
        id="firstName"
        name="firstName"
      />
      <br />
      <input
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        type="text"
        placeholder="Last Name"
        id="lastName"
        name="lastName"
      />
      <br />
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Username"
        id="username"
        name="username"
      />
      <br />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        id="password"
        name="password"
      />
      <br />
      <input
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        type="password"
        placeholder="Confirm password"
        id="passwordConfirmation"
        name="passwordConfirmation"
      />
      <br />
      <button type="submit">Register</button>
    </form>
  )
};
