import React, { useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ServiceProviderLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleServiceLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5005/servicelogin', {
        email,
        password,
      });

      const data = response.data;
      if (data.success) {
        sessionStorage.setItem('userEmail', email);
        navigate('/Service-Home', { replace: true }); // Navigate to '/home' if login is successful
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    }
  };


  return (
    <div><Header/>
    <div className="login">
      
    <form onSubmit={handleServiceLogin}>
      <label htmlFor="email">
        Enter E-mail
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor="password">
        Enter Password
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <p>{error}</p>
      <button type="submit">LOGIN AS SERVICE PROVIDER</button>
      <p>
        Don't have a service provider account? <a href="/ServiceProviderSignUpForm">Sign up</a>
      </p>
      <p>
        Or Login as a <a href="/Login">Regular User</a>
      </p>
    </form>
    </div>
    </div>
  );
}

export default ServiceProviderLoginForm;
