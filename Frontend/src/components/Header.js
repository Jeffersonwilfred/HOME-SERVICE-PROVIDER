import React from 'react';
import './Header.css'; 
import logoImage from '../images/logo.jpg';

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
      <img src={logoImage} alt="Logo" />
      </div>
      <nav>
        <a href="/">Home</a>
        <a href="/services">Services</a>
        <a href="/about">About</a>
        <a href="/login">Login</a>
      </nav>
    </div>
  );
}

export default Header;
