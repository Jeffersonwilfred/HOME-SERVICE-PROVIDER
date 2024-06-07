// ServicePage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceCard from './ServiceCard';
import Header from './Header';

const ServicePage = () => {
    const [serviceProviders, setServiceProviders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5005/api/service-providers')
            .then(response => {
                setServiceProviders(response.data.serviceProviders);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
      <div><Header/>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {serviceProviders.map(provider => (
                <ServiceCard key={provider.id} provider={provider} />
            ))}
        </div>
        </div>
    );
};

export default ServicePage;
