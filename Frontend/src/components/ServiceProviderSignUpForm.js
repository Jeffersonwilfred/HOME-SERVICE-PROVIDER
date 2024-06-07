import React, { useState } from 'react';
import './styles/ServiceProviderSU.css';
import Header from './Header';

const ServiceProviderSignUpForm = () => {
  const [picture, setPicture] = useState(null);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [serviceArea, setServiceArea] = useState('');
  const [document, setDocument] = useState(null);
  const [number, setNumber] = useState('');
  const [category, setCategory] = useState('');
  const [successMessage,setSuccessMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    company: '',
    email: '',
    password: '',
    confirmPassword: '',
    picture: '',
    number: '',
    category: '',
    document: '',
  });

  const handleServiceProviderSignUp = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!name) {
      errors.name = 'Provider Name is required.';
    } else if (!/^[a-zA-Z ]+$/.test(name)) {
      errors.name = 'Provider name must contain only alphabets and spaces.';
    }

    if (!company) {
      errors.company = 'Company Name is required.';
    } else if (!/^[a-zA-Z ]+$/.test(company)) {
      errors.company = 'Company name must contain only alphabets and spaces.';
    }

    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      errors.email = 'Enter a valid email address.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required.';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    if (!picture) {
      errors.picture = 'Profile Picture is required.';
    } else if (!['image/jpeg', 'image/png', 'image/jpg'].includes(picture.type)) {
      errors.picture = 'Please upload an image of type JPG or PNG.';
    }

    if (!document) {
      errors.document = 'Document is required.';
    } else if (!['application/pdf'].includes(document.type)) {
      errors.document = 'Please upload a PDF document.';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Proceed with signup logic if all validations pass
    setValidationErrors({});
    const formData = new FormData();
    formData.append('picture', picture);
    formData.append('name', name);
    formData.append('company', company);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('serviceArea', serviceArea);
    formData.append('document', document);
    formData.append('number', number);
    formData.append('category', category);

    try {
      const response = await fetch('http://localhost:5005/sp/signup', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage('Signup successful');
        // Clear all input fields
        setPicture('');
        setName('');
        setCompany('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setServiceArea('');
        setDocument('');
        setNumber('');
        setCategory('');
      } else {
        // Handle signup error
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setServiceArea(`Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };


  return (
    <div><Header/>
    <div className="login">
      <form onSubmit={handleServiceProviderSignUp}>
        <label htmlFor="picture">Profile Picture:</label>
        <input
          type="file"
          id="picture"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setPicture(e.target.files[0])}
          required
        />
        <p className="error">{validationErrors.picture}</p>

        <label htmlFor="providerName">Provider Name:</label>
        <input
          type="text"
          id="providerName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <p className="error">{validationErrors.name}</p>

        <label htmlFor="companyName">Enter Company Name:</label>
        <input
          type="text"
          id="companyName"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
        <p className="error">{validationErrors.company}</p>

        <label htmlFor="email">Enter E-mail:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <p className="error">{validationErrors.email}</p>

        <label htmlFor="password">Enter Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="error">{validationErrors.password}</p>

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <p className="error">{validationErrors.confirmPassword}</p>

        <label htmlFor="serviceArea">Enter Service Area:</label>
        <input
          type="text"
          id="serviceArea"
          value={serviceArea}
          onChange={(e) => setServiceArea(e.target.value)}
          required
        />
        <button type="button" onClick={getLocation}>Use GPS</button>

        <label htmlFor="document">Add Document:</label>
        <input
          type="file"
          id="document"
          accept=".pdf"
          onChange={(e) => setDocument(e.target.files[0])}
          required
        />
        <label htmlFor="number">Contact Number:</label>
        <input
          type="text"
          id="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />

        <label htmlFor="category">Category of Work:</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <p className="error">{validationErrors.document}</p>
        {successMessage && <p className="success">{successMessage}</p>}

        <button type="submit">Sign Up as Service Provider</button>
        <p>
          Already have an account? <a href="/Login">Login</a>
        </p>
        <p>
          Or sign up as a <a href="/SignUpFormuser">Regular User</a>
        </p>
      </form>
    </div>
    </div>
  );
};

export default ServiceProviderSignUpForm;
