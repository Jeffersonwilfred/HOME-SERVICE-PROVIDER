import React from 'react';
import logoImage from '../../images/logo.jpg';
import './CustomerHeader.css'
import { useNavigate } from 'react-router-dom';

const CustomerHeader = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    sessionStorage.removeItem('userEmail');
    navigate('/', { replace: true });

  };

  return (
    <div className="header">
      <div className="logo">
        <img src={logoImage} alt="Logo" />
      </div>
      <nav>
        <a href="/home">Services</a>
        <a href="/notification">Notification</a>
        <span>{sessionStorage.getItem('userEmail')}</span> {/* Display user email */}
        <button onClick={handleLogout}>Logout</button> {/* Logout button */}
      </nav>
    </div>
  );
};

export default CustomerHeader;
