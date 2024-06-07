import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios for HTTP requests
import './styles/SignUpUser.css'
import Header from './Header';


const SignUpFormuser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, seterrorMessage] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    // Add your password validation logic here
    return password.length >= 8; // Example: Password must be at least 8 characters long
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Reset previous error messages
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    

    // Validation checks
    if (!name.match(/^[A-Za-z]+$/)) {
      setNameError('Name should only contain alphabetic characters.');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Invalid email format.');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5005/signup', {
        name,
        email,
        password
      });
      console.log(response.data); // Log the response from the backend
      // Reset form fields after successful signup
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setSuccessMessage('Signup successfull');
    } catch (error) {
      console.error('Error:', error);
      seterrorMessage('Unable to create a account with this email check are you already an user');
    }
  };

  return (
    <div><Header/>
    <div className='container'>
      <div className="up">
        <div className="form-container">
          <form onSubmit={handleSignUp} className="form">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {nameError && <p className="error-message">{nameError}</p>}

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <p className="error-message">{emailError}</p>}

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && <p className="error-message">{passwordError}</p>}

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}

            <button type="submit">Sign Up</button>
            {successMessage && <p className="success">{successMessage}</p>}
            {errorMessage && <p className="success">{errorMessage}</p>}
          </form>
        </div>

        <p>
          Already have an account? <Link to="/Login">Login</Link>
        </p>
        <p>
          Or signup as a <Link to="/ServiceProviderSignUpForm">Service provider</Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default SignUpFormuser;
