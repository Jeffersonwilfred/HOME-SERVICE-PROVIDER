import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceHeader from './ServiceHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const ServiceHome = () => {
    const [providerDetails, setProviderDetails] = useState(null);

    const fetchProviderDetails = async () => {
        try {
            const userEmail = sessionStorage.getItem('userEmail');
            const response = await axios.get(`http://localhost:5005/get_provider_details?email=${userEmail}`);
            setProviderDetails(response.data);
        } catch (error) {
            console.error('Error fetching provider details:', error);
        }
    };

    const handleLocationUpdate = async () => {
        try {
            if ("geolocation" in navigator) {
                // Get the user's current position
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    // You can now use latitude and longitude to update the location or send to the backend

                    const newLocation = prompt('Enter new location:', `Latitude: ${latitude}, Longitude: ${longitude}`);
                    if (newLocation) {
                        const userEmail = sessionStorage.getItem('userEmail');
                        await axios.post('http://localhost:5005/update_service_area', {
                            user_email: userEmail,
                            new_location: newLocation,
                        });
                        alert('Service area updated successfully');
                        // Refetch provider details to update the UI
                        fetchProviderDetails();
                    }
                }, (error) => {
                    console.error('Error getting current position:', error);
                    alert('Error getting current position. Please try again later.');
                });
            } else {
                alert('Geolocation is not supported by your browser.');
            }
        } catch (error) {
            console.error('Error updating service area:', error);
        }
    };

    useEffect(() => {
        fetchProviderDetails();
    }, []);

    return (
        <div>
            <ServiceHeader />
            <div className="provider-details-container" style={styles.providerContainer}>
                {providerDetails ? (
                    <>
                        <h2>{providerDetails.name}</h2>
                        <br/>
                        <p>Service Provider ID: {providerDetails.id}</p>
                        <br/>
                        <p>Company: {providerDetails.company}</p>
                        <br/>
                        <p>Email: {providerDetails.email}</p>
                        <br/>
                        <p>Contact Number: {providerDetails.contact_number}</p>
                        <br/>
                        <p>Category of Work: {providerDetails.COW}</p>
                        <br/>
                        <p>Service Location: {providerDetails.Location}<sup style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={handleLocationUpdate}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </sup></p>
                        <br/>
                        <p>Password :{providerDetails.password}</p>
                    </>
                ) : (
                    <p>Loading provider details...</p>
                )}
            </div>
        </div>
    );
};

// Define styles object
const styles = {
    providerContainer: {
        backgroundColor: 'rgba(128, 0, 128, 0.5)', // Purple transparent color
        color: 'white',
        padding: '20px',
        margin: '10px',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '1600px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
};

export default ServiceHome;
