import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomerHeader from './CustomerHeader';
import ServiceCard from './CustomerServiceCard';


const CustomerService = () => {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5005/api/service-providers')
      .then(response => {
        setServiceProviders(response.data.serviceProviders);
        const storedEmail = sessionStorage.getItem('userEmail');
        setUserEmail(storedEmail);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <CustomerHeader userEmail={userEmail} />
      <div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {serviceProviders.map(provider => (
            <ServiceCard key={provider.id} provider={provider} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerService;
