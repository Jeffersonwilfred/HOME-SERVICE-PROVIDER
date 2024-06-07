import React from 'react';
import logoImage from '../../images/logo.jpg';
import './ServiceHeader.css'
import { useNavigate } from 'react-router-dom';

const ServiceHeader = () => {
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
        <a href="/Service-Home">Profile</a>
        <a href="/request-tab">Requests</a>
        <span>{sessionStorage.getItem('userEmail')}</span> {/* Display user email */}
        <button onClick={handleLogout}>Logout</button> {/* Logout button */}
      </nav>
    </div>
  );
};

export default ServiceHeader;
