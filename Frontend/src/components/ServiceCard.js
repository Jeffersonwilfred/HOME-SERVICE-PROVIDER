// ServiceCard.js
import { useNavigate } from 'react-router-dom';
import React from 'react';

const ServiceCard = ({ provider }) => {
  const navigate = useNavigate();
    const cardStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '40px',
        margin: '10px',
        borderRadius: '10px',
        width: '300px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    };
    const buttonStyle = {
      backgroundColor: 'grey',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
  };
  const handleButtonClick = () => {
    // Navigate to the login page when the button is clicked
    navigate('/login');
};


    return (
        <div style={cardStyle}>
            <h2>{provider.name}</h2>
            <p>Company: {provider.company}</p>
            <p>Email: {provider.email}</p>
            <p>Contact Number: {provider.contact_number}</p>
            <p>Category of Work: {provider.COW}</p>
        
        <div>
        <button style={buttonStyle} onClick={handleButtonClick}>Send Request</button>  Make Your Request Now!! 
    </div>
    </div>
    );
};

export default ServiceCard;
