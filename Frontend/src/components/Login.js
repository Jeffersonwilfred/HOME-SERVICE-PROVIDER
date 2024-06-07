import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Header from './Header';
import './styles/login.css';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5005/login', {
        email,
        password,
      });

      const data = response.data;
      if (data.success) {
        sessionStorage.setItem('userEmail', email);
        navigate('/home', { replace: true }); // Navigate to '/home' if login is successful
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <Header />
      <div className="total">
        <div className="login-container">
          <h2 id="l">Login</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
          </form>
          <p>{error}</p>
          <p>Don't have an account? <a href="/SignUpFormUser">Sign up</a></p>
          <p>Are you a Service Provider? <a href="/ServiceProviderLoginForm">Login in</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
